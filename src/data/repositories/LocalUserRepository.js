const STORAGE_KEY = "task_manager_users";

export class LocalUserRepository {

    async save(user) {

        const users =
            this.getUsers();

        const newUser = {
            ...user,
            id: crypto.randomUUID()
        };

        users.push(newUser);

        this.saveUsers(users);

        return newUser;
    }

    async findByEmail(email) {

        const users =
            this.getUsers();

        return users.find(
            user => user.email === email
        ) || null;
    }

    getUsers() {

        const data =
            localStorage.getItem(
                STORAGE_KEY
            );

        if (!data) {
            return [];
        }

        return JSON.parse(data);
    }

    saveUsers(users) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(users)
        );
    }
}