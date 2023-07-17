import express from 'express';
import accountRouter from './account';

const apiRouter = express.Router();
apiRouter.use('/account', accountRouter);

export default apiRouter;
