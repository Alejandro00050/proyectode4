/*
 * Delete Class Use Case
 *
 * Responsabilidad:
 * - Eliminar una clase.
 */

export class DeleteClass {

    constructor(classRepository) {
        this.classRepository = classRepository;
    }

    async execute(id) {

        if (!id) {
            throw new Error(
                "El identificador de la clase es obligatorio."
            );
        }

        return await this.classRepository.delete(id);
    }

}