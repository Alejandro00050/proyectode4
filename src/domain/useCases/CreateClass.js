/*
 * Create Class Use Case
 *
 * Responsabilidad:
 * - Validar los datos básicos.
 * - Crear una nueva clase.
 */

import { Class } from "../entities/Class.js";

export class CreateClass {

    constructor(classRepository) {
        this.classRepository = classRepository;
    }

    async execute(classData) {

        if (!classData.name?.trim()) {
            throw new Error(
                "El nombre de la clase es obligatorio."
            );
        }

        if (!classData.teacher?.trim()) {
            throw new Error(
                "El docente es obligatorio."
            );
        }

        const newClass = new Class({
            name: classData.name.trim(),
            teacher: classData.teacher.trim(),
            description:
                classData.description?.trim() || "",
            date: classData.date
        });

        return await this.classRepository.create(
            newClass
        );
    }

}