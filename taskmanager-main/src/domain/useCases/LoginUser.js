/*
 * Login User Use Case
 *
 * Responsabilidad:
 * - Buscar el usuario por correo.
 * - Verificar la contraseña.
 * - Permitir o rechazar el inicio de sesión.
 */

export class LoginUser {

    constructor(userRepository) {
        this.userRepository = userRepository;
        //this.passwordHasher = passwordHasher;
    }

    async execute(credentials) {

        const user =
            await this.userRepository.findByEmail(
                credentials.email
            );

     if (!user || user.password !== credentials.password) {
        throw new Error(
            "Correo o contraseña incorrectos."
        );
    }
/*
        if (!user) {
            throw new Error(
                "Correo o contraseña incorrectos."
            );
        }

        const isValid =
            await this.passwordHasher.verify(
                credentials.password,
                user.passwordHash
            );

        if (!isValid) {
            throw new Error(
                "Correo o contraseña incorrectos."
            );
        }
*/
        return user;
    }
}