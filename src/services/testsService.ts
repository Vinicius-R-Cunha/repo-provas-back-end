import * as testRepository from "../repositories/testRepository.js";
import * as termRepository from "../repositories/termRepository.js";
import * as teacherRepository from "../repositories/teacherRepository.js";
import * as disciplineRepository from "../repositories/disciplineRepository.js";
import * as categoryRepository from "../repositories/categoryRepository.js";

export async function getByDiscipline() {
    const terms = await termRepository.getTerms();

    const resp = [];
    for (let i = 0; i < terms.length; i++) {
        const disciplines = await disciplineRepository.getDisciplineByTerm(terms[i].number);

        const aux = [];
        for (let j = 0; j < disciplines.length; j++) {
            const tests = await testRepository.getByDisciplineAndTerm(terms[i].number, disciplines[j]?.name)

            if (tests.length !== 0) {
                aux.push({ disciplineName: disciplines[j]?.name, disciplineData: tests })
            }
        }

        if (aux.length !== 0) {
            resp.push({ termNumber: terms[i]?.number, termData: aux })
        }
    }
    return resp;
}

export async function getByTeacher() {
    const teachers = await teacherRepository.getTeachers();

    const resp = [];
    let cont = 1;
    for (let i = 0; i < teachers.length; i++) {
        const categoriesWithRepeated = await categoryRepository.getCategoriesByTeacher(teachers[i]?.name);

        const categories = uniqueName(categoriesWithRepeated);

        const aux = [];
        for (let j = 0; j < categories.length; j++) {
            const tests = await testRepository.getByTeacherAndCategory(teachers[i]?.name, categories[j]);

            if (tests.length !== 0) {
                aux.push({ id: cont, categoriyName: categories[j], categoryData: tests })
                cont++;
            }
        }

        if (aux.length !== 0) {
            resp.push({ id: teachers[i].id, teacherName: teachers[i]?.name, teacherData: aux })
        }
    }

    return resp;
}

function uniqueName(categories: any[]) {
    const hashtable = {};

    for (let i = 0; i < categories.length; i++) {
        hashtable[categories[i].category.name] = true;
    }

    return (Object.keys(hashtable));
}