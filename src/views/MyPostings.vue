<template>
  <NavBar2 />
  <div style="background-color: #fff9e9">
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
          MY POSTINGS
        </div>
        <p style="color: black; text-align: center">
          “As you grow older, you will discover that you have two hands <br />
          — one for helping yourself, the other for helping others.”, <br />
          —Audrey Hepburn
        </p>
        <br />
      </div>
    </div>
    <br />
    <div class="filterandsort">
      <label for="filterbyregion" style="font-size: 18px; padding: 10px"
        >Filter by:</label
      >
      <select
        v-model="selectedPosting"
        name="filterbyregion"
        id="filterbyregion"
        style="font-size: 18px"
      >
        <option value="">-- Region --</option>
        <option value="central">Central</option>
        <option value="north">North</option>
        <option value="north-east">North-East</option>
        <option value="east">East</option>
        <option value="south-east">South-East</option>
        <option value="south">South</option>
        <option value="south-west">South-West</option>
        <option value="west">West</option>
        <option value="north-west">North-West</option>
      </select>
      <select
        v-model="selectedPeriod"
        name="filterbyperiod"
        id="filterbyperiod"
        style="font-size: 18px"
      >
        <option value="">-- Duration --</option>
        <option value="0,1">Less than 1 month</option>
        <option value="1,3">1 - 3 months</option>
        <option value="3,6">3 - 6 months</option>
        <option value="6,12">6 months - 1 year</option>
        <option value="12,999">More than 1 year</option>
      </select>
      <label for="sortby" style="font-size: 18px; padding: 10px"
        >Sort by:</label
      >
      <select
        v-model="selectedSorting"
        name="selectedSorting"
        id="selectedSorting"
        style="font-size: 18px"
      >
        <option value="Vacancy">Vacancy</option>
        <option value="VacancyDescending">Vacancy (descending)</option>
        <option value="Duration">Duration</option>
        <option value="DurationDescending">Duration (descending)</option>
      </select>
      <div>
        <button
          class="addlisting"
          type="button"
          v-on:click="addNewListing()"
          style="margin-left: 50px"
        >
          Add Listing
        </button>
      </div>
    </div>
    <div v-for="(result, index) in results" :key="result">
      <div class="card">
        <div class="card-section">
          <p>{{ index }}</p>
        </div>
        <div class="card-divider">
          <p>$ {{ result.USD }}</p>
        </div>
        <div class="card-section">
          <p>{{ result.EUR }}</p>
        </div>
      </div>
    </div>
    <div v-for="result in cities" :key="result">
      <div class="card">
        <div class="card-section">
          <p>{{ result }}</p>
        </div>
      </div>
    </div>
    <div id="chat" class="container">
      <br />
      <div v-for="message in filteredPostings" class="card" :key="message">
        <div class="card-body">
          <div class="listingbox">
            <img
              class="imgbox"
              src="https://media.istockphoto.com/photos/volunteers-serving-hot-meal-to-people-in-community-soup-kitchen-picture-id482802211?k=20&m=482802211&s=612x612&w=0&h=wZtnwsE0iQOqzXp8z99blyjq16JLCeyRDeV0UuOZmkA="
              alt="Listing Pic"
              style="float: left"
            />
            <div class="listingpara" style="float: left">
              <p class="listingtitle">{{ message.title }}</p>
              <p class="listinginfo">{{ message.content }}</p>
              <div class="listingdetails">
                <div class="infobox">
                  <img
                    id="profpic"
                    src="../assets/location.png"
                    alt="Profile Pic"
                    height="30"
                    width="30"
                    style="display: inline-block"
                  />
                  <p class="specdetails">Region: {{ message.region }}</p>
                </div>
                <div class="infobox">
                  <img
                    id="profpic"
                    src="../assets/calendar.png"
                    alt="Profile Pic"
                    height="30"
                    width="30"
                  />
                  <p class="specdetails">
                    Duration : {{ message.duration }} months
                  </p>
                </div>
                <div class="infobox">
                  <img
                    id="profpic"
                    src="../assets/vacancy.png"
                    alt="Profile Pic"
                    height="30"
                    width="30"
                  />
                  <p class="specdetails">
                    Vacancy: {{ message.vacancy }} / {{ message.needed }} left
                  </p>
                </div>
              </div>
            </div>
            <div class="listingbuttonsbox">
              <button
                class="viewmore"
                type="button"
                v-on:click="deleteListing(message.id)"
              >
                Mark as Complete
              </button>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>

  <div id="id0" class="modal">
    <form class="modal-content animate">
      <div class="overlay"></div>
      <div class="content">
        <div class="imgcontainer" style="float: right; margin-right: 30px">
          <span
            onclick="document.getElementById('id0').style.display='none'"
            class="close"
            title="Close Modal"
            >&times;</span
          >
        </div>

        <br /><br /><br />
        <div class="title" id="activityTitle">Add New Listing</div>

        <form style="margin: 50px; margin-top: 10px">
          <div class="left">
            <b style="float: left">Title: </b> <br /><br />
            <b style="float: left">Date: </b> <br /><br />
            <b style="float: left">Duration: </b> <br /><br />
            <b style="float: left">Region: </b> <br /><br />
            <b style="float: left">Volunteers Needed: </b> <br /><br />
            <b style="float: left">Content: </b> <br /><br />
            <br /><br /><br /><br /><br /><br /><br />
          </div>
          <div class="right">
            <input
              type="text"
              id="titleEntry"
              required=""
              placeholder=""
              style="width: 350px; float: left; margin-left: 10px"
            />
            <br /><br />
            <input
              type="text"
              id="dateEntry"
              required=""
              placeholder=""
              style="width: 100px; float: left; margin-left: 10px"
            />
            <br /><br />
            <input
              type="text"
              id="durationEntry"
              required=""
              placeholder=""
              style="width: 100px; float: left; margin-left: 10px"
            />
            <br /><br />
            <input
              type="text"
              id="regionEntry"
              required=""
              placeholder=""
              style="width: 100px; float: left; margin-left: 10px"
            />
            <br /><br />
            <input
              type="text"
              id="volunteersEntry"
              required=""
              placeholder=""
              style="width: 100px; float: left; margin-left: 10px"
            /><br /><br />
            <textarea
              rows="5"
              cols="60"
              name="Enter description"
              style="height: 130px; float: left; margin-left: 10px"
              id="contentEntry"
            ></textarea>
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
          </div>
          <br /><br /><br /><br />
          <div
            class="buttonclass"
            style="float: centre"
            v-on:click="submitListing()"
          >
            <a class="redeemclass">Submit</a>
          </div>
        </form>
      </div>
    </form>
  </div>
</template>

<script>
import NavBar2 from "@/components/NavBar2.vue";
import firebaseApp from "@/firebase.js";
import { getAuth } from "firebase/auth";

import { deleteDoc, getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  increment,
  arrayRemove,
  setDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  components: {
    NavBar2,
  },
  data() {
    return {
      results: [],
      cities: [],
      messages: [],
      messageText: "",
      nickname: "hootlex",
      filteredPostings: [],
      selectedPosting: "",
      selectedPeriod: "",
      selectedSorting: "Vacancy",
      myPostings: [],
      holder: [],
    };
  },

  mounted() {
    this.retrieveOrgPosting();
    console.log("done");
    this.storeMessage(this.selectedSorting);

    async function display() {
      let z = await getDocs(
        collection(db, "Applications", "chefs", "Volunteers")
      );
      let ind = 1;

      z.forEach((docs) => {
        let data = docs.data();
        var table = document.getElementById("table");

        var row = table.insertRow(ind);
        var name = data.Name;
        var email = data.Email;

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = ind;
        cell2.innerHTML = name;
        cell3.innerHTML = email;
        cell4.className = "ptsToAdd";
        cell5.className = "accept";

        var num_input = document.createElement("input");
        num_input.type = "number";
        cell4.appendChild(num_input);

        var review_button = document.createElement("button");
        review_button.className = "bwt1";
        review_button.innerHTML = "Add";
        review_button.onclick = function () {
          var numpts = document.getElementsByClassName("ptsToAdd").value;
          console.log(numpts);
          userAddPts(email, 3);
        };
        cell5.appendChild(review_button);
        ind += 1;
      });
    }
    display();

    async function userAddPts(email, numpts) {
      console.log(email);
      console.log(numpts);

      await updateDoc(doc(db, "volunteers", email), {
        totalPoints: increment(numpts),
        currentPoints: increment(numpts),
      });
    }
    console.log(this.list);
  },

  watch: {
    selectedPosting(fil) {
      let currPosting = fil;
      let currPeriod = this.selectedPeriod;
      this.holder = this.messages;
      if (currPosting != "") {
        this.holder = this.holder.filter((posting) => {
          return posting.region.toLowerCase() == currPosting.toLowerCase();
        });
      }
      if (currPeriod != "") {
        let arr = currPeriod.split(",");
        let a = arr[0];
        let b = arr[1];
        console.log("more than " + a);
        console.log("less than " + b);
        this.holder = this.holder.filter((posting) => {
          return a < posting.duration && posting.duration <= b;
        });
      }
      this.filteredPostings = this.holder;
    },
    selectedPeriod(fil) {
      let currPosting = this.selectedPosting;
      let currPeriod = fil;
      this.holder = this.messages;
      if (currPosting != "") {
        this.holder = this.holder.filter((posting) => {
          return posting.region.toLowerCase() == currPosting.toLowerCase();
        });
      }
      if (currPeriod != "") {
        let arr = currPeriod.split(",");
        let a = arr[0];
        let b = arr[1];
        console.log("more than " + a);
        console.log("less than " + b);
        this.holder = this.holder.filter((posting) => {
          return a < posting.duration && posting.duration <= b;
        });
      }
      this.filteredPostings = this.holder;
    },
    selectedSorting(sort) {
      console.log(sort);
      if (sort == "") {
        this.filteredPostings = this.messages;
      }
      if (sort != "") {
        if (sort == "Vacancy") {
          this.filteredPostings.sort(function (a, b) {
            return a.vacancy - b.vacancy;
          });
        } else if (sort == "VacancyDescending") {
          this.filteredPostings.sort(function (a, b) {
            return b.vacancy - a.vacancy;
          });
        } else if (sort == "Duration") {
          this.filteredPostings.sort(function (a, b) {
            return a.duration - b.duration;
          });
        } else {
          this.filteredPostings.sort(function (a, b) {
            return b.duration - a.duration;
          });
        }
      }
    },
  },
  methods: {
    addNewListing() {
      return (document.getElementById("id0").style.display = "block");
    },
    async storeMessage(/*sort*/) {
      this.messages = [];
      const q = query(
        collection(db, "Opportunities"),
        orderBy(this.selectedSorting)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (this.myPostings.includes(doc.id)) {
          let yy = doc.data();
          this.messages.push({
            id: doc.id,
            content: yy.Content,
            duration: yy.Duration,
            region: yy.Region,
            status: yy.Status,
            title: yy.Title,
            vacancy: yy.Vacancy,
            needed: yy["Volunteers Needed"],
          });
        }
        this.messageText = "";
      });
      this.filteredPostings = this.messages;
    },

    async retrieveOrgPosting() {
      const p = query(collection(db, "Organisation"));
      const postingsSnapshot = await getDocs(p);
      postingsSnapshot.forEach((doc) => {
        let zz = doc.data();
        let postingsArr = zz.MyPostings;
        for (let i = 0; i < postingsArr.length; i++) {
          console.log(postingsArr[i]);
          this.myPostings.push(postingsArr[i]);
        }
      });
    },

    searchPostings() {
      this.filteredPostings = this.messages;
      console.log(this.selectedPosting);

      if (this.selectedPosting == "") {
        return this.filteredPostings;
      }

      if (this.selectedPosting != "") {
        this.filteredPostings = this.filteredPostings.filter((posting) => {
          return (
            posting.region.toLowerCase() === this.selectedPosting.toLowerCase()
          );
        });
      }
    },
    async deleteListing(listing) {
      // Deletes listing from Organisation, Opportunities and all relevant applicants
      // this.orgName is WillingHearts
      console.log("Deleting listing " + listing);
      const auth = getAuth();
      var email = auth.currentUser.email;
      await updateDoc(doc(db, "Organisation", email), {
        MyPostings: arrayRemove(listing),
      });
      await deleteDoc(doc(db, "Opportunities", listing));
      // Remove listing from approvedlistings or pendinglistings
      let k = await getDocs(collection(db, "volunteers"));
      var volunteers = [];
      k.forEach((document) => {
        var data = document.data();
        var approved = data.ApprovedListings;
        if (approved.includes(listing)) {
          volunteers.push(document.id);
        }
      });
      for (var id of volunteers) {
        await updateDoc(doc(db, "volunteers", id), {
          ApprovedListings: arrayRemove(listing),
        });
      }
    },
    async submitListing() {
      var addTitle = document.getElementById("titleEntry").value;
      var addDate = document.getElementById("dateEntry").value;
      var addDuration = Number(document.getElementById("durationEntry").value);
      var addRegion = document.getElementById("regionEntry").value;
      var addVolunteers = Number(
        document.getElementById("volunteersEntry").value
      );
      var addContent = document.getElementById("contentEntry").value;

      const db = getFirestore(firebaseApp);

      const querySnapshot = await getDocs(
        query(collection(db, "Opportunities"))
      );
      const size = querySnapshot.size;

      const auth = getAuth();
      var email = auth.currentUser.email;
      var z = await getDoc(doc(db, "Organisation", email));
      var orgName = z.data().Name;

      await setDoc(doc(db, "Opportunities/" + addTitle.trim()), {
        Content: addContent,
        Date: addDate,
        Duration: addDuration,
        Region: addRegion,
        Status: "Pending",
        Title: addTitle,
        Vacancy: addVolunteers,
        "Volunteers Needed": addVolunteers,
        Accepted: 0,
        Pending: 0,
        Organiser: orgName,
        sn: size + 1,
      });

      await updateDoc(doc(db, "Organisation", email), {
        MyPostings: arrayUnion(addTitle.trim()),
      }).then(() => {
        this.$router.push({ name: "MyPostings" });
      });
      alert("Your listing has been submitted.");
    },
  },
};
</script>

<style scoped>
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
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
  position: relative;
}
.bwt1 {
  background-color: #ff9213;
  color: white;
}
table {
  font-family: arial, sans-serif;
  border: 3px solid #ffd466;
  border-collapse: collapse;
  width: 80%;
  margin: 100px;
  text-align: center;
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
h1 {
  background-color: lightgreen;
}

.title {
  padding: 0px;
  background-color: transparent;
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
input {
  font-size: 20px;
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
.approvedstatus {
  background-color: #008b16;
  display: block;
  width: 150px;
  color: white;
  font-weight: bold;
  font-size: 25px;
  padding: 18px 5px 18px 5px;
  visibility: visible;
  float: right;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  text-align: center;
}
.pendingstatus {
  background-color: #ffcb13;
  display: block;
  width: 120px;
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
.addlisting {
  display: block;
  width: 150px;
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
.applicants {
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
.applicants:hover {
  background-color: #fff9e9;
  color: black;
}
.section {
  padding: 10px;
  justify-content: space-evenly;
}
.title {
  font-family: Sansation;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 29px;
  color: #ff9213;
  margin-top: 2%;
  margin-left: 2%;
}
.left {
  float: left;
  width: 20%;
  margin-left: 30px;
  margin-top: 30px;
  /* background-color: brown; */
}

.right {
  float: right;
  width: 70%;
  margin-top: 30px;
  /* background-color: lightblue; */
}

.buttonclass {
  float: center;
  border-radius: 12px;
  cursor: pointer;
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
