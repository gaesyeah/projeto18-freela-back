import { Router } from "express";
import { usersController } from "../controllers/users.controllers.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schemas.js";

const userRouter = Router();

userRouter.post(
  "/sign-up",
  schemaValidation(signUpSchema),
  usersController.signUp
);
userRouter.post(
  "/sign-in",
  schemaValidation(signInSchema),
  usersController.signIn
);
userRouter.post("/sign-out", userAuth, usersController.signOut);

export default userRouter;
