import mongoose from 'mongoose';

const ChattingSchema = new mongoose.Schema({
  from_id: { type: String, required: true, trim: true },
  to_id: { type: String, required: true, trim: true },
  subject: { type: mongoose.Types.ObjectId },
});

ChattingSchema.statics.create = function ({ from_id, to_id }) {
  const chatting = new this({
    from_id,
    to_id,
    subject: null,
  });

  return chatting.save();
};

ChattingSchema.statics.findOneByFromIdAndToId = async function ({
  from_id,
  to_id,
}) {
  let chatting = await this.findOne({
    from_id,
    to_id,
  }).exec();
  if (!chatting) {
    chatting = await this.findOne({
      to_id: from_id,
      from_id: to_id,
    }).exec();
  }
  return chatting;
};

ChattingSchema.statics.findOneById = function (id) {
  return this.findOne({ _id: new mongoose.Types.ObjectId(id) });
};

export default mongoose.model('Chatting', ChattingSchema);
