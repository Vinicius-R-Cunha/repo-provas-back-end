import * as teacherRepository from "../repositories/teacherRepository.js";

export async function get(discipline: string) {
    return await teacherRepository.getTeachersByDiscipline(discipline);
}