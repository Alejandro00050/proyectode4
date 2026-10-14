import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    getDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { db } from "../../infrastructure/firebase/firebaseConfig.js";

const COLLECTION_NAME = "classes";


export class FirestoreClassRepository {

    async create(classData) {

        const documentReference =
            await addDoc(
                collection(
                    db,
                    COLLECTION_NAME
                ),
                {
                    name: classData.name,
                    teacher: classData.teacher,
                    description: classData.description,
                    date: classData.date
                }
            );

        return {
            id: documentReference.id,
            ...classData
        };
    }


    async findAll() {

        const snapshot =
            await getDocs(
                collection(
                    db,
                    COLLECTION_NAME
                )
            );

        return snapshot.docs.map(
            document => ({
                id: document.id,
                ...document.data()
            })
        );
    }


    async findById(id) {

        const documentReference =
            doc(
                db,
                COLLECTION_NAME,
                id
            );

        const snapshot =
            await getDoc(
                documentReference
            );

        if (!snapshot.exists()) {
            return null;
        }

        return {
            id: snapshot.id,
            ...snapshot.data()
        };
    }


    async update(id, classData) {

        const documentReference =
            doc(
                db,
                COLLECTION_NAME,
                id
            );

        await updateDoc(
            documentReference,
            {
                name: classData.name,
                teacher: classData.teacher,
                description: classData.description,
                date: classData.date
            }
        );

        return {
            id,
            ...classData
        };
    }


    async delete(id) {

        const documentReference =
            doc(
                db,
                COLLECTION_NAME,
                id
            );

        await deleteDoc(
            documentReference
        );
    }

        listenToClasses(callback) {
        console.log("CREANDO LISTENER DE CLASSES");
        const classesRef = collection(db, COLLECTION_NAME);

        return onSnapshot(
            classesRef,
            { includeMetadataChanges: true },
            (snapshot) => {
                console.log(
                "SNAPSHOT",
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                        fromCache: snapshot.metadata.fromCache,
                        pending: doc.metadata.hasPendingWrites
                    }))
                );
                const pending = snapshot.docs.some(
                    doc => doc.metadata.hasPendingWrites
                );

                callback({
                    pending,
                    classes: snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                });
            }
        );
    }
}