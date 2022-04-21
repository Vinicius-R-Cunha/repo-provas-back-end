import Joi from "joi";
import { SignInData } from "../services/authService.js";

export const signInSchema = Joi.object<SignInData>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});