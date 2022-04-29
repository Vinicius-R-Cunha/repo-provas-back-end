import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/database.js";
import * as authFactory from "./factories/authFactory.js";

describe("POST /sign-up", () => {
    beforeEach(truncateUsers);
    afterAll(disconnect);

    it("should return 201 and persist the user given a valid body", async () => {
        const body = authFactory.signUpBodyFactory();

        const response = await supertest(app).post("/sign-up").send(body);
        const user = await prisma.users.findUnique({
            where: {
                email: body.email
            }
        });

        expect(response.status).toBe(201);
        expect(user).not.toBeNull();
    });

    it("should return 409 given a existent user", async () => {
        const body = authFactory.signUpBodyFactory();

        await supertest(app).post("/sign-up").send(body);
        const response = await supertest(app).post("/sign-up").send(body);

        expect(response.status).toBe(409);
    });

    it("given a invalid body should return 422", async () => {
        const body = {
            email: ""
        }

        const response = await supertest(app).post("/sign-up").send(body);

        expect(response.status).toBe(422);
    });

    it("given a mismatched password confirmation should return 409", async () => {
        const body = authFactory.signUpBodyFactory();

        const response = await supertest(app).post("/sign-up").send({ ...body, passwordConfirmation: `{body.password}abc` });

        expect(response.status).toBe(409);
    });
});

describe("POST /sign-in", () => {
    beforeEach(truncateUsers);
    afterAll(disconnect);

    it("given a valid body should return 200", async () => {
        const body = authFactory.signUpBodyFactory();
        await supertest(app).post("/sign-up").send(body);

        const response = await supertest(app).post("/sign-in").send({ email: body.email, password: body.password });

        expect(response.status).toBe(200);
    });

    it("given a invalid body should return 422", async () => {
        const body = {
            email: ""
        }

        const response = await supertest(app).post("/sign-in").send(body);

        expect(response.status).toBe(422);
    });

    it("given a invalid user should return 409", async () => {
        const body = authFactory.signInBodyFactory();

        const response = await supertest(app).post("/sign-in").send(body);

        expect(response.status).toBe(409);
    });

    it("given a valid user but invalid password should return 409", async () => {
        const body = authFactory.signUpBodyFactory();
        await supertest(app).post("/sign-up").send(body);

        const user = await prisma.users.findUnique({
            where: {
                email: body.email
            }
        });

        const response = await supertest(app).post("/sign-in").send({ email: user.email, password: user.password });

        expect(response.status).toBe(409);
    });

});

describe("POST /tests", () => {
    beforeEach(truncateUsers);
    afterAll(disconnect);

    it("should return 201 given a valid body", async () => {
        const token = await authFactory.tokenFactory();

        const test = {
            name: 'string',
            pdfUrl: 'string',
            category: 'string',
            discipline: 'string',
            teacher: 'string'
        };

        const response = await supertest(app).post("/tests").send(test).set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(201);
    });

    it("should return 422 given a invalid body", async () => {
        const token = await authFactory.tokenFactory();

        const test = {};

        const response = await supertest(app).post("/tests").send(test).set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(422);
    });

});

async function disconnect() {
    await prisma.$disconnect();
}

async function truncateUsers() {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
}