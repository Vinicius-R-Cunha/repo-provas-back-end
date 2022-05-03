import { Request, Response } from "express";
import * as teacherService from "../services/teacherService.js";

export async function getTeachersByDiscipline(req: Request, res: Response) {
    const { disciplineName } = req.params;

    const disciplines = await teacherService.get(disciplineName);

    res.status(200).send(disciplines);
}