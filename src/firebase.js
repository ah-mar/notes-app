import { initializeApp } from "firebase/app";
import config from "./config";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = config;

//Create a reference to the firebase app
const firebaseApp = initializeApp(firebaseConfig);

//Create a reference to the firestore database.
const db = getFirestore(firebaseApp);

async function readAllDocs() {
  const notesArray = [];
  //Create a coolection refernce
  const collectionRef = collection(db, "notepad");
  //return a snapshot which is an iterable of document snapshot
  const querySnapshot = await getDocs(collectionRef);
  //Loop over and log data for each snapshot by using .data() method
  querySnapshot.forEach((doc) => {
    notesArray.push(doc.data());
  });
  return notesArray;
}

async function addOneDoc({ id, title, text, tags }) {
  const docRef = doc(db, "notepad", id.toString());
  const data = {
    id: id,
    title: title,
    text: text,
    tags: tags,
    date: serverTimestamp(),
  };
  const ref = await setDoc(docRef, data);
  console.log(ref);
  return ref;
}

async function deleteOneDoc(id) {
  const docRef = doc(db, "notepad", id);
  await deleteDoc(docRef);
}

async function modifyOneDoc(id, title, text) {
  const docRef = doc(db, "notepad", id.toString());
  const changedData = {
    title: title,
    text: text,
    date: serverTimestamp(),
  };
  await setDoc(docRef, changedData, { merge: true });
}

export { firebaseApp, readAllDocs, addOneDoc, deleteOneDoc, modifyOneDoc };
