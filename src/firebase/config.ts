import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import  'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDeGE3oRU91eqkkxgMMIiPKAK_xTKNbfxI",
    authDomain: "olx-clone-19311.firebaseapp.com",
    projectId: "olx-clone-19311",
    storageBucket: "olx-clone-19311.appspot.com",
    messagingSenderId: "1029084253883",
    appId: "1:1029084253883:web:ab0f45b6f471ac4163639e"
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp); 

