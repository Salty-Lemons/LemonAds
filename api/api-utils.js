import firebase, { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFSSFrRHGHgL4bPBGWBACj_83-kZi7PIM",
  authDomain: "lemonads-9fbfb.firebaseapp.com",
  projectId: "lemonads-9fbfb",
  storageBucket: "lemonads-9fbfb.appspot.com",
  messagingSenderId: "564630840177",
  appId: "1:564630840177:web:ad6b15ace8bef6cde00cd0",
  measurementId: "G-5JN8F6Y7H0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Create a new user document in the database
export const createUserDocument = async (targetDaily) => {
  try {
    const user = getUser();
    const { uid, email } = user;
    const docRef = await setDoc(doc(db, "users", uid), {
      email,
      displayName: "",
      points: 0,
      targetDaily,
      completedToday: 0,
      completedTotal: 0,
      streak: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Document written with ID: ", uid);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateUserDocument = async (data) => {
  try {
    const user = getUser();
    const { uid } = user;
    const docRef = await setDoc(doc(db, "users", uid), data, {
      merge: true,
    });
    console.log("Document written with ID: ", uid);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Create a user with email and password
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

// Login a user with email and password
export const loginUser = async (email, password) => {
  console.log(email, password);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

// Get the current user
export const getUser = () => {
  console.log(auth.currentUser);
  return auth.currentUser;
};

// Logout the current user
export const logoutUser = () => {
  console.log("Logging out");
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.log(error);
    });
};

// TODO: Implement Google Login
// Not working yet
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    console.log(user, token);
    return user;
  } catch (error) {
    console.log(error);
  }
};
