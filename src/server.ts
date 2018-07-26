import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import SocketIO from 'socket.io';

import { connectionOptions, dbUri } from './config/db';
import { hostController } from './controllers/host';
import { processController } from './controllers/process';
import { serviceController } from './controllers/service';
import { generateData } from './generate-data';
import { Host } from './models/host';
import { Process } from './models/process';
import { Service } from './models/service';

export class Server {
  private app: Express = express();
  private server = http.createServer(this.app);
  private io = SocketIO(this.server);

  private port: any = process.env.PORT || 3301;
  private socketPort: any = 3302;

  public run = (): void => {
    this.openDatabaseConnection();
    this.populateDatabaseIfEmpty();
    this.setUpMiddleware();
    this.setupRoutes();

    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`);
    });

    this.io.on('connection', (socket) => {
      console.log('User connected');

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    this.server.listen(this.socketPort, () => console.log(`Listening on port ${this.socketPort}`));
  }

  /**
   * Opens database connection
   */
  private openDatabaseConnection = (): void => {
    mongoose.connect(dbUri, connectionOptions).then(
      () => {
        console.log('Database connection established!');
      },
      (err) => {
        console.log('Error connecting Database instance due to: ', err);
      }
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
  private setUpMiddleware(): void {
    const port = process.env.PORT || 3301;
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
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
      .route('/hosts')
      .get(hostController.get)
      .post(hostController.post);
    this.app
      .route('/hosts/:hostid')
      .put(hostController.put)
      .delete(hostController.delete);
    this.app
      .route('/services')
      .get(serviceController.get)
      .post(serviceController.post);
    this.app
      .route('/services/:serviceid')
      .put(serviceController.put)
      .delete(serviceController.delete);
    this.app
      .route('/processes')
      .get(processController.get)
      .post(processController.post);
    this.app
      .route('/services/:processid')
      .put(serviceController.put)
      .delete(serviceController.delete);
  }
}
