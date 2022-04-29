import Joi from "joi";
import { TestData } from "../services/testService.js";

export const testSchema = Joi.object<TestData>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().required(),
    category: Joi.string().required(),
    discipline: Joi.string().required(),
    teacher: Joi.string().required()
});