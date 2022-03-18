import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD5-mPjo-Mm4673VbNAra2Drufn8GXKim8",
  authDomain: "bt3103-final-project-b28c5.firebaseapp.com",
  projectId: "bt3103-final-project-b28c5",
  storageBucket: "bt3103-final-project-b28c5.appspot.com",
  messagingSenderId: "134384832846",
  appId: "1:134384832846:web:d807e0cf38f7d501a24e1f",
};

const firebaseApp = initializeApp(firebaseConfig);
createApp(App).use(router).mount("#app");
export default firebaseApp;
