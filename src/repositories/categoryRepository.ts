import { prisma } from "../database.js";

export async function getCategories() {
    return await prisma.categories.findMany({
        select: {
            id: true,
            name: true
        }, orderBy: {
            name: 'asc'
        }
    });
}

export async function getCategorieByName(name: string) {
    return await prisma.categories.findUnique({
        select: {
            id: true,
            name: true
        }, where: {
            name: name
        }
    });
}

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