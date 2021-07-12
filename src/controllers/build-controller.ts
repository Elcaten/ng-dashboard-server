import {Request, Response} from 'express';
import {Document, Model} from 'mongoose';

export const buildController = <T extends Document>(model: Model<T>) => {
    return {
        get: (req: Request, res: Response) => {
            const condition = req.params._id || req.query._id ? {_id: req.params._id || req.query._id} : {};
            model.find(condition, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).json(result);
            });
        },
        post: (req: Request, res: Response) => {
            const newModel = new model(req.body);
            newModel.save((err, result) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(201).json(result);
            });
        },
        put: (req: Request, res: Response) => {
            model.findOneAndUpdate(
                {_id: req.params._id || req.query._id},
                req.body,
                {new: true},
                (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).json(result);
                }
            );
        },
        delete: (req: Request, res: Response) => {
            model.findOneAndRemove(
                {_id: req.params._id || req.query._id},
                (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).json(result);
                }
            );
        }
    };
};
