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
          <div id="activityDate" style="margin-top:12px">Duration : {{duration}} months</div>
          <br><br>
          <img src="../assets/location.png" alt="" style="width: 40px; height: 40px; float: left; margin-right: 10px">
          <div id="activityRegion" style="margin-top:12px">Region: {{region}}</div>
          <br><br>
          <img src="../assets/vacancy.png" alt="" style="width: 40px; height: 40px; float: left; margin-right: 10px">
          <div id="activityVacancy" style="margin-top:12px">Vacancy: {{vacancy}} / {{needed}} left</div>
      </div>
   
        
      <div class="listingcontainer" style="margin-top: 20px; height:auto">
        <div style="float: left; margin-left:20px; margin-top:10px; width:500px">
          <div class="title" style="float: left">Our Reviews</div>

          <div style="width:100px; margin-top: 15px; margin-left:15px; float:left" v-if="Math.round(avgRate)==5">
              <img class="divimg2" src="../assets/stars.png">
          </div>
          <div style="width:100px; margin-top: 15px; margin-left:15px; float:left" v-else-if="Math.round(avgRate)==4">
              <img class="divimg2" src="../assets/stars4.png">
          </div>
          <div style="width:100px; margin-top: 15px; margin-left:15px; float:left" v-else-if="Math.round(avgRate)==3">
              <img class="divimg2" src="../assets/stars3.png">
          </div>
          <div style="width:100px; margin-top: 15px; margin-left:15px; float:left" v-else-if="Math.round(avgRate)==2">
              <img class="divimg2" src="../assets/stars2.png">
          </div>
          <div style="width:100px; margin-top: 15px; margin-left:15px; float:left" v-else>
              <img class="divimg2" src="../assets/stars1.png">
          </div>

          <div style="margin-left:15px; margin-top: 18px; float:left;">{{avgRate}} Star Rating</div>
        </div>
        

        <br><br><br><br>

        <div v-for="message in messages" class="card" :key="message">
          <div class="reward">
              <div class="imgcontainer" v-if="message.reviewRate==5">
                  <img class="divimg2" src="../assets/stars.png">
              </div>
              <div class="imgcontainer" v-else-if="message.reviewRate==4">
                  <img class="divimg2" src="../assets/stars4.png">
              </div>
              <div class="imgcontainer" v-else-if="message.reviewRate==3">
                  <img class="divimg2" src="../assets/stars3.png">
              </div>
              <div class="imgcontainer" v-else-if="message.reviewRate==2">
                  <img class="divimg2" src="../assets/stars2.png">
              </div>
              <div class="imgcontainer" v-else>
                  <img class="divimg2" src="../assets/stars1.png">
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

</div>

</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, doc, getDoc } from "firebase/firestore";
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
      duration: "",
      region: "",
      vacancy: "",
      needed: "",

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
            this.duration = yy.Duration;
            this.region = yy.Region;
            this.vacancy = yy.Vacancy;
            this.needed = yy["Volunteers Needed"];
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

    }

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



</style>
