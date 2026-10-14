const STORAGE_KEY = "task_manager_class";

export class LocalClassRepository {

    async create(classData) {

        const classes =
            this.getClasses();

        const newClass = {
            ...classData,
            id: crypto.randomUUID()
        };

        classes.push(newClass);

        this.saveClasses(classes);

        return newClass;
    }

    async findAll() {

        return this.getClasses();
    }

    async findById(id) {

        const classes =
            this.getClasses();

        return classes.find(
            item => item.id === id
        ) || null;
    }

    async update(id, classData) {

        const classes =
            this.getClasses();

        const index =
            classes.findIndex(
                item => item.id === id
            );

        if (index === -1) {
            throw new Error(
                "La clase no existe."
            );
        }

        const updatedClass = {
            ...classes[index],
            ...classData,
            id
        };

        classes[index] =
            updatedClass;

        this.saveClasses(classes);

        return updatedClass;
    }

    async delete(id) {

        const classes =
            this.getClasses();

        const filteredClasses =
            classes.filter(
                item => item.id !== id
            );

        if (
            filteredClasses.length ===
            classes.length
        ) {
            throw new Error(
                "La clase no existe."
            );
        }

        this.saveClasses(
            filteredClasses
        );
    }

    getClasses() {

        const data =
            localStorage.getItem(
                STORAGE_KEY
            );

        if (!data) {
            return [];
        }

        return JSON.parse(data);
    }

    saveClasses(classes) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(classes)
        );
    }
}