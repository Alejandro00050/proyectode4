/*
 * Task View
 *
 * Responsabilidad:
 * - Mostrar la interfaz principal de tareas.
 * - Mostrar tareas recibidas.
 *
 * Esta View NO:
 * - Guarda tareas.
 * - Consulta LocalStorage.
 * - Consulta Firestore.
 * - Ejecuta CRUD.
 */

/**
 * Muestra la vista principal de tareas.
 *
 * @param {HTMLElement} container
 * @param {Array} tasks
 */
export function showTaskView(container, tasks = []) {

    container.innerHTML = `
        <section class="app-container">

            <header class="app-header">

                <div>
                    <h1>Mis tareas</h1>
                    <p>Organiza tus actividades escolares</p>
                </div>

                <button
                    id="logout-button"
                    class="button button-secondary"
                >
                    Cerrar sesión
                </button>

            </header>

            <section class="task-section">

                <div class="section-header">

                    <h2>Tareas</h2>

                    <button
                        id="new-task-button"
                        class="button button-primary"
                    >
                        + Nueva tarea
                    </button>

                </div>

                <div
                    id="task-list"
                    class="task-list"
                >
                    ${renderTasks(tasks)}
                </div>

            </section>

        </section>
    `;
}

/**
 * Genera el HTML correspondiente a las tareas.
 *
 * @param {Array} tasks
 * @returns {string}
 */
function renderTasks(tasks) {

    // Si no existen tareas, mostramos un estado vacío.
    if (tasks.length === 0) {

        return `
            <div class="empty-state">

                <h3>No tienes tareas</h3>

                <p>
                    Crea tu primera tarea para comenzar.
                </p>

            </div>
        `;
    }

    // Generamos una tarjeta por cada tarea.
    return tasks.map(task => `
        <article class="task-card">

            <div class="task-content">

                <h3>${task.title}</h3>

                <p>
                    ${task.description}
                </p>

            </div>

            <span class="task-priority">
                ${task.priority}
            </span>

        </article>
    `).join("");
}