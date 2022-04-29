import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";
import { SignInData, SignUpData } from "../../src/services/authService.js";
import bcrypt from "bcrypt";
import supertest from "supertest";
import app from "../../src/app.js";

export function signUpBodyFactory(): SignUpData {
    const password = faker.internet.password();
    return {
        email: faker.internet.email(),
        password: password,
        passwordConfirmation: password
    }
}

export function signInBodyFactory(): SignInData {
    return {
        email: faker.internet.email(),
        password: faker.internet.password()
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

export async function tokenFactory() {
    const body = signInBodyFactory();
    await signInFactory(body);

    const response = await supertest(app).post('/sign-in').send(body);

    return response.text;
}