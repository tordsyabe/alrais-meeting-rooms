import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwNjRkSm0_6KizBdtnZBFrELFf3Urr7uQ",
  authDomain: "alrais-meeting-rooms.firebaseapp.com",
  projectId: "alrais-meeting-rooms",
  storageBucket: "alrais-meeting-rooms.appspot.com",
  messagingSenderId: "797160299273",
  appId: "1:797160299273:web:f31f17e78b87e7751551d8",
};

firebase.initializeApp(firebaseConfig);

export const database = {
  rooms: firebase.firestore().collection("rooms"),
  meetings: firebase.firestore().collection("meetings"),
};

export default firebase;
