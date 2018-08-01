import { Request, Response } from 'express';

import { Service } from '../models/service';

// TODO: разобраться с копипастой
export const serviceController = {
  get: (req: Request, res: Response) => {
    Service.find({}, (err, service) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(service);
    });
  },
  post: (req: Request, res: Response) => {
    const newService = new Service(req.body);
    newService.save((err, service) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(201).json(service);
    });
  },
  put: (req: Request, res: Response) => {
    Service.findOneAndUpdate(
      { _id: req.params.serviceid },
      req.body,
      { new: true },
      (err, service) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(service);
      }
    );
  },
  delete: (req: Request, res: Response) => {
    Service.findOneAndRemove(
      { _id: req.params.serviceid },
      (err, service) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(service);
      }
    );
  }
};
