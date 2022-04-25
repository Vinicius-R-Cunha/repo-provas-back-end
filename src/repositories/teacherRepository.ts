import { prisma } from "../database.js";

export async function getTeachers() {
    return await prisma.teachers.findMany({
        select: {
            name: true
        }
    });
}