import express from 'express';
import { getAccount, getAccountById, postAccount } from './account.controller';
import { login, logout } from './login.controller';
import { check } from './check.contoller';
import authMiddleware from '../../../middlewares/auth';

const accountRouter = express.Router();

accountRouter.get('/:id', getAccountById);
accountRouter.get('/', getAccount);
accountRouter.post('/', postAccount);

accountRouter.post('/login', login);
accountRouter.post('/logout', logout);

accountRouter.post('/check', authMiddleware, check);

export default accountRouter;
