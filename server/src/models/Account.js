import mongoose from 'mongoose';
import { encrypt } from '../utility/cryption';

const AccountSchema = new mongoose.Schema({
  id: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  nickname: { type: String, required: true },
});

AccountSchema.statics.create = function ({ id, password, nickname }) {
  const user = new this({
    id,
    password: encrypt(password),
    nickname,
  });

  return user.save();
};

AccountSchema.statics.findOneById = function (id) {
  return this.findOne({
    id,
  }).exec();
};

AccountSchema.methods.verify = function (password) {
  return this.password === encrypt(password);
};

export default mongoose.model('Account', AccountSchema);
