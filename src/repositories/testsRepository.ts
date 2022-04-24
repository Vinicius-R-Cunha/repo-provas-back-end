import { prisma } from "../database.js";

export async function getTestsByDiscipline() {
    return await prisma.tests.findMany({
        select: {
            id: true,
            name: true,
            pdfUrl: true,
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
                    },
                    discipline: {
                        select: {
                            name: true,
                            term: {
                                select: {
                                    number: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}