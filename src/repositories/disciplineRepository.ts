import { prisma } from "../database.js";

export async function getDisciplines() {
    return prisma.disciplines.findMany({
        select: {
            id: true,
            name: true
        }, orderBy: {
            name: 'asc'
        }
    });
}

export async function getDisciplineByName(name: string) {
    return prisma.disciplines.findUnique({
        select: {
            id: true,
            name: true
        }, where: {
            name
        }
    });
}

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