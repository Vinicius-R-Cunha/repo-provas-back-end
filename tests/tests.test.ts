import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/database.js";
import * as authFactory from "./factories/authFactory.js";

describe("POST /sign-up", () => {
    beforeEach(truncateUsers);
    afterAll(disconnect);

    it("should return 201 given a valid body", async () => {
        const body = {
            email: 'abc@email.com',
            password: '123',
            passwordConfirmation: '123'
        }
        await supertest(app).post("/sign-up").send(body);

        const token = await supertest(app).post("/sign-in").send({ email: body.email, password: body.password });

        const test = {
            name: 'string',
            pdfUrl: 'string',
            category: 'string',
            discipline: 'string',
            teacher: 'string'
        }

        const response = await supertest(app).post("/tests").set("Authorization", `Bearer ${token.text}`).send(test);

        expect(response.status).toBe(201);
    });

});

async function disconnect() {
    await prisma.$disconnect();
}

async function truncateUsers() {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
}