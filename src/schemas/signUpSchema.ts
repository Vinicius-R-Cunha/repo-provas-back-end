import Joi from "joi";
import { SignUpData } from "../services/authService.js";

export const signUpSchema = Joi.object<SignUpData>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirmation: Joi.string().required()
});