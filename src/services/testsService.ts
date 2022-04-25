import * as testRepository from "../repositories/testRepository.js";
import * as termRepository from "../repositories/termRepository.js";
import * as teacherRepository from "../repositories/teacherRepository.js";
import * as disciplineRepository from "../repositories/disciplineRepository.js";

export async function getByDiscipline() {
    const terms = await termRepository.getTerms();

    const resp = [];
    for (let i = 0; i < terms.length; i++) {
        const disciplines = await disciplineRepository.getDisciplineByTerm(terms[i].number);

        const aux = [];
        for (let j = 0; j < disciplines.length; j++) {
            const tests = await testRepository.getByDisciplineAndTerm(terms[i].number, disciplines[j]?.name)

            if (tests.length !== 0) {
                aux.push({ [disciplines[j]?.name]: tests })
            }
        }

        if (aux.length !== 0) {
            resp.push({ [terms[i]?.number]: aux })
        }
    }
    return resp;
}

export async function getByTeacher() {
    const teachers = await teacherRepository.getTeachers();

    const resp = [];
    for (let i = 0; i < teachers.length; i++) {
        const tests = await testRepository.getByTeacher(teachers[i].name);

        if (tests.length !== 0) {
            resp.push({ [teachers[i]?.name]: tests })
        }
    }

    return resp;
}