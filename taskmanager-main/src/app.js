/*
 * Punto de entrada de la aplicación.
 *
 * Aquí ensamblamos las diferentes partes
 * de nuestra aplicación.
 */
import { showLoginView } from "./presentation/views/loginView.js";
import { LoginPresenter } from "./presentation/controllers/loginPresenter.js";
import { ClassPresenter } from "./presentation/controllers/classPresenter.js";
import { LocalUserRepository } from "./data/repositories/LocalUserRepository.js";
import { LocalClassRepository } from "./data/repositories/LocalClassRepository.js";
import { FirestoreClassRepository } from "./data/repositories/FirestoreClassRepository.js";
import { RegisterUser } from "./domain/useCases/RegisterUser.js";
import { PasswordHasher } from "./infrastructure/security/PasswordHasher.js";
import { LoginUser } from "./domain/useCases/LoginUser.js";
import { GetClasses } from "./domain/useCases/GetClasses.js";
import { UpdateClass } from "./domain/useCases/UpdateClass.js";
import { DeleteClass } from "./domain/useCases/DeleteClass.js";
import { CreateClass } from "./domain/useCases/CreateClass.js";


const passwordHasher = new PasswordHasher();

//const password = "MiClave123";

//const hash = await passwordHasher.hash(password);

//console.log("Hash generado:", hash);

//const resultado = await passwordHasher.verify(password,hash);

//console.log("¿Coincide la contraseña?", resultado);

const app = document.getElementById("app");

/*
 * Repositorys
 */
const userRepository = new LocalUserRepository();
// LOCALSTORAGE
const classRepository = new LocalClassRepository();

// FIRESTORE
//const classRepository = new FirestoreClassRepository();

console.log(
    "Repositorio utilizado:",
    classRepository.constructor.name
);

/*
 * Use Cases
 */

const registerUser = new RegisterUser(userRepository);

const loginUser = new LoginUser(userRepository);

const createClass =new CreateClass(classRepository);

const getClasses =new GetClasses(classRepository);

const updateClass =new UpdateClass(classRepository);

const deleteClass =new DeleteClass(classRepository);

/*
 * ==========================================
 * CLASS PRESENTER
 * ==========================================
 */

const classPresenter =
    new ClassPresenter(
        app,
        createClass,
        getClasses,
        updateClass,
        deleteClass,
        classRepository
    );

/*
 * Presenter
 *
 * LoginUser valida el inicio de sesion
 */

const loginPresenter = new LoginPresenter(
        app,
        loginUser,
        registerUser,
        classPresenter
    );

/**
 * Service Worker
 */
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
        .then(registration => {
            //console.log("Service Worker registrado:", registration);
        })
        .catch(error => {
            console.error("Error al registrar:", error);
        });
}

/*
 * Mostrar Login
 */

showLoginView(
    app,
    loginPresenter
);