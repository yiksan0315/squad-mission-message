import express from 'express';
import { getAccount, getAccountById, postAccount } from './account.controller';
import { login, logout } from './login.controller';

const accountRouter = express.Router();

accountRouter.get('/:id', getAccountById);
accountRouter.get('/', getAccount);
accountRouter.post('/', postAccount);

accountRouter.post('/login', login);
accountRouter.post('/logout', logout);

export default accountRouter;
