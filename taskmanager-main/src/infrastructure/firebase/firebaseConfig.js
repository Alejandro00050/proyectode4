import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
/**
 * Almacenamiento OfflineForeStore
 */
import {
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCgowR4I_M8xMxVJwNLYqCfxXsdVBMMbGQ",
    authDomain: "taskmanager-cd30a.firebaseapp.com",
    projectId: "taskmanager-cd30a",
    storageBucket: "taskmanager-cd30a.firebasestorage.app",
    messagingSenderId: "815201097920",
    appId: "1:815201097920:web:07cfd8bfc37e75769fb525",
    measurementId: "G-CMKLRNJB02"
};
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
        localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
    })
});