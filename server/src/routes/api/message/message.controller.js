import { HttpStatusCode } from 'axios';
import Message from '../../../models/Message';

export const postMessage = async (req, res) => {
  const { chatting_id, from_id, content } = req.body;

  try {
    if (!content) {
      throw new Error('request not correct... ');
    }

    const message = await Message.create({ chatting_id, from_id, content });
    res.status(HttpStatusCode.Ok).send({ success: true, result: message });
  } catch (err) {
    res
      .status(HttpStatusCode.BadRequest)
      .send({ success: false, message: err.message });
  }
};

export const getMessage = async (req, res) => {
  const { chatting_id } = req.query;

  try {
    const messages = await Message.find({ chatting_id });
    const orderedMessages = messages.sort((a, b) => {
      return new Date(a.time) - new Date(b.time);
    });
    res
      .status(HttpStatusCode.Ok)
      .send({ success: true, result: orderedMessages });
  } catch (err) {
    res
      .status(HttpStatusCode.BadRequest)
      .send({ success: false, message: err.message });
  }
};
