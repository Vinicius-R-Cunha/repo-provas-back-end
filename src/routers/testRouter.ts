import { Router } from "express";
import { getTestsByDiscipline, getTestsByTeacher, postTest } from "../controllers/testController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";
import { testSchema } from "../schemas/testSchema.js"

const testRouter = Router();
testRouter.get('/tests/discipline', validateTokenMiddleware, getTestsByDiscipline);
testRouter.get('/tests/teacher', validateTokenMiddleware, getTestsByTeacher);
testRouter.post('/tests', validateSchemaMiddleware(testSchema), validateTokenMiddleware, postTest);

export default testRouter;