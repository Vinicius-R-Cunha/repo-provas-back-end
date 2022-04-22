import * as authRepository from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";

export interface SignUpData {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export type SignInData = Omit<SignUpData, "passwordConfirmation">;

export async function signUp(data: SignUpData) {
    const { email, password, passwordConfirmation } = data;

    checkIfPasswordsMatch(password, passwordConfirmation);
    await checkIfEmailExists(email);
    const encryptedPassword = encryptPassword(password);

    await authRepository.createNewUser({ email, password: encryptedPassword });

    return;
}

function encryptPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

async function checkIfEmailExists(email: string) {
    const user = await authRepository.findUserByEmail(email);

    if (user) {
        throw { type: "conflict", message: "email already exists" };
    }
}

function checkIfPasswordsMatch(password: string, passwordConfirmation: string) {
    if (password !== passwordConfirmation) {
        throw { type: "conflict", message: "passwords do not match" };
    }
    return;
}

export async function signIn(data: SignInData) {
    const { email } = data;

    await validateLogin(data);
    const token = generateToken(email);

    return token;
}

function generateToken(email: string) {
    const secretKey = process.env.JWT_SECRET;

    return jwt.sign(
        {
            data: email
        },
        secretKey,
        {
            expiresIn: 60 * 24 * 60 * 60
        }
    );
}

async function validateLogin(data: SignInData) {
    const { email, password } = data;
    const user = await authRepository.findUserByEmail(email);

    validateUser(user);
    validatePassword(user, password);
}

function validateUser(user: Users) {
    if (!user) {
        throw { type: "conflict", message: "incorrect email/password" };
    }
}

function validatePassword(user: Users, password: string) {
    if (!bcrypt.compareSync(password, user.password)) {
        throw { type: "conflict", message: "incorrect email/password" };
    }
}