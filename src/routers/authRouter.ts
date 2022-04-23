import { Router } from "express";
import { checkToken, signIn, signUp } from "../controllers/authController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";
import { signInSchema } from "../schemas/signInSchema.js";
import { signUpSchema } from "../schemas/signUpSchema.js";

const authRouter = Router();
authRouter.post("/sign-up", validateSchemaMiddleware(signUpSchema), signUp);
authRouter.post("/sign-in", validateSchemaMiddleware(signInSchema), signIn);
authRouter.get("/token/validation", validateTokenMiddleware, checkToken);

export default authRouter;