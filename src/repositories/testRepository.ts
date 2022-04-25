import { prisma } from "../database.js";

export async function getByDisciplineAndTerm(termNumber: number, discipline: string) {
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
                    }
                }
            }
        }, where: {
            AND: [
                {
                    teacherDiscipline: {
                        discipline: {
                            term: {
                                number: termNumber
                            }
                        }
                    }
                },
                {
                    teacherDiscipline: {
                        discipline: {
                            name: discipline
                        }
                    }
                }
            ]
        }
    });
}

export async function getByTeacher(teacher: string) {
    return prisma.tests.findMany({
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
        }, where: {
            teacherDiscipline: {
                teacher: {
                    name: teacher
                }
            }
        }
    });
}