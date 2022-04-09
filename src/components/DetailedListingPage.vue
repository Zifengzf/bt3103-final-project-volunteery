<template>
  <div style="background-color: #fff9e9">
    <div class="mainbanner">
      <div class="maintext">
        <div
          style="
            color: #ff9213;
            text-align: center;
            font-size: 50px;
            font-family: Georgia, 'Times New Roman', Times, serif;"
        >
          Volunteer
        </div>
        <p style="color: black; text-align: center">
          “As you grow older, you will discover that you have two hands <br />
          — one for helping yourself, the other for helping others.”, <br />
          —Audrey Hepburn
        </p>
        <br />
      </div>
    </div>
    <br>
    
    <div class="bottombanner">
      <div class="left">
          <h1>
              <div class="title" id="activityTitle">{{activityTitle}}</div>
          </h1>
          <div class="organisation" style="margin-left:15px">by ABC Elderly Home</div>
          <br>
          <div class="description" style="margin-left:15px" id="activityContent">{{activityContent}}</div>
          <br>
          <div style="opacity:0">{{listing}}</div>
      </div>

      <div class="right" style="width: 400px; padding-right:100px; margin-top:-20px">
          <br><br><br><br>
          <img src="../assets/calendar.png" alt="" style="width: 40px; height: 40px; float: left; margin-right: 10px">
          <div id="activityDate" style="margin-top:12px">17 March 2022</div>
          <div class="buttonclass" style="margin-left:200px; float:left; margin-top:-18px; hover:true" v-on:click="displayLogin()">
              <a class="redeemclass">Apply!</a>
          </div>
          <br><br>
          <img src="../assets/location.png" alt="" style="width: 40px; height: 40px; float: left; margin-right: 10px">
          <div id="activityRegion" style="margin-top:12px">Kent Ridge</div>
          <br><br>
          <img src="../assets/vacancy.png" alt="" style="width: 40px; height: 40px; float: left; margin-right: 10px">
          <div id="activityVacancy" style="margin-top:12px">8 Vacancies Left</div>
      </div>
   
        
      <div class="listingcontainer" style="margin-top: 20px; height:auto">
        <div style="float: left; margin-left:20px; margin-top:10px; width:500px">
          <div class="title" style="float: left">Our Reviews</div>
          <div style="width:100px; margin-top: 15px; margin-left:15px; float:left">
              <img class="divimg2" src="../assets/stars.png">
          </div>
          <div style="margin-left:15px; margin-top: 18px; float:left;">{{avgRate}} Star Rating</div>
        </div>
        
        <div class="buttonclass" style="float:right; margin-top:28px; margin-right:-70px; width:300px" v-on:click="displayLogin2()">
            <a class="redeemclass">Leave a Review</a>
        </div>

        <br><br><br><br>

        <div v-for="message in messages" class="card" :key="message">
          <div class="reward">
              <div class="imgcontainer">
                  <img class="divimg2" src="../assets/stars.png">
              </div>
              <div style="font: Sansation">
                  <h4 class="centeredtext"><span>{{ message.reviewRate }} Star Rating</span></h4>
              </div>
              <div class="buttonclass" style="margin-left:20px; margin-right:20px">
                  <span id="reviewDescription">{{ message.reviewDescription }}</span>
              </div>
          </div>
        </div>

      </div>
    </div>



  <div id="id01" class="modal">
    <form class="modal-content animate">

      <div class="container">
        <div class="overlay"></div>
        <div class="content">
            <div class="imgcontainer" style="float:right">
                <span
                onclick="document.getElementById('id01').style.display='none'"
                class="close" title="Close Modal">&times;</span>
              <br>
            </div>

            <br><br><br>

            <div class="title" id="activityTitle">{{activityTitle}}</div>
            <p>by ABC Elderly Home</p>
            <h3>Tell us why you would like to join us!</h3>
            <textarea rows="5" cols="70" name="Enter description" style="height:220px;" id="applicationEntry"></textarea>
            <br><br><br>
            <div class="buttonclass" style="margin-top:-15px" v-on:click="addApply()">
                <a class="redeemclass">Submit</a>
            </div>
        </div>
      </div>

    </form>
  </div>
  </div>

  <div id="id02" class="modal">
    <form class="modal-content animate">
      <div class="overlay"></div>
      <div class="content">
        <div class="imgcontainer" style="float:right; margin-right:30px">
            <span
            onclick="document.getElementById('id02').style.display='none'"
            class="close" 
            title="Close Modal">&times;</span>
        </div>

        <br><br><br>

        <form style="margin-bottom:30px">
            <div class="title" id="activityTitle">{{activityTitle}}</div>
            <p>by ABC Elderly Home</p>
            <h3>Rating (out of 5 stars):</h3>
            <input type="text" id="rateEntry" required="" placeholder="" style="width: 50px;">
            <h3>Describe your overall experience!</h3>
            <textarea rows="5" cols="70" name="Enter description" style="height:170px;" id="descriptionEntry"></textarea>
            <br><br><br>
            <div class="buttonclass" v-on:click="addReview()">
                <a class="redeemclass" style="float:centre">Submit</a>
            </div>
        </form>
      </div>
    </form>
  </div>

</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      listing: computed(() => useRoute().params.sn),
      activityTitle: "",
      activityContent: "",
      activityId: 0,
      activitySN: 0,
      avgRate: 0,
      reviewRate: [],
      reviewDescription: [],
      messages: [],
      docname: "",

      user: "",
      fullname: "",
    };
  },
  mounted() {
    this.storeMessage();
    console.log(this.list);
    //this.retrieveemployees()

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },


  methods: {
    displayLogin() {
      return (document.getElementById("id01").style.display = "block");
    },
    displayLogin2() {
      return (document.getElementById("id02").style.display = "block");
    },
    async storeMessage() {
      const q = query(collection(db, "Opportunities"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let yy = doc.data();
        if (this.listing ==  yy.sn) {
            this.activityTitle = yy.Title;
            this.activityContent = yy.Content;
            this.activityId = doc.id;
            this.activitySN = doc.sn;
        }
      });

      const q2 = query(collection(db, "Opportunities/" + this.activityId + "/Reviews"));
      const querySnapshot2 = await getDocs(q2);
      let count = 0;
      let totalRate = 0;
      querySnapshot2.forEach((doc) => {
        let zz = doc.data();
        count = count + 1;
        totalRate = totalRate + Number(zz.rating);
        this.messages.push({
          reviewRate: zz.rating,
          reviewDescription: zz.description,
        });
      });
      this.avgRate = (totalRate/count).toFixed(1);

      const auth = getAuth();
      var z = await getDoc(doc(db, "volunteers", auth.currentUser.email));
      var userInfo = z.data();
      this.fullname =  userInfo.name;

    },
    async addReview() {
      var addRating = document.getElementById("rateEntry").value;
      var addDescription = document.getElementById("descriptionEntry").value;
      const db = getFirestore(firebaseApp);

        await setDoc(doc(db, "Opportunities/" + this.activityId + "/Reviews", this.fullname+addDescription.slice(0,5)), {
            rating: addRating,
            description: addDescription
        })
        .then(() => {
            this.$router.push({ name: "Volunteer" });
            //router.push('/')
        });
        alert("Your review has been submitted.")
    },

    async addApply() {
      var addDescription = document.getElementById("applicationEntry").value;
      const db = getFirestore(firebaseApp);

        await setDoc(doc(db, "Applicants/" + this.user.email), {
            Applied_date: new Date(),
            Description: addDescription,
            Email: this.user.email,
            Listing: this.activityTitle,
            Listing_ref: this.activityId,
            Name: this.fullname,
            Status: "Pending"
        })

        await updateDoc(doc(db, "volunteers/" + this.user.email), {
            PendingListings: arrayUnion(this.activityId),
            applied: true
        })
        .then(() => {
            this.$router.push({ name: "Volunteer" });
            //router.push('/')
        });
        alert("Your application has been submitted.")
    },

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
.filterandsort {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.treesbg {
  background-image: url("../assets/volunteer_bg.png");
  background-size: cover;
  position: relative;
  width: 100%;
  min-height: 600px;
  padding-top: 0%;
  padding-bottom: 0%;
}

.title {
  padding: 0px;
  background-color: transparent;
  /* width: 374px;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 55px;
  left: 24px;
  font-family: Roboto;
  font-weight: Bold;
  font-size: 16px;
  opacity: 1;
  text-align: left; */
}

.fliterandsort {
  padding: 20px;
  color: green;
}

.formli {
  display: inline-block;
  text-align: right;
}

form {
  text-align: center;
  align-items: center;
  margin: auto;
}

input:hover {
  box-shadow: 3px 3px purple;
  border-radius: 2px;
}

.save {
  text-align: center;
}

.listingbox {
  margin: auto;
  width: 90%;
  border: 6px solid #ffd466;
  background-color: #ffe5a3;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
}
.imgbox {
  width: 150px;
  height: 150px;
  object-fit: cover;
  background-color: #ceeaf7;
  visibility: visible;
  float: left;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  /* border: 1px solid gray; */
}
.listingpara {
  /* border: 1px solid gray; */
  padding-left: 10px;
  padding-right: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  justify-items: left;
}
.listingtitle {
  float: left;
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 1px;
}
.listinginfo {
  font-size: 14px;
  margin-top: 2px;
  margin-bottom: 2px;
}
.listingdetails {
  margin-top: 2px;
  font-size: 12px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.infobox {
  width: 200px;
  display: flex;
}
.specdetails {
  display: inline-block;
  padding-left: 10px;
  font-size: 15px;
  font-weight: bold;
}
.viewmore {
  display: block;
  width: 150px;
  background-color: #ff9213;
  color: white;
  font-weight: bold;
  font-size: 20px;
  padding: 18px 15px 18px 15px;
  visibility: visible;
  float: right;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.viewmore:hover {
  background-color: #fff9e9;
  color: black;
}
.listingbuttonsbox {
  /* border: 1px solid gray; */
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
}
.addlisting {
  display: block;
  width: 120px;
  background-color: #ff9213;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 10px 10px 10px;
  visibility: visible;
  float: right;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.learnmore {
  display: block;
  width: 120px;
  background-color: #ff9213;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 10px 10px 10px;
  visibility: visible;
  float: right;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.learnmore:hover {
  background-color: #fff9e9;
  color: black;
}
.applynow {
  display: block;
  width: 120px;
  background-color: #ff9213;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 10px 10px 10px;
  visibility: visible;
  float: right;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.applynow:hover {
  background-color: #fff9e9;
  color: black;
}
.section {
  padding: 10px;
  justify-content: space-evenly;
}
.topnav {
  background-color: #fff9e9;
  min-height: 50px;
  overflow: hidden;
}

body {
    font-family: Sansation;
}

a {
    text-decoration: none;
}

.mainbanner {
    background-image: url("../assets/illustrator trees bg.jpg");
    background-size: cover;
    position: relative;
    width: 100%;
    min-height: 435px;
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

.topnav {
    background-color: #fff9e9;
    min-height: 50px;
    overflow: hidden;
}

.bottombanner {
    background-color: #fff9e9;
    min-height:1000px
}

.title {
    font-family: Sansation;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 29px;
    color: #FF9213;
    margin-top: 2%;
    margin-left: 2%;
}

.rank {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    font-family: Sansation;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 29px;
    text-align: center;
    /* identical to box height */
    color: #A8A8A8;
}

#achieved {
    background: #FF9213;
    color: #FFF6D7;
}

#notachieved {
    background: #FFF6D7
    /* rgba(0,225,225,0.1);
  opacity: */
}

#point-meter {
    border: 4px solid #FF9213;
    border-radius: 30px;
    overflow: hidden;
    display: grid;
    margin-left: 30px;
    margin-right: 30px;
    grid-template-columns: 33fr 17fr;
    font-family: Sansation;
}

#getPoints {
    font-family: Sansation;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 13px;
    float: right;
    margin-right: 30px;
}

.left {
    float: left;
    width: 40%;
    margin-left: 30px;
    margin-top: 30px;
    /* background-color: brown; */
}

.right {
    float: right;
    width: 50%;
    margin: 30px;
    /* background-color: lightblue; */
}

canvas {
    width: 500px !important;
    height: 280px !important;
    text-align: center;
}

.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    /* text-align: center; */
}

.listingcontainer {
    background-color: #FFE5A3;
    border: 6px solid #FFD466;
    position: absolute;
    top: 860px;
    width: 94%;
    height: 500px;
    border-radius: 23px;
    margin-left: 20px;
}

.imgcontainer {
    width: 142px;
    height: 20px;
    padding: 0px;
    left: 30px;
    /* border: 1px solid black; */
    overflow: hidden;
    float: left;
}

.textcontainer {
    width: 210px;
    height: 142px;
    float: right;
    margin-right: 20px;
}

.divimg2 {
    max-width: 100%;
    max-height: 100%;
}

.buttonclass {
    float: center;
    border-radius: 12px;
    cursor: pointer;
}

.redeemclass {
    background-color: #FF9213;
    box-shadow: 4px 3px 4px rgba(0, 0, 0, 0.25);
    width: 300px;
    height: 42px;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
}

.reward {
    background-color: #FFF6D7;
    border-radius: 33px;
    width: 400px;
    height: 230px;
    float: left;
    margin: 25px;
}

.float {
    width: 255px;
    height: 180px;
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
    /* border: 1px solid black; */
    background-color: blue;
    overflow: hidden;
    float: left
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


/* Extra styles for the cancel button */

.cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
}


/* Center the image and position the close button */

.imgcontainer {
    text-align: center;
    margin: 24px 0 12px 0;
    position: relative;
}

img.avatar {
    width: 20%;
    /* border-radius: 50%; */
}

.container {
    margin-left: 3%;
    margin-right: 3%;
    margin-bottom: 3%;
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
    display: none;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: #fff9e9;
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
    padding-top: 60px;
}


/* Modal Content/Box */

.modal-content {
    background-color: #fff9e9;
    margin: 10% auto 15% auto;
    /* 10% from the top, 15% from the bottom and centered */
    border: 1px solid #888;
    border-radius: 25px;
    width: 60%;
    /* Could be more or less, depending on screen size */
}


/* The Close Button (x) */

.close {
    position: absolute;
    right: 25px;
    top: 0;
    color: #000;
    font-size: 25px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: red;
    cursor: pointer;
}

#myinfo {
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

.popup .overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
    display: none;
}

.popup .content {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    transform: translate(-50%, -50%) scale(0);
    background: #fff9e9;
    width: 650px;
    height: 500px;
    z-index: 2;
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
}

.popup .close-btn {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 30px;
    height: 30px;
    background: #222;
    color: #fff9e9;
    font-size: 25px;
    font-weight: 600;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
}

.popup.active .overlay {
    display: block;
}

.popup.active .content {
    transition: all 300ms ease-in-out;
    transform: translate(-50%, -50%) scale(1);
}


</style>
