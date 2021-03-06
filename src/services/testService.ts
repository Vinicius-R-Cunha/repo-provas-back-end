import * as testRepository from "../repositories/testRepository.js";
import * as termRepository from "../repositories/termRepository.js";
import * as teacherRepository from "../repositories/teacherRepository.js";
import * as disciplineRepository from "../repositories/disciplineRepository.js";
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";
import * as categoryRepository from "../repositories/categoryRepository.js";

export interface TestData {
    name: string;
    pdfUrl: string;
    category: string;
    discipline: string;
    teacher: string;
}

interface Categories {
    category: {
        name: string;
    };
    teacherDiscipline: {
        teacher: {
            name: string;
        };
    };
}

interface Terms {
    number: number;
}

interface Tests {
    id: number;
    name: string;
    pdfUrl: string;
    views: number;
    category: {
        name: string;
    };
    teacherDiscipline: {
        teacher: {
            name: string;
        };
        discipline: {
            term: Terms;
        };
    };
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

function uniqueName(categories: Categories[]) {
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

function sortTests(tests: Tests[]) {
    return tests.sort((a: any, b: any) => {
        const categoryA = a.category.name
        const categoryB = b.category.name
        if (categoryA < categoryB) return -1;
        if (categoryA > categoryB) return 1;
        return 0;
    });
}

export async function createTest(body: TestData) {
    const categoryId = await validateCategory(body);
    const disciplineId = await validateDiscipline(body);
    const teacherId = await validateTeacher(body);
    const teacherDisciplineId = await validateTeacherDiscipline(disciplineId, teacherId);

    await testRepository.create({
        name: body.name,
        pdfUrl: body.pdfUrl,
        categoryId,
        teacherDisciplineId
    });
}

async function validateCategory(body: TestData) {
    const category = await categoryRepository.getCategorieByName(body.category);

    if (!category) throw { type: 'bad_request', message: 'this category does not exists' }

    return category.id;
}

async function validateDiscipline(body: TestData) {
    const discipline = await disciplineRepository.getDisciplineByName(body.discipline);

    if (!discipline) throw { type: 'bad_request', message: 'this discipline does not exists' }

    return discipline.id;
}

async function validateTeacher(body: TestData) {
    const teacher = await teacherRepository.getTeacherByName(body.teacher);

    if (!teacher) throw { type: 'bad_request', message: 'this teacher does not exists' }

    return teacher.id;
}

async function validateTeacherDiscipline(disciplineId: number, teacherId: number) {
    const teacherDiscipline = await teacherDisciplineRepository.getTeacherDisciplineByDisciplineIdAndTeacherId(disciplineId, teacherId);

    if (!teacherDiscipline) throw { type: 'bad_request', message: 'this teacher does not teach this discipline' }

    return teacherDiscipline.id;
}