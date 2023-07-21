import express from 'express';
import mongoose from 'mongoose';
import expressLoader from './loaders/express';
import mongooseLoader from './loaders/mongoose';
import Account from './models/Account';

const startServer = async () => {
  const app = express();
  const port = process.env.PORT || 5000;

  try {
    await expressLoader({ app });
    await mongooseLoader({ mongoose });

    app.listen(port, (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log(`server opened!\nlistening on ${port}...`);
    });
  } catch (err) {
    console.error(err);
    return;
  }

  const testMake = () => {
    for (let i = 0; i < 100; i++) {
      const a = i.toString();
      Account.create({ id: a, password: a, nickname: a });
    }
  };

  // testMake();
};

startServer();
