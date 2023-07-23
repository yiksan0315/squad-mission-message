import express from 'express';
import accountRouter from './account';
import messageRouter from './message';

const apiRouter = express.Router();
apiRouter.use('/account', accountRouter);
apiRouter.use('/message', messageRouter);

export default apiRouter;
