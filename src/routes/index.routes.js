import { Router } from 'express';
import catalogueRouter from './catalogue.routes.js';
import userRouter from './users.routes.js';

const indexRouter = Router();

indexRouter.use(userRouter, catalogueRouter);

export default indexRouter;