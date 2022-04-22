import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as authRepository from "../repositories/authRepository.js";

export default async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        throw { type: 'unauthorized', message: 'invalid token' }
    }

    const tokenData = getTokenData(token);
    res.locals.user = getUser(tokenData);

    next();
}

function getTokenData(token: string) {
    let tokenData: jwt.JwtPayload;
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            throw { type: 'unauthorized', message: 'invalid token' }
        }
        tokenData = decoded as jwt.JwtPayload;
    });
    return tokenData
}

async function getUser(tokenData: jwt.JwtPayload) {
    const user = await authRepository.findUserByEmail(tokenData?.data);

    if (!user) {
        throw { type: 'bad_request', message: 'user not found' }
    }

    return user;
}