import { HttpStatusCode } from 'axios';
import Chatting from '../models/Chatting';
import Account from '../models/Account';

const existMiddleware = async (req, res, next) => {
  let request = req.body;
  if (Object.entries(request).length === 0) {
    request = req.query;
  }
  const { chatting_id, from_id } = request;

  try {
    if (!chatting_id || !from_id) {
      throw new Error('request not correct... ');
    }
    const chatting = await Chatting.findOneById(chatting_id);
    const account = await Account.findOneById(from_id);
    if (!chatting) {
      throw new Error(`chatting_id : ${chatting_id} not exist`);
    }
    if (!account) {
      throw new Error(`user : ${from_id} not exist`);
    }
    next();
  } catch (err) {
    res
      .status(HttpStatusCode.BadRequest)
      .send({ success: false, message: err.message });
  }
};

export default existMiddleware;
