import { Router } from 'express';
import { signIn, signUp } from '../controllers/users.controllers.js';
import { schemaValidation } from '../middlewares/schemaValidation.middleware.js';
import { signInSchema, signUpSchema } from '../schemas/auth.schemas.js';

const userRouter = Router();

userRouter.post('/signup', schemaValidation(signUpSchema), signUp);
userRouter.post('/signin', schemaValidation(signInSchema), signIn);

export default userRouter;
