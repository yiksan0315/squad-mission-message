import express from 'express';
import expressLoader from './loaders/express';
import mongooseLoader from './loaders/mongoose';
import http from 'http';
import socketIoLoader from './loaders/socket.io';

const startServer = async () => {
  const app = express();
  const server = http.createServer(app);
  const port = process.env.PORT || 5000;

  try {
    await expressLoader({ app });
    await mongooseLoader();
    await socketIoLoader({ app, server });

    server.listen(port, (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log(`server opened!\nlistening on ${port}...`);
    });
  } catch (err) {
    console.error(err);
    return;
  }
};

startServer();
