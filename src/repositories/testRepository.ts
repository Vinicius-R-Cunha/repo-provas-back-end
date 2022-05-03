import { prisma } from "../database.js";

export async function getByDisciplineAndTerm(termNumber: number, discipline: string) {
    return await prisma.tests.findMany({
        select: {
            id: true,
            name: true,
            pdfUrl: true,
            views: true,
            category: {
                select: {
                    name: true
                }
            },
            teacherDiscipline: {
                select: {
                    discipline: {
                        select: {
                            term: true
                        }
                    },
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

export async function getByTeacherAndCategory(teacher: string, category: string) {
    return prisma.tests.findMany({
        select: {
            id: true,
            name: true,
            pdfUrl: true,
            views: true,
            category: {
                select: {
                    name: true
                }
            },
            teacherDiscipline: {
                select: {
                    teacher: {
                        select: {
                            id: true
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
        }, where: {
            AND: [
                {
                    category: {
                        name: category
                    }
                },
                {
                    teacherDiscipline: {
                        teacher: {
                            name: teacher
                        }
                    }
                }
            ]
        }
    });
}

export async function getTestById(id: number) {
    return prisma.tests.findUnique({
        where: {
            id
        }
    });
}

export async function updateViews(id: number) {
    return prisma.tests.update({
        data: {
            views: {
                increment: 1
            }
        }, where: {
            id
        }
    });
}

interface CreatTestData {
    name: string;
    pdfUrl: string;
    categoryId: number;
    teacherDisciplineId: number;
}

export async function create(body: CreatTestData) {
    return prisma.tests.create({
        data: {
            ...body
        }
    })
}