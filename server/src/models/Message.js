import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  chatting_id: { type: mongoose.Types.ObjectId, required: true },
  from_id: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  time: { type: Date },
});

MessageSchema.statics.create = function ({ chatting_id, from_id, content }) {
  const message = new this({
    chatting_id,
    from_id,
    content,
    time: new Date(),
  });

  return message.save();
};

export default mongoose.model('Message', MessageSchema);
