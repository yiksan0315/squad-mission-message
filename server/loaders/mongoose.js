import mongoose from 'mongoose';
import config from '../config';

export default async () => {
  const db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', () => {
    console.log('connected to mongo db server...');
  });

  await mongoose.connect(config.mongoURI);
};
