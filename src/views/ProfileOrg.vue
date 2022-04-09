<template>
  <div style="text-align:center;" v-if="user">
      <NavBar2/>
        <div class="mainbanner">
            <div class="maintext">
            <div
                style="
                color: #ff9213;
                text-align: center;
                font-size: 50px;
                font-family: Georgia, 'Times New Roman', Times, serif;
                "
            >
                My Profile
            </div>
            <p style="color: black; text-align: center">
                “As you grow older, you will discover that you have two hands <br />
                — one for helping yourself, the other for helping others.”, <br />
                —Audrey Hepburn
            </p>
            <br />
            </div>
        </div>
    <div class="bottombanner">
      <div v-if="user">
        <div>
        <table id="table2" class="auto-index">
          <tr>
            <th>Provider-Specific UID</th>
            <th>{{user.uid}}</th>
          </tr>
          <tr>
            <th>Email</th>
            <th>{{user.email}}</th>
          </tr>
          <tr>
            <th>Organisation Name</th>
            <th id="fn"></th>
          </tr>
          <tr>
            <th>Account Creation Date</th>
            <th id='cd'>{{ user.metadata.creationTime }}</th>
          </tr>
        </table>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import NavBar2 from "@/components/NavBar2.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { getDoc, doc } from "firebase/firestore";

export default {
  name: "profilePage",
  components: {
    NavBar2,
  },
  data() {
    return {
      user: false,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
    const db = getFirestore(firebaseApp);     
    var email = auth.currentUser.email;
    async function display(){
      var z = await getDoc(doc(db, "Organisation", email));
      var userInfo = z.data();
      var volName =  userInfo.Name;

      document.getElementById("fn").innerHTML = volName;

    }
    display()
  },
};
</script>

<style scoped>
.mainbanner {
  background-image: url("../assets/volunteer_bg.png");
  background-size: cover;
  position: relative;
  width: 100%;
  min-height: 600px;
  padding-top: 0%;
  padding-bottom: 0%;
}
.maintext {
  margin: 0;
  position: absolute;
  top: 30%;
  left: 50%;
  -ms-transform: translate(-50%, -30%);
  transform: translate(-50%, -30%);
}
table {
  font-family: arial, sans-serif;
  border: 3px solid #ffd466;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}
.bottombanner {
  background-color: #fff9e9;
  min-height: 500px;
  padding: 5%;
}
</style>