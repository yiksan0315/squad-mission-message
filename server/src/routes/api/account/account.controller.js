import { HttpStatusCode } from 'axios';
import Account from '../../../models/Account';

export const getAccountById = async (req, res) => {
  const id = req.params.id;
  try {
    const account = await Account.findOneById(id);
    if (!account) {
      throw new Error(`id: '${id}' not exists`);
    }

    const { _id, password, nickname } = account;
    res
      .status(HttpStatusCode.Ok)
      .send({
        success: true,
        message: 'Get Account succefully!',
        result: { _id, id, nickname },
      });
  } catch (err) {
    res
      .status(HttpStatusCode.BadRequest)
      .send({ success: false, message: err.message });
  }
};

export const getAccount = async (req, res) => {
  try {
    const account = await Account.find({});
    let accountNoPassword = [];
    if (account) {
      accountNoPassword = account.map((user) => {
        const { _id, id, password, nickname } = user;
        return { _id, id, nickname };
      });
    } else {
      throw new Error('no user');
    }
    res.status(HttpStatusCode.Ok).send({
      success: true,
      message: 'Get Account Successfully',
      result: accountNoPassword,
    });
  } catch (err) {
    res
      .status(HttpStatusCode.BadRequest)
      .send({ success: false, message: err.message });
  }
};

export const postAccount = async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const nickname = req.body.nickname;

  try {
    let account = await Account.findOneById(id);
    if (account) {
      throw new Error('id exixts...');
    } else {
      await Account.create({ id, password, nickname });
      res.status(HttpStatusCode.Created).send({
        success: true,
        message: 'registered successfully',
      });
    }
  } catch (err) {
    res.status(HttpStatusCode.Conflict).json({
      success: false,
      message: err.message,
    });
  }
};
