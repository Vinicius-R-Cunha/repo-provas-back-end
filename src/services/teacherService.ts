import * as teacherRepository from "../repositories/teacherRepository.js";

interface TeacherData {
    id: number;
    teacher: {
        name: string;
    }
}

export async function get(discipline: string) {
    const promise = await teacherRepository.getTeachersByDiscipline(discipline);

    return formatData(promise);
}

function formatData(data: TeacherData[]) {
    return data.map(obj => {
        const newObj = { id: 0, name: '' }
        newObj.id = obj.id
        newObj.name = obj.teacher.name
        return newObj;
    });
}