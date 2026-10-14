/*
 * Login View
 *
 * Responsabilidad:
 * - Mostrar la interfaz de Login.
 * - Capturar las acciones del usuario.
 * - Informar esas acciones al Presenter.
 *
 * NO contiene lógica de autenticación.
 */

/**
 * Muestra la vista de Login.
 *
 * @param {HTMLElement} container
 * @param {Object} presenter
 */
export function showLoginView(container, presenter) {
    console.log("Al crear la vista:", presenter);
    container.innerHTML = `
        <section class="auth-container">

            <div class="auth-card">

                <header class="auth-header">
                    <h1>Gestor Escolar</h1>
                    <p>Inicia sesión para continuar</p>
                </header>

                <form id="login-form" class="auth-form">

                    <div class="form-group">
                        <label for="login-email">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            id="login-email"
                            name="email"
                            placeholder="correo@ejemplo.com"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="login-password">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            id="login-password"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            required
                        >
                    </div>

                    <button
                        type="submit"
                        class="button button-primary"
                    >
                        Iniciar sesión
                    </button>

                </form>

                <div class="auth-footer">

                    <p>
                        ¿No tienes una cuenta?
                    </p>

                    <button
                        id="show-register"
                        class="button button-link"
                        type="button"
                    >
                        Crear cuenta
                    </button>

                </div>

                <p
                    id="login-message"
                    class="form-message"
                ></p>

            </div>

        </section>
    `;

    /*
     * Formulario de Login.
     */
    const loginForm = document.getElementById("login-form");
    console.log("Antes de registrar el evento:", presenter);
    loginForm.addEventListener("submit", (event) => {

        /*
         * Evitamos que el navegador recargue la página.
         */
        event.preventDefault();

        /*
         * Obtenemos los datos introducidos por el usuario.
         */
        const formData = new FormData(loginForm);

        const credentials = {
            email: formData.get("email"),
            password: formData.get("password")
        };

        /*
         * El Presenter recibe la acción.
         *
         * La View NO decide qué hacer con las credenciales.
         */
        console.log("Presenter dentro del evento:", presenter);
        console.log("Login dentro del evento:", presenter?.login);

        

        //await presenter.login(credentials);
        presenter.login(credentials);
        debugger;
    });


    /*
     * Botón para ir al Registro.
     */
    const registerButton = document.getElementById("show-register");

    registerButton.addEventListener("click", () => {
        console.log("Presenter en registro:", presenter);
        presenter.showRegister();
    });
}


/**
 * Muestra un mensaje al usuario.
 *
 * @param {string} message
 */
export function showLoginMessage(message) {

    const messageElement =
        document.getElementById("login-message");

    if (messageElement) {
        messageElement.textContent = message;
    }
}