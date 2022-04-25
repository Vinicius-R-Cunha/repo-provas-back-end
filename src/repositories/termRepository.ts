import { prisma } from "../database.js";

export async function getTerms() {
    return prisma.terms.findMany({
        select: {
            number: true
        }, orderBy: {
            number: 'asc'
        }
    });
}