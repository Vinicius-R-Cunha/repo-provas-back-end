import { prisma } from "../database.js";

export async function getTeachers() {
    return await prisma.teachers.findMany({
        select: {
            id: true,
            name: true
        }
    });
}

export async function getTeacherByName(name: string) {
    return prisma.teachers.findUnique({
        select: {
            id: true,
            name: true
        }, where: {
            name
        }
    });
}

export async function getTeachersByDiscipline(discipline: string) {
    return await prisma.teachersDisciplines.findMany({
        select: {
            id: true,
            teacher: {
                select: {
                    name: true
                }
            }
        }, where: {
            discipline: {
                name: discipline
            }
        }
    });
}