import { prisma } from "../database.js";
import { SignInData } from "../services/authService.js";

export async function findUserByEmail(email: string) {
    return await prisma.users.findUnique({
        where: {
            email
        }
    });
}

export async function createNewUser(data: SignInData) {
    return await prisma.users.create({
        data: {
            ...data
        }
    });
}