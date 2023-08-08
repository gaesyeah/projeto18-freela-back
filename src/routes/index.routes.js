import { Router } from 'express';
import userRouter from './users.routes.js';

const indexRouter = Router();

indexRouter.use(userRouter);

export default indexRouter;