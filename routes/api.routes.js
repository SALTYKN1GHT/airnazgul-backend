import express from 'express';
import cors from 'cors';
import ticketRouter from './ticket.routes.js';
import userRouter from './user.routes.js';
import orderRouter from './order.routes.js';
import destinationsRouter from './destination.routes.js';

const apiRouter = express.Router();

apiRouter.use(cors());
apiRouter.use(express.json());

apiRouter.use('/ticket', ticketRouter);
apiRouter.use('/user', userRouter)
apiRouter.use('/order', orderRouter);
apiRouter.use('/destinations', destinationsRouter);

export default apiRouter;
