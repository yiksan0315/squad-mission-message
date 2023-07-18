import jwt from 'jsonwebtoken';
import Account from '../../../models/Account';
import { HttpStatusCode } from 'axios';

/**
 * {id, password}
 */
export const login = async (req, res) => {
  const { id, password } = req.body;
  const secret = req.app.get('jwt-secret');

  try {
    const account = await Account.findOneById(id);
    if (!account) {
      throw new Error('User not exist');
    } else {
      if (account.verify(password)) {
        jwt.sign(
          {
            _id: account._id,
            id: account.id,
            nickname: account.nickname,
          },
          secret,
          {
            expiresIn: '2w',
            issuer: 'yiksan0315',
            subject: 'userInfo',
          },
          (err, token) => {
            if (err) {
              throw new Error(err);
            }
            res.cookie('AccessToken', token, {
              path: '/',
              HttpOnly: true,
            });
            res.status(HttpStatusCode.Ok).send({
              success: true,
              message: 'login successfully',
              token,
            });
          }
        );
      } else {
        throw new Error('password not equal');
      }
    }
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).send({
      success: false,
      message: err.message,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie('AccessToken', { path: '/' });
  res.status(HttpStatusCode.Ok).send({
    success: true,
    message: 'logout',
  });
};
