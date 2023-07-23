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

export default mongoose.model('Chatting', ChattingSchema);
