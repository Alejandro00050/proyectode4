/*
 * Class Presenter
 *
 * Responsabilidad:
 * - Recibir las acciones de Class View.
 * - Ejecutar los Use Cases.
 * - Actualizar la View.
 */

import {
    renderClasses,
    showClassMessage,
    fillClassForm
} from "../views/classView.js";

export class ClassPresenter {

    constructor(
        container,
        createClass,
        getClasses,
        updateClass,
        deleteClass,
        classRepository
    ) {
        this.container = container;
        this.createClass = createClass;
        this.getClasses = getClasses;
        this.updateClass = updateClass;
        this.deleteClass = deleteClass;
        this.editingId = null;
        this.classRepository = classRepository;
    }

    async save(classData) {

        try {

            if (this.editingId) {

                await this.updateClass.execute(
                    this.editingId,
                    classData
                );

                this.editingId = null;

                showClassMessage(
                    "Clase actualizada correctamente."
                );

            } else {

                await this.createClass.execute(
                    classData
                );

                showClassMessage(
                    "Clase creada correctamente."
                );
            }

            this.clearForm();

            await this.loadClasses();

        } catch (error) {

            showClassMessage(
                error.message
            );
        }
    }

    edit(classData) {

        this.editingId = classData.id;

        fillClassForm(classData);
    }

    async delete(id) {

        const confirmed =
            confirm(
                "¿Deseas eliminar esta clase?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await this.deleteClass.execute(id);

            showClassMessage(
                "Clase eliminada correctamente."
            );

            await this.loadClasses();

        } catch (error) {

            showClassMessage(
                error.message
            );
        }
    }

    clearForm() {

        this.editingId = null;

        const form =
            document.getElementById(
                "class-form"
            );

        if (form) {
            form.reset();
        }

        const submitButton =
            document.getElementById(
                "class-submit"
            );

        if (submitButton) {
            submitButton.textContent =
                "Registrar clase";
        }
    }

    loadClasses() {
    try {
        const classes = this.classRepository.getClasses();

        renderClasses(classes, this, false);

    } catch (error) {
        showClassMessage(error.message);
    }
}
/*
    async loadClasses() {
    try {
        this.unsubscribe =
            this.getClasses.execute(
                ({ classes, pending }) => {

                    console.log("CLASES:", classes);
                    console.log("PENDING:", pending);

                    renderClasses(
                        classes,
                        this,
                        pending
                    );
                }
            );

    } catch (error) {
        showClassMessage(error.message);
    }
}
    */
}