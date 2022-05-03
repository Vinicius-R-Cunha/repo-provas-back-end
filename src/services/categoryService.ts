import * as categoryRepository from "../repositories/categoryRepository.js";

export async function get() {
    return await categoryRepository.getCategories();
}