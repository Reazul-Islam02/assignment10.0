import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCJI2NYBP3t8gv4JcYG0HjzNLtv-tHVB4U",
    authDomain: "anmr-85dc8.firebaseapp.com",
    projectId: "anmr-85dc8",
    storageBucket: "anmr-85dc8.firebasestorage.app",
    messagingSenderId: "47159026792",
    appId: "1:47159026792:web:db6b69ddd6619ba4fb87dd",
    measurementId: "G-8BDGF5WP47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default app;
export { auth };
