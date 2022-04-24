import * as testsRepository from "../repositories/testsRepository.js";

export async function getByDiscipline() {
    return await testsRepository.getTestsByDiscipline();
}