import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";
import supertest from "supertest";
import app from "../../src/app.js";

export async function testFactory() {
    await teachersFactory();
    await termsFactory();
    await categoriesFactory();
    await disciplinesFactory();
    await teachersDisciplinesFactory();

    const category = await prisma.categories.findUnique({
        where: {
            name: 'P1'
        }
    });

    const teacher = await prisma.teachers.findUnique({
        where: {
            name: 'Teacher'
        }
    });

    const teacherDiscipline = await prisma.teachersDisciplines.findFirst({
        where: {
            teacherId: teacher.id
        }
    });

    const name = faker.name.jobType();
    const pdfUrl = faker.internet.url();

    await prisma.tests.create({
        data: {
            name,
            pdfUrl,
            categoryId: category.id,
            teacherDisciplineId: teacherDiscipline.id
        }
    });

    return prisma.tests.findFirst({
        where: {
            AND: [
                {
                    name
                },
                {
                    pdfUrl
                },
                {
                    categoryId: category.id
                },
                {
                    teacherDisciplineId: teacherDiscipline.id
                }
            ]
        }
    });
}

async function teachersDisciplinesFactory() {
    const teacher = await prisma.teachers.findUnique({
        where: {
            name: 'Teacher'
        }
    });

    const discipline = await prisma.disciplines.findUnique({
        where: {
            name: 'P1'
        }
    });

    await prisma.teachersDisciplines.create({
        data: {
            teacherId: teacher.id,
            disciplineId: discipline.id
        }
    });
}

async function disciplinesFactory() {
    const term = await prisma.terms.findUnique({
        where: {
            number: 1
        }
    });

    await prisma.disciplines.create({
        data: {
            name: 'P1',
            termId: term.id
        }
    });
}

async function categoriesFactory() {
    await prisma.categories.create({
        data: {
            name: 'P1'
        }
    });
}

async function termsFactory() {
    await prisma.terms.create({
        data: {
            number: 1
        }
    });
}

async function teachersFactory() {
    await prisma.teachers.create({
        data: {
            name: 'Teacher'
        }
    });
}