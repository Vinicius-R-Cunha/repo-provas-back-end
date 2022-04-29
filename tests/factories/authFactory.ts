import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";
import { SignInData, SignUpData } from "../../src/services/authService";
import bcrypt from "bcrypt";

export function signUpBodyFactory(): SignUpData {
    const password = faker.internet.password();
    return {
        email: faker.internet.email(),
        password: password,
        passwordConfirmation: password
    }
}

export async function signInFactory(user: SignInData) {
    await prisma.users.create({
        data: {
            ...user,
            password: bcrypt.hashSync(user.password, 10)
        }
    });
}