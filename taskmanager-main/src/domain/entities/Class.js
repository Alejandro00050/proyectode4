/*
 * Class Entity
 *
 * Representa una clase dentro de la aplicación.
 *
 * Esta entidad no sabe:
 * - dónde se guarda
 * - cómo se muestra
 * - cómo funciona LocalStorage
 * - cómo funciona Firestore
 */

export class Class {

    constructor({
        id = null,
        name,
        teacher,
        description,
        date
    }) {
        this.id = id;
        this.name = name;
        this.teacher = teacher;
        this.description = description;
        this.date = date;
    }

}