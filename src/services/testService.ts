import * as testRepository from "../repositories/testRepository.js";
import * as termRepository from "../repositories/termRepository.js";
import * as teacherRepository from "../repositories/teacherRepository.js";
import * as disciplineRepository from "../repositories/disciplineRepository.js";
import * as categoryRepository from "../repositories/categoryRepository.js";

export interface TestData {
    name: string;
    pdfUrl: string;
    category: string;
    discipline: string;
    teacher: string;
}

export async function getByDiscipline() {
    const terms = await termRepository.getTerms();

    const resp = [];
    for (let i = 0; i < terms.length; i++) {
        const disciplines = await disciplineRepository.getDisciplineByTerm(terms[i].number);

        const aux = [];
        for (let j = 0; j < disciplines.length; j++) {
            const tests = await testRepository.getByDisciplineAndTerm(terms[i].number, disciplines[j]?.name)

            sortTests(tests);

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
                aux.push({ id: cont, categoryName: categories[j], categoryData: tests })
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

    return (Object.keys(hashtable)).sort();
}

export async function update(id: number) {
    if (isNaN(id)) throw { type: 'bad_request', message: 'id should be a number' }
    if (id % 1 !== 0) throw { type: 'bad_request', message: 'id should be an integer' }

    const test = await testRepository.getTestById(id);

    if (!test) throw { type: 'not_found', message: 'this test id does not exists' }

    await testRepository.updateViews(id);
}

function sortTests(tests: any) {
    return tests.sort((a: any, b: any) => {
        const categoryA = a.category.name
        const categoryB = b.category.name
        if (categoryA < categoryB) return -1;
        if (categoryA > categoryB) return 1;
        return 0;
    });
}