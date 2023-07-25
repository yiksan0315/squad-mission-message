import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import apiRouter from '../routes/api';
import morgan from 'morgan';
import config from '../config';
import path from 'path';

export default async ({ app }) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use(morgan('dev'));
  app.set('jwt-secret', config.secret);

  app.use(cookieParser());

  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.use('/api', apiRouter);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
};
