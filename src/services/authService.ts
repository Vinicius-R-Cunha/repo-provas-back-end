import * as authRepository from "../repositories/authRepository.js";
import bcrypt from "bcrypt";

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
}

function encryptPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

async function checkIfEmailExists(email: string) {
    const user = await authRepository.findUserByEmail(email);

    if (user) {
        throw { type: "bad_request", message: "email already exists" };
    }
}

function checkIfPasswordsMatch(password: string, passwordConfirmation: string) {
    if (password !== passwordConfirmation) {
        throw { type: "bad_request", message: "passwords don't match" };
    }
    return;
}


