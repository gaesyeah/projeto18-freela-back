import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/users.controllers.js';
import { schemaValidation } from '../middlewares/schemaValidation.middleware.js';
import { userAuth } from '../middlewares/userAuth.middleware.js';
import { signInSchema, signUpSchema } from '../schemas/auth.schemas.js';

const userRouter = Router();

userRouter.post('/sign-up', schemaValidation(signUpSchema), signUp);
userRouter.post('/sign-in', schemaValidation(signInSchema), signIn);
userRouter.post('/sign-out', userAuth, signOut);

export default userRouter;
