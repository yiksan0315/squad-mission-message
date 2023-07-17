import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import apiRouter from '../routes/api';
import morgan from 'morgan';
import config from '../config';

export default async ({ app }) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use(morgan('dev'));
  app.set('jwt-secret', config.secret);

  app.use(cookieParser());

  app.get('/', (req, res) => {
    // 여기에다가 로그인 화면
    res.send('login!');
  });
  app.use('/api', apiRouter);
  // app.use(express.static(path.join(__dirname, '../../client/build')));
};
