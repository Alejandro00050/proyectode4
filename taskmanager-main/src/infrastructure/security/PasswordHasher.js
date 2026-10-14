/*
 * Password Hasher
 *
 * Responsabilidad:
 * - Convertir una contraseña en un hash seguro.
 * - Generar un salt aleatorio.
 *
 * Utiliza Web Crypto API del navegador.
 */
export class PasswordHasher {
    async hash(password) {
        return await dcodeIO.bcrypt.hash(password, 12);
    }

    async verify(password, storedHash) {
        return await dcodeIO.bcrypt.compare(
            password,
            storedHash
        );
    }
}