/*
 * Register User Use Case
 *
 * Contiene las reglas necesarias para
 * registrar un nuevo usuario.
 */

import { User } from "../entities/User.js";

export class RegisterUser {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(user) {

        const existingUser =
            await this.userRepository.findByEmail(user.email);

        if (existingUser) {
            throw new Error(
                "Ya existe un usuario con este correo."
            );
        }

        return await this.userRepository.save(user);
    }

}
    /*



import { User } from "../entities/User.js";

export class RegisterUser {

    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    async execute(userData) {

        const existingUser =
            await this.userRepository.findByEmail(
                userData.email
            );

        if (existingUser) {
            throw new Error(
                "Ya existe un usuario con este correo."
            );
        }

        const passwordData =
            await this.passwordHasher.hash(
                userData.password
            );

        const user = new User({
            name: userData.name,
            email: userData.email,
            passwordHash: passwordData
        });

        return await this.userRepository.save(user);
    }
}
    */