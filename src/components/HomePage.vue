<template>
  <!-- <div class="topnav">
    <img src="@/assets/volunteery_copy.png" alt="" style="margin-left: 0px" />
    <a
      href=""
      style="
        font-size: 15px;
        color: #d3b566;
        float: right;
        margin-top: 20px;
        margin-right: 15px;
      "
      >VIEW VOLUNTEERING OPPORTUNITIES</a
    >
  </div> -->

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
        VOLUNTEERY
      </div>
      <p style="color: black; text-align: center">
        “As you grow older, you will discover that you have two hands <br />
        — one for helping yourself, the other for helping others.”, <br />
        —Audrey Hepburn
      </p>
      <br />
    </div>
    <div class="mainbuttons">
      <button v-on:click="displayLogin()" style="margin-right: 20px">
        LOGIN
      </button>
      <button v-on:click="displaySignup()">SIGN UP</button>
    </div>
  </div>

  <div class="bottombanner">
    <div style="color: #fff9e9">Placeholder to takeup space</div>
    <img
      src="@/assets/volunteer_clip.png"
      alt=""
      style="float: right; height: 200px"
    />
    <div class="abouttext" style="color: #ff9213">ABOUT VOLUNTEERY</div>
    <div class="abouttext">
      Volunteery is a platform that matches volunteers to organizations.
    </div>

    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>

  <div id="id01" class="modal">
    <form class="modal-content animate">
      <div class="imgcontainer">
        <span
          onclick="document.getElementById('id01').style.display='none'"
          class="close"
          title="Close Modal"
          >&times;</span
        >
        <img src="@/assets/volunteery_copy.png" alt="Avatar" class="avatar" />
      </div>

      <div class="container">
        <div class="centeredtext" style="color: #ff9213; font-size: 24px">
          VOLUNTEER LOGIN
        </div>

        <label for="uname"><b>Username</b></label>
        <input
          type="text"
          id="v_username"
          placeholder="Enter Username"
          name="uname"
          required
        />

        <label for="psw"><b>Password</b></label>
        <input
          type="password"
          id="v_password"
          placeholder="Enter Password"
          name="psw"
          required
        /><br />

        <button class="orglogin" type="button" v-on:click="orgdisplaySignup()">
          Switch to Organization Login</button
        ><br />

        <button class="orange" type="button" v-on:click="volunteerLogin()">
          LOGIN
        </button>
        <span class="psw">
          <a href="#" style="color: #6b93fa">Forgot password?</a>
        </span>
      </div>
    </form>
  </div>

  <div id="id01b" class="modal">
    <form class="modal-content animate" style="background-color: #ff9213">
      <div class="imgcontainer">
        <span
          onclick="document.getElementById('id01b').style.display='none'"
          class="close"
          title="Close Modal"
          >&times;</span
        >
        <img src="@/assets/whiteBackground.png" alt="Avatar" class="avatar" />
      </div>

      <div class="container">
        <div class="centeredtext" style="color: white; font-size: 24px">
          ORGANIZATION LOGIN
        </div>

        <label for="uname"><b>Username</b></label>
        <input
          type="text"
          id="o_username"
          placeholder="Enter Username"
          name="uname"
          required
        />

        <label for="psw"><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter Password"
          id="o_password"
          name="psw"
          required
        /><br />
        <button class="vollogin" v-on:click="voldisplaySignup()">
          Switch to Volunteer Login</button
        ><br />
        <button class="ff9213" type="button" v-on:click="organizationLogin()">
          LOGIN
        </button>
        <span class="psw"
          ><a href="#" style="color: white">Forgot password?</a></span
        >
      </div>
    </form>
  </div>

  <div id="id02" class="modal">
    <form class="modal-content" id="userForm">
      <div class="imgcontainer">
        <span
          onclick="document.getElementById('id02').style.display='none'"
          class="close"
          title="Close Modal"
          >&times;</span
        >
        <img src="@/assets/volunteery_copy.png" alt="Avatar" class="avatar" />
      </div>
      <div class="container">
        <div class="centeredtext" style="color: #ff9213; font-size: 24px">
          SIGN UP
        </div>
        <hr />
        <p><b>Sign up with Singpass</b></p>
        <img id="myinfo" src="@/assets/myinfo_logo.png" alt="" />
        <button id="Singpass">Use Singpass to prefill your details</button>
        <hr />
        <p><b>Or enter your details manually</b></p>

        <label for="name"><b>Full Name</b></label>
        <input type="text" placeholder="Enter Name" id="full_name" required />

        <label for="nric"><b>NRIC/FIN</b></label>
        <input type="text" placeholder="Enter NRIC/FUN" id="nric" required />

        <label for="nationality"><b>Nationality</b></label>
        <input
          type="text"
          placeholder="Enter Nationality"
          id="nationality"
          required
        />

        <label for="email"><b>Email</b></label>
        <input type="email" id="email" placeholder="Enter Email" required />

        <label for="psw"><b>Password</b></label>
        <input
          type="password"
          id="signup_password"
          placeholder="Enter Password"
          name="psw"
          required
        />

        <label for="psw-repeat"><b>Repeat Password</b></label>
        <input
          type="password"
          placeholder="Repeat Password"
          name="psw-repeat"
          required
        />

        <p>
          By creating an account you agree to our
          <a href="#" style="color: dodgerblue">Terms and Privacy Conditions</a
          >.
        </p>

        <label>
          <input type="checkbox" checked="checked" name="remember" />
        </label>

        <div class="clearfix">
          <button type="button" class="orange" v-on:click="userSignUp()">
            SIGN UP
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from "@/main.js";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
var modal = document.getElementById("id01");
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

export default {
  methods: {
    displayLogin() {
      return (document.getElementById("id01").style.display = "block");
    },
    displaySignup() {
      return (document.getElementById("id02").style.display = "block");
    },
    orgdisplaySignup() {
      document.getElementById("id01").style.display = "none";
      document.getElementById("id01b").style.display = "block";
    },
    voldisplaySignup() {
      document.getElementById("id01").style.display = "block";
      document.getElementById("id01b").style.display = "none";
    },
    volunteerLogin() {
      var username = document.getElementById("v_username").value;
      var password = document.getElementById("v_password").value;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, username, password)
        .then(() => {
          this.$router.push({ name: "Volunteer" });
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    organizationLogin() {
      var username = document.getElementById("o_username").value;
      var password = document.getElementById("o_password").value;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, username, password)
        .then(() => {
          this.$router.push({ name: "OpportunitiesPage" });
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    async userSignUp() {
      var name = document.getElementById("full_name").value;
      var nric = document.getElementById("nric").value;
      var nationality = document.getElementById("nationality").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("signup_password").value;
      const db = getFirestore(firebaseApp);
      const docRef = doc(db, "volunteers", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("User already exists");
        alert("User already exists");
      } else {
        await setDoc(doc(db, "volunteers", email), {
          name: name,
          nric: nric,
          nationality: nationality,
          email: email,
          password: password,
          currentPoints: 0,
          totalPoints: 0,
        });
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            this.$router.push({ name: "MyApplications" });
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    },
  },
};
</script>
<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
}

a {
  text-decoration: none;
}

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

.mainbuttons {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
/* Set a style for all buttons */
button {
  background-color: #ffd466;
  border-radius: 10px;
  color: black;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  font-size: 18px;
  width: 125px;
}

button.orange {
  background-color: #ff9213;
  color: white;
}

.orglogin {
  text-decoration: none;
  color: #6b93fa;
  font-size: 70%;
  border-radius: 10px;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
  background-color: #fff9e9;
  width: 160px;
}

.vollogin {
  text-decoration: none;
  color: white;
  font-size: 70%;
  border-radius: 10px;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
  background-color: #ff9213;
  width: 160px;
}

.topnav {
  background-color: #fff9e9;
  min-height: 50px;
  overflow: hidden;
}

.bottombanner {
  background-color: #fff9e9;
}

.abouttext {
  margin-top: 2%;
  margin-left: 2%;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.centeredtext {
  text-align: center;
}

/* Full-width input fields */
input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  border-radius: 10px;
  margin: 10px 0px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button:hover {
  opacity: 0.8;
}

/* Center the image and position the close button */
.imgcontainer {
  text-align: center;
  margin: 24px 0 0px 0;
  position: relative;
}

img.avatar {
  width: 20%;
  /* border-radius: 50%; */
}

.container {
  margin-left: 10%;
  margin-right: 10%;
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 0px;
}

#Singpass {
  background-color: rgb(161, 51, 51);
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: #fff9e9; /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fff9e9;
  margin: 10% auto 15% auto; /* 10% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  border-radius: 25px;
  width: 60%; /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

#myinfo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  height: 80px;
}
/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s;
}

@-webkit-keyframes animatezoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

@keyframes animatezoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }

  .mainbutton {
    width: 200px;
    color: fuchsia;
  }
}
</style>
