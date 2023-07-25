import express from 'express';
import accountRouter from './account';
import messageRouter from './message';
import chattingRouter from './chatting';

const apiRouter = express.Router();
apiRouter.use('/account', accountRouter);
apiRouter.use('/message', messageRouter);
apiRouter.use('/chatting', chattingRouter);

export default apiRouter;
