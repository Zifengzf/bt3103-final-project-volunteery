<template>
  <div class="mainbanner">
    <div class="maintext">
      <div
        style="
          color: #ff9213;
          text-align: center;
          font-size: 50px;
          font-family: 'Ribeye Marrow';
          -webkit-text-stroke: solid 2px white;
        "
      >
        MY REWARDS
      </div>
    </div>
  </div>

  <div class="bottombanner">
    <div>
      <div style="color: #fff9e9">Placeholder to takeup space</div>
      <div class="acheivementStatus">Achievement Status</div>
      <br />
      <div class="abouttext, center">
        <h1 id="tier" class="rank">SLIVER</h1>
        <div id="point-meter" class="centeredtext">
          <div id="achieved" class="centeredtext">{{ pointsAttained }}</div>
          <div id="notachieved" class="centeredtext"></div>
        </div>
        <p id="getPoints">
          Get {{ remainingPoints }} more points to unlock next tier!
        </p>
      </div>
    </div>

    <!-- <div style="background-color:blue">
      <line-chart class="chart" width=500px :data = 'chartdata'></line-chart>
    </div> -->
  </div>
  <!-- 
  <div class="right">
    <canvas id="myChart" class=center></canvas>
  <div> -->

  <div class="listingcontainer">
    <div class="acheivementStatus">Claim Rewards</div>
    <div id="ptsA" class="acheivementStatus2">
      Points Available: {{ pointsAvailable }}
    </div>
    <!-- <div class="acheivementStatus2"><button @click="display()">UPDATE</button></div> -->

    <div class="reward">
      <div class="imgcontainer" style="object-fit: contain">
        <img
          style="padding: 25px; width: 140px; height: auto"
          class="divimg2"
          src="@/assets/famousamos2.png"
        />
      </div>
      <div class="textcontainer" style="Sansation">
        <h4 class="centeredtext">
          <span style="font-size: 150%"><br />Famous Amos<br /></span>
          <span style="font-size: 110%">$5 VOUCHER</span><br /><br />
          <span style="color: #ffcb13">20 POINTS</span>
        </h4>
      </div>
      <div class="buttonclass">
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <a
          class="redeemclass"
          onclick="document.getElementById('id01').style.display='block'"
          >Redeem</a
        >
        <!-- <button class="redeem_btn ">REDEEM</button> -->
      </div>
    </div>

    <div class="reward">
      <div class="imgcontainer" style="object-fit: contain">
        <img
          style="padding: 25px; width: 140px; height: auto"
          class="divimg2"
          src="@/assets/seveneleven.png"
        />
      </div>
      <div class="textcontainer" style="Sansation">
        <h4 class="centeredtext">
          <span style="font-size: 150%"><br />7-Eleven <br /></span>
          <span style="font-size: 110%">$10 VOUCHER</span><br /><br />
          <span style="color: #ffcb13">25 POINTS</span>
        </h4>
      </div>
      <div class="buttonclass">
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <a
          class="redeemclass"
          onclick="document.getElementById('id01').style.display='block'"
          >Redeem</a
        >
        <!-- <button class="redeem_btn ">REDEEM</button> -->
      </div>
    </div>

    <div class="reward">
      <div class="imgcontainer" style="object-fit: contain">
        <img
          style="padding: 25px; width: 140px; height: auto"
          class="divimg2"
          src="@/assets/koi.jpeg"
        />
      </div>
      <div class="textcontainer" style="Sansation">
        <h4 class="centeredtext">
          <span style="font-size: 150%"><br />KOI <br /></span>
          <span style="font-size: 110%">$5 VOUCHER</span><br /><br />
          <span style="color: #ffcb13">25 POINTS</span>
        </h4>
      </div>
      <div class="buttonclass">
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <a
          class="redeemclass"
          onclick="document.getElementById('id01').style.display='block'"
          >Redeem</a
        >
        <!-- <button class="redeem_btn ">REDEEM</button> -->
      </div>
    </div>
  </div>

  <div id="id01" class="modal">
    <div class="modal-content animate">
      <div class="imgcontainer2">
        <span
          onclick="document.getElementById('id01').style.display='none'"
          class="close"
          title="Close Modal"
          >&times;
        </span>
      </div>
      <div class="container">
        <div class="centeredtext" style="color: #ff9213; font-size: 24px">
          <br /><br />Please scan QR code to redeem reward!
          <div class="qrcode">
            <img class="divimg2" src="../assets/qrcode.webp" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const db = getFirestore(firebaseApp);

// var xValues = ["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7","Week 8"];
// var yValues = [7,11,11,16,19,21,25,32];
export default {
  data() {
    return {
      chartdata: {
        "01-2021": 7,
        "02-2021": 11,
        "03-2021": 11,
        "04-2021": 16,
        "05-2021": 19,
        "06-2021": 21,
      },
      tier: "SLIVER",
      pointsAttained: 33,
      remainingPoints: 17,
      pointsAvailable: 20,
    };
    // chartdata: null
  },
  mounted() {
    const db = getFirestore(firebaseApp);
    const auth = getAuth();
    async function display() {
      var user = auth.currentUser.email;
      console.log("Current User", user);
      const z = await getDoc(doc(db, "volunteers", user));
      if (z.exists()) {
        console.log("Document Data", z.data());
        var userInfo = z.data();
        var a = userInfo.totalPoints;
        var b = userInfo.currentPoints;
        console.log(a);
        console.log(b);
        alert("Updating User Points!");

        document.getElementById("ptsA").innerHTML = "Points Available: " + b;
        document.getElementById("achieved").innerHTML = a;
        document.getElementById("tier").innerHTML = tier(a);
        document.getElementById("getPoints").innerHTML = ptsNeeded(a);
        document.getElementById("point-meter").style.gridTemplateColumns =
          ptsM(a);
      }
      console.log(z);
    }
    function tier(points) {
      if (points < 50) {
        return "Sliver";
      } else if (points < 80) {
        return "Gold";
      } else {
        return "Platinum";
      }
    }
    function ptsNeeded(points) {
      if (points < 50) {
        var ptsneededs = 50 - points;
        return "Get " + ptsneededs + " more points to unlock next tier!";
      } else if (points < 80) {
        var ptsneededg = 80 - points;
        return "Get " + ptsneededg + " more points to unlock next tier!";
      } else {
        return "";
      }
    }
    function ptsM(points) {
      if (points < 50) {
        var ptsneededs = 50 - points;
        return points + "fr " + ptsneededs + "fr";
      } else if (points < 80) {
        var ptsneededg = 80 - points;
        return points + "fr " + ptsneededg + "fr";
      } else {
        return "60fr 30fr";
      }
    }
    display();
  },
  //    mounted() {
  //      this.renderChart({
  //        labels: xValues,
  //        datasets: [{
  //          label: 'Data One',
  //          backgroundColor: "rgba(255,229,163,1.0)",
  //          borderColor: "rgba(255,146,19,1)",
  //          lineTension: 0,
  //          fill: true,
  //          borderWidth: 3,
  //          data: yValues,
  //        }]}, {responsive: true, maintainAspectRatio: false})
  //    }
};
</script>

<style scoped>
img.resize {
  width: 100px; /* you can use % */
  height: auto;
}
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
.modal-content {
  background-color: #fff9e9;
  margin: 10% auto 15% auto; /* 10% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  border-radius: 25px;
  width: 60%; /* Could be more or less, depending on screen size */
}
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s;
}
.close {
  position: relative;
  right: 0px;
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
.centeredtext {
  text-align: center;
}
.mainbanner {
  background-image: url("../assets/trees_background.png");
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
  top: 40%;
  left: 50%;
  -ms-transform: translate(-50%, -30%);
  transform: translate(-50%, -30%);
}
.bottombanner {
  background-color: #fff9e9;
  min-height: 500px;
}
.acheivementStatus {
  font-family: Sansation;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 29px;
  color: #ff9213;
  margin-top: 2%;
  margin-left: 2%;
  text-align: left;
}
.acheivementStatus2 {
  font-family: Sansation;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 29px;
  color: black;
  margin-left: 2%;
  text-align: left;
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
  color: #a8a8a8;
}
#achieved {
  background: #ff9213;
  color: #fff6d7;
}
#notachieved {
  background: #fff6d7;
}
#point-meter {
  border: 4px solid #ff9213;
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
}
.right {
  float: right;
  width: 50%;
  margin: 30px;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  /* text-align: center; */
}
.listingcontainer {
  background-color: #ffe5a3;
  border: 6px solid #ffd466;
  position: absolute;
  top: 860px;
  width: 94%;
  height: 500px;
  border-radius: 23px;
  margin-left: 20px;
}
.imgcontainer {
  width: 142px;
  height: 142px;
  padding: 0px;
  left: 30px;
  /* border: 1px solid black; */
  overflow: hidden;
  float: left;
}
.imgcontainer2 {
  width: 142px;
  height: 40px;
  padding: 0px;
  left: 30px;
  /* border: 1px solid black; */
  overflow: hidden;
  float: right;
}
.textcontainer {
  width: 210px;
  height: 142px;
  float: right;
  margin-right: 20px;
  object-fit: contain;
}
.qrcode {
  max-width: 500px;
  max-height: 500px;
  object-fit: contain;
  margin: auto;
  display: block;
}
.divimg2 {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin: auto;
  display: block;
}

.buttonclass {
  float: bottom center;
}

.redeemclass {
  background-color: #ff9213;
  box-shadow: 4px 3px 4px rgba(0, 0, 0, 0.25);
  width: 300px;
  height: 42px;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  margin-left: 35%;
}

.reward {
  background-color: #fff6d7;
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
  float: left;
}
</style>
