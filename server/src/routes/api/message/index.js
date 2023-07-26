import express from 'express';
import { getMessage, postMessage } from './message.controller';
import existMiddleware from '../../../middlewares/exist';

const messageRouter = express.Router();

messageRouter.get('/', getMessage);
messageRouter.post('/', existMiddleware, postMessage);

export default messageRouter;
