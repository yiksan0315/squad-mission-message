import express from 'express';
import { getMessage, postMessage } from './message.controller';
import existMiddleware from '../../../middlewares/exist';

const messageRouter = express.Router();

messageRouter.use('/', existMiddleware);
messageRouter.get('/', getMessage);
messageRouter.post('/', postMessage);

export default messageRouter;
