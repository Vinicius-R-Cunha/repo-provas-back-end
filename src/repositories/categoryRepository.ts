import { prisma } from "../database.js";

export async function getCategoriesByTeacher(teacher: string) {
    return await prisma.tests.findMany({
        select: {
            category: {
                select: {
                    name: true
                }
            },
            teacherDiscipline: {
                select: {
                    teacher: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }, where: {
            teacherDiscipline: {
                teacher: {
                    name: teacher
                }
            }
        }
    });
}