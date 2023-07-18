import crypto from 'crypto';
import config from '../config';

export const encrypt = (password) => {
  return crypto
    .createHmac('sha1', config.secret)
    .update(password)
    .digest('base64');
};

export const decrypt = (password) => {
  // 나중에 구현 j
  return password;
};
