import * as disciplineRepository from "../repositories/disciplineRepository.js";

export async function get() {
    return await disciplineRepository.getDisciplines();
}