import { HttpStatusCode } from 'axios';
import Chatting from '../../../models/Chatting';

export const postChatting = (req, res) => {
  const { from_id, to_id } = req.body;

  try {
    if (!from_id || !to_id) {
      throw new Error('request not correct... ');
    }
    // user 존재 여부 나중에 확인해 보기

    Chatting.create({ from_id, to_id });
    res.status(HttpStatusCode.Ok).send({ success: true });
  } catch (err) {
    res
      .status(HttpStatusCode.BadRequest)
      .send({ success: false, message: err.message });
  }
};

export const getChatting = async (req, res) => {
  const from_id = req.body.from_id;

  try {
    if (!from_id) {
      throw new Error('request not correct... ');
    }
    const chattings_from_id = await Chatting.find({ from_id });
    const chattings_to_id = await Chatting.find({ to_id: from_id });

    res.status(HttpStatusCode.Ok).send({
      success: true,
      result: [...chattings_from_id, ...chattings_to_id],
    });
  } catch (err) {
    res
      .status(HttpStatusCode.BadRequest)
      .send({ success: false, message: err.message });
  }
};

export const getChattingById = async (req, res) => {
  const from_id = req.body.from_id;
  const to_id = req.params.id;

  try {
    if (!from_id || !to_id) {
      throw new Error('request not correct... ');
    }
    const chatting = await Chatting.findOneByFromIdAndToId({ from_id, to_id });
    if (!chatting) {
      throw new Error(`no chatting between ${from_id} and ${to_id}...`);
    }
    res.status(HttpStatusCode.Ok).send({
      success: true,
      result: chatting,
    });
  } catch (err) {
    res
      .status(HttpStatusCode.BadRequest)
      .send({ success: false, message: err.message });
  }
};
