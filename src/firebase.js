import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref, getDownloadURL, deleteObject, uploadBytes, uploadBytesResumable } from "firebase/storage";

import store from './store/index.js'


// FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyBQ1pV7r6oQMaA5H0gr4HAyb4ByIhChizs",
    authDomain: "desca-8b3c4.firebaseapp.com",
    projectId: "desca-8b3c4",
    storageBucket: "desca-8b3c4.appspot.com",
    messagingSenderId: "887874748846",
    appId: "1:887874748846:web:04db252de99f6f9b28883f",
    measurementId: "G-VXVXK0GD4B"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const storage = getStorage();

// LOG IN / OUT
function login(callback) {
    const provider = new GoogleAuthProvider();
    // authenticate
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            callback(user)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

}
function logOut() {
    signOut(auth).then(() => location.replace('/'))
}

// MANAGE PIC
async function downloadPic(key) {
    const url = await getDownloadURL(ref(storage, key))
    return url
}

function deletePic(key) {
    const pic = ref(storage, key);

    deleteObject(pic).then(() => {
        console.log('deleted successfully')
    }).catch((error) => {
        console.log(error)
    });    
}

function uploadPic(key, image) {
    const storage = getStorage();
    const storageRef = ref(storage, key);
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        store.dispatch('uploadProgress', progress)
    })
    return uploadTask.then((snapshot) => {
      store.dispatch('uploadProgress', "Uploaded!")
      console.log('uploaded successfully')
    });
}

export { login, logOut, downloadPic, deletePic, uploadPic }