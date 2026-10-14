/*
 * Get Classes Use Case
 *
 * Responsabilidad:
 * - Obtener todas las clases.
 */

export class GetClasses {

    constructor(classRepository) {
        this.classRepository = classRepository;
    }
    //Local Storage
    async execute() {
    return await this.classRepository.getClasses();
}
    /*
    execute(callback) {
        return this.classRepository.listenToClasses(callback);
    }
        */
}