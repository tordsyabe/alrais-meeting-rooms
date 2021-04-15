import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCv_Q14bJpy0ZQeGZpI9HVTXxWJnijg_3M",
  authDomain: "alrais-meeting-room.firebaseapp.com",
  projectId: "alrais-meeting-room",
  storageBucket: "alrais-meeting-room.appspot.com",
  messagingSenderId: "4031671891",
  appId: "1:4031671891:web:d472dfc8a4037cb1b520a6",
};

firebase.initializeApp(firebaseConfig);

export const database = {
  rooms: firebase.firestore().collection("rooms"),
  bookings: firebase.firestore().collection("bookings"),
};

export default firebase;
