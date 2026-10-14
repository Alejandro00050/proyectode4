/*
 * User Repository
 *
 * Define las operaciones que el dominio
 * necesita para trabajar con usuarios.
 *
 * NO sabemos todavía si los datos estarán
 * en LocalStorage, Firestore u otro origen.
 */

export class UserRepository {

    async save(user) {
        throw new Error("Method not implemented");
    }

    async findByEmail(email) {
        throw new Error("Method not implemented");
    }

}