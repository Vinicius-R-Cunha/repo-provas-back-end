import { Request, Response } from "express";
import * as authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {

    await authService.signUp(req.body);

    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {

    const token = await authService.signIn(req.body);

    res.status(201).send(token);
}