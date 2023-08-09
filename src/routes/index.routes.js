import { Router } from 'express';
import breedRouter from './breeds.routes.js';
import catalogueRouter from './catalogue.routes.js';
import userRouter from './users.routes.js';

const indexRouter = Router();

indexRouter.use(userRouter, catalogueRouter, breedRouter);

export default indexRouter;