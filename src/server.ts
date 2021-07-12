import bodyParser from 'body-parser';
import cors from 'cors';
import express, {Express, NextFunction, Request, Response} from 'express';
import * as faker from 'faker';
import http from 'http';
import mongoose from 'mongoose';
import {setInterval} from 'timers';
import * as WebSocket from 'ws';

import {connectionOptions, dbUri} from './config/db';
import {port} from './config/env';
import {computersController} from './controllers/computers';
import {hostController} from './controllers/host';
import {processController} from './controllers/process';
import {serviceController} from './controllers/service';
import {generateData} from './generate-data';
import {Host} from './models/host';
import {Process} from './models/process';
import {Service} from './models/service';

export class Server {
  private app: Express = express();
  private wss: WebSocket.Server;

  constructor() {
    this.openDatabaseConnection();
    this.populateDatabaseIfEmpty();
    this.setupMiddleware();
    this.setupRoutes();
    setInterval(this.updateHostsData, 5000);

    const server = this.app.listen(port);
    this.wss = new WebSocket.Server({server});

    this.setupSocket();
  }

  /**
   * Opens database connection
   */
  private openDatabaseConnection = (): void => {
    mongoose.connect(dbUri, connectionOptions).then(
      () => console.log('Database connection established!'),
      (err) => console.log('Error connecting Database instance due to: ', err)
    );
  }

  /**
   * Populates DB if it's empty
   */
  private populateDatabaseIfEmpty = (): void => {
    const newData = generateData();
    Host.findOne({}, (err, res) => {
      if (!res) {
        for (const host of newData.hosts) {
          const hostObj = new Host(host);
          hostObj.save();
        }
      }
    });
    Process.findOne({}, (err, res) => {
      if (!res) {
        for (const process of newData.processes) {
          const processObj = new Process(process);
          processObj.save();
        }
      }
    });
    Service.findOne({}, (err, res) => {
      if (!res) {
        for (const service of newData.services) {
          const serviceObj = new Service(service);
          serviceObj.save();
        }
      }
    });
  }

  /**
   * Sets up application middleware
   */
  private setupMiddleware(): void {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log(req.method, req.originalUrl, res.statusCode);
      next();
    });
  }

  /**
   * Sets up application routes
   */
  private setupRoutes = (): void => {
    this.app
      .route('/api/computers')
      .get(computersController.get)
      .post(computersController.post)
      .put(computersController.put)
      .delete(computersController.delete);

    this.app
      .route('/api/hosts')
      .get(hostController.get)
      .post(hostController.post);
    this.app
      .route('/api/hosts/:hostid')
      .put(hostController.put)
      .delete(hostController.delete);
    this.app
      .route('/api/services')
      .get(serviceController.get)
      .post(serviceController.post);
    this.app
      .route('/api/services/:serviceid')
      .put(serviceController.put)
      .delete(serviceController.delete);
    this.app
      .route('/api/processes')
      .get(processController.get)
      .post(processController.post);
    this.app
      .route('/api/processes/:processid')
      .put(processController.put)
      .delete(processController.delete);
  }

  private setupSocket = (): void => {
    this.wss.on('connection', (ws) => {
      console.log('client connected to socket');
      const intervalId = setInterval(async () => {
        const data = {
          hosts: await Host.find({}),
          services: await Service.find({}),
          processes: await Process.find({}),
        };
        ws.send(JSON.stringify(data));
      }, 5000);

      ws.on('message', async (msg: string) => {
        const message = JSON.parse(msg);
        if (message.type === 'REFRESH') { // TODO: сделать интерфейс сообщений, общий с клиентом
          const data = {
            hosts: await Host.find({}),
            services: await Service.find({}),
            processes: await Process.find({}),
          };
          ws.send(JSON.stringify(data));
        }
      });

      ws.on('close', () => {
        console.log('client disconnected from socket');
        clearInterval(intervalId);
      });

      ws.on('error', (err) => {
        if ((err as any).code === 'ECONNRESET') {
          console.log('client disconnected from socket');
          clearInterval(intervalId);
          ws.close();
        }
      });
    });
  }

  /**
   * Updates host's cpu, disk and ram usage
   */
  private async updateHostsData() {
    const hosts = await Host.find({});
    for (const host of hosts) {
      host.disk = faker.random.number({min: 0, max: 100});
      host.cpu = faker.random.number({min: 0, max: 100});
      host.ram = faker.random.number({min: 0, max: 100});
      await Host.findByIdAndUpdate(host.id, host, {new: true});
    }
  }
}
