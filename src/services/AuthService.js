import firebase from "../firebase";

export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logout = () => {
  return firebase.auth().signOut();
};