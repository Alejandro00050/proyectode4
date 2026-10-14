/*
 * Register Presenter
 *
 * Responsabilidad:
 * - Recibir las acciones de Register View.
 * - Coordinar el registro.
 * - Mostrar el resultado en la View.
 */

import { showRegisterMessage } from "../views/registerView.js";
import { showLoginView } from "../views/loginView.js";

export class RegisterPresenter {

    constructor(container, registerUser, loginPresenter) {
        this.container = container;
        this.registerUser = registerUser;
        this.loginPresenter = loginPresenter;
    }

    async register(userData) {

        try {

            await this.registerUser.execute(userData);

            showRegisterMessage(
                "Cuenta creada correctamente."
            );

        } catch (error) {

            showRegisterMessage(
                error.message
            );
        }
    }

    showLogin() {
        showLoginView(this.container, this.loginPresenter);
    }
}