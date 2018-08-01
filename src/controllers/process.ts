import { Request, Response } from 'express';

import { Process } from '../models/process';

// TODO: разобраться с копипастой
export const processController = {
  get: (req: Request, res: Response) => {
    Process.find({}, (err, process) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(process);
    });
  },
  post: (req: Request, res: Response) => {
    const newProcess = new Process(req.body);
    newProcess.save((err, process) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(201).json(process);
    });
  },
  put: (req: Request, res: Response) => {
    Process.findOneAndUpdate(
      { _id: req.params.processid },
      req.body,
      { new: true },
      (err, process) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(process);
      }
    );
  },
  delete: (req: Request, res: Response) => {
    Process.findOneAndRemove(
      { _id: req.params.processid },
      (err, process) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(process);
      }
    );
  }
};
