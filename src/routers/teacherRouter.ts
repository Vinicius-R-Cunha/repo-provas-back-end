import { Router } from "express";
import { getTeachersByDiscipline } from "../controllers/teacherController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const teacherRouter = Router();
teacherRouter.get('/teacher/:disciplineName', validateTokenMiddleware, getTeachersByDiscipline);

export default teacherRouter;