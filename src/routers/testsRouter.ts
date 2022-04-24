import { Router } from "express";
import { getTestsByDiscipline, getTestsByTeacher } from "../controllers/testsController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const testsRouter = Router();
testsRouter.get('/tests/discipline', validateTokenMiddleware, getTestsByDiscipline);
testsRouter.get('/tests/teacher', validateTokenMiddleware, getTestsByTeacher);

export default testsRouter;