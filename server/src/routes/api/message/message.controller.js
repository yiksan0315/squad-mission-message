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
  const { from_id, chatting_id } = req.query;

  let messagesObject = { from_id: [], to_id: [] };

  try {
    const messages = await Message.find({ chatting_id });
    messages.map((item) => {
      if (item.from_id === from_id) {
        messagesObject.from_id.push(item);
      } else {
        messagesObject.to_id.push(item);
      }
    });

    res
      .status(HttpStatusCode.Ok)
      .send({ success: true, result: messagesObject });
  } catch (err) {
    res
      .status(HttpStatusCode.BadRequest)
      .send({ success: false, message: err.message });
  }
};
