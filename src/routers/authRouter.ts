import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { signInSchema } from "../schemas/signInSchema.js";
import { signUpSchema } from "../schemas/signUpSchema.js";

const authRouter = Router();
authRouter.post("/sign-up", validateSchemaMiddleware(signUpSchema), signUp);
authRouter.post("/sign-in", validateSchemaMiddleware(signInSchema), signIn);

export default authRouter;