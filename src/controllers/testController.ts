import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export async function getTestsByDiscipline(req: Request, res: Response) {

    const tests = await testService.getByDiscipline();

    res.status(200).send(tests);
}

export async function getTestsByTeacher(req: Request, res: Response) {

    const tests = await testService.getByTeacher();

    res.status(200).send(tests);
}

export async function updateViews(req: Request, res: Response) {
    const { id } = req.params;

    await testService.update(parseFloat(id));

    res.sendStatus(200);
}

export async function postTest(req: Request, res: Response) {

    await testService.createTest(req.body);

    res.sendStatus(201);
}