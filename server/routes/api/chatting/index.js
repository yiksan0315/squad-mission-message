import express from 'express';
import {
  getChatting,
  getChattingById,
  postChatting,
} from './chatting.controller';

const chattingRouter = express.Router();

chattingRouter.get('/', getChatting);
chattingRouter.get('/:id', getChattingById);
chattingRouter.post('/', postChatting);

export default chattingRouter;
