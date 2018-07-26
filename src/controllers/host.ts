import { Request, Response } from 'express';

import { Host } from '../models/host';

export const hostController = {
  get: (req: Request, res: Response) => {
    Host.find({}, (err, host) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(host);
    });
  },
  post: (req: Request, res: Response) => {
    const newHost = new Host(req.body);
    newHost.save((err, host) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(201).json(host);
    });
  },
  put: (req: Request, res: Response) => {
    Host.findOneAndUpdate(
      { _id: req.params.hostid },
      req.body,
      { new: true },
      (err, host) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(host);
      }
    );
  },
  delete: (req: Request, res: Response) => {
    Host.findOneAndRemove(
      { _id: req.params.hostid },
      (err, host) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(host);
      }
    );
  }
};
