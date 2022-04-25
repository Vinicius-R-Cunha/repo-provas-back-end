import { prisma } from "../database.js";

export async function getDisciplineByTerm(termNumber: number) {
    return prisma.disciplines.findMany({
        select: {
            name: true
        }, where: {
            term: {
                number: termNumber
            }
        }
    });
}