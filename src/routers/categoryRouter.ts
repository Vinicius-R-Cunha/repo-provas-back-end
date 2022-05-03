import { Router } from "express";
import { getCategories } from "../controllers/categoryController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const categoryRouter = Router();
categoryRouter.get('/categories', validateTokenMiddleware, getCategories);

export default categoryRouter;