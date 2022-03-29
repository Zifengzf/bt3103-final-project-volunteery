import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { initializeApp } from "firebase/app";
// import VueChartkick from "vue-chartkick";
// import "chartkick/chart.js";

const firebaseConfig = {
  apiKey: "AIzaSyALDpy_-8jsGYbuUEPx1v8tdCUJ_a5tVmA",
  authDomain: "volunteery-e7be8.firebaseapp.com",
  projectId: "volunteery-e7be8",
  storageBucket: "volunteery-e7be8.appspot.com",
  messagingSenderId: "1009078240371",
  appId: "1:1009078240371:web:3dacd224c7306b229ed606",
  measurementId: "G-QWC9N4DDSD",
};

const firebaseApp = initializeApp(firebaseConfig);
// createApp(App).use(router, VueChartkick).mount("#app");
createApp(App).use(router).mount("#app");
export default firebaseApp;
