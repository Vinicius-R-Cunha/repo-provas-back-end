import { Request, Response } from "express";
import * as authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {

    await authService.signUp(req.body);

    res.sendStatus(201);
}

export function signIn(req: Request, res: Response) {
    res.status(201).send('alo2');
}