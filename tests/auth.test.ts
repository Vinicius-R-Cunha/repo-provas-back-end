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

    it("given a mismatched password confirmation should return 422", async () => {
        const body = authFactory.signUpBodyFactory();

        const response = await supertest(app).post("/sign-up").send(body);

        expect(response.status).toBe(422);
    });
});

describe("POST /sign-in", () => {
    beforeEach(truncateUsers);
    afterAll(disconnect);

    it("given a invalid body should return 422", async () => {
        const body = {
            email: ""
        }

        const response = await supertest(app).post("/sign-in").send(body);

        expect(response.status).toBe(422);
    });

});

async function disconnect() {
    await prisma.$disconnect();
}

async function truncateUsers() {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
}