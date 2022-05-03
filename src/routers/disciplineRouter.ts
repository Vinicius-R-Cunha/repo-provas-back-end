import { Router } from "express";
import { getDisciplines } from "../controllers/disciplineController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const disciplineRouter = Router();
disciplineRouter.get('/disciplines', validateTokenMiddleware, getDisciplines);

export default disciplineRouter;