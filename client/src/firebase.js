
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bdi-test-5d9bc.firebaseapp.com",
  projectId: "bdi-test-5d9bc",
  storageBucket: "bdi-test-5d9bc.appspot.com",
  messagingSenderId: "418390664",
  appId: "1:418390664:web:b3ccf6aca28d2ac1ddb53d"
};


export const app = initializeApp(firebaseConfig);

