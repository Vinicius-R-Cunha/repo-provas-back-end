import { Request, Response } from "express";
import * as testsService from "../services/testsService.js";

export async function getTestsByDiscipline(req: Request, res: Response) {

    const tests = await testsService.getByDiscipline();

    res.status(201).send(tests);
}

export async function getTestsByTeacher(req: Request, res: Response) {

    const tests = await testsService.getByTeacher();

    res.status(201).send(tests);
}
