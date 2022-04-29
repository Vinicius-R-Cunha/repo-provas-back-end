import { faker } from "@faker-js/faker";
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

export function signInFactory(): SignInData {
    const password = faker.internet.password();
    return {
        email: faker.internet.email(),
        password: bcrypt.hashSync(password, 10)
    }
}