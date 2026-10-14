/*
 * Update Class Use Case
 *
 * Responsabilidad:
 * - Actualizar una clase existente.
 */

export class UpdateClass {

    constructor(classRepository) {
        this.classRepository = classRepository;
    }

    async execute(id, classData) {

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

        return await this.classRepository.update(
            id,
            {
                name: classData.name.trim(),
                teacher: classData.teacher.trim(),
                description:
                    classData.description?.trim() || "",
                date: classData.date
            }
        );
    }

}