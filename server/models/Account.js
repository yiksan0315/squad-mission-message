import mongoose from 'mongoose';
import { encrypt } from '../utility/cryption';

const AccountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, trim: true },
  admin: { type: Boolean, default: false },

  nickname: { type: String, required: true },
  profileImage: { type: String, default: '어떤 이미지로간에 링크' },
  likes: [Number],
});

/**
 *
 * .statics : this = model itself
 * .methods : this = data instance
 *
 */

AccountSchema.statics.create = function ({ email, password, nickname }) {
  const user = new this({
    email,
    password: encrypt(password),
    nickname,
    profileImage: 'default',
    likes: [],
  });

  return user.save();
};

AccountSchema.statics.updateByEmail = async function ({
  email,
  password,
  nickname,
  profileImage,
  likes,
}) {
  await Account.findOneAndUpdate(
    { email },
    {
      $set: {
        email,
        password: encrypt(password),
        nickname,
        profileImage,
        likes,
      },
    }
  );
};

AccountSchema.statics.findOneByEmail = function (email) {
  return this.findOne({
    email,
  }).exec();
};

AccountSchema.methods.verify = function (password) {
  return this.password === encrypt(password);
};

AccountSchema.methods.assignAdmin = function () {
  this.admin = true;
  return this.save();
};

export default mongoose.model('Account', AccountSchema);
