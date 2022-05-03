import { prisma } from "../database.js";

export async function getTeacherDisciplineByDisciplineIdAndTeacherId(disciplineId: number, teacherId: number) {
    return await prisma.teachersDisciplines.findFirst({
        select: {
            id: true,
            teacherId: true,
            disciplineId: true
        }, where: {
            AND: [
                {
                    discipline: {
                        id: disciplineId
                    }
                }, {
                    teacher: {
                        id: teacherId
                    }
                }
            ]
        }
    });
}