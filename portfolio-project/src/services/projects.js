import { db } from "../firebase";
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const projectsCol = collection(db, "portfolioProjects");

// Ophalen projecten
export const getProjects = async () => {
  const snapshot = await getDocs(query(projectsCol, orderBy("createdAt", "desc")));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Toevoegen project
export const addProject = async (project) => {
  const docRef = await addDoc(projectsCol, project);
  return docRef.id;
};

// Realtime listener
export const listenProjects = (callback) => {
  return onSnapshot(query(projectsCol, orderBy("createdAt", "desc")), (snapshot) => {
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(projects);
  });
};
