import express from 'express';
import {Computer} from '../models/computer';
import {buildController} from './build-controller';

const computerController = buildController(Computer);
const router = express.Router();

export const computerRouter = router
    .get('/', computerController.get)
    .post('/', computerController.post)
    .put('/', computerController.put)
    .delete('/', computerController.delete);
