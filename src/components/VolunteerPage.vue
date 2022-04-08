<template>
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
          OPPORTUNITIES
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
      <!-- <label for="cars" style="font-size: 18px; padding: 10px">Sort by:</label>
      <select name="cars" id="cars" style="font-size: 18px">
        <option value="volvo">Vacancy</option>
        <option value="saab">Commitment Period</option>
        <option value="opel">Posted date</option>
      </select> -->
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
        <!-- <option value="Date">Posted date</option> -->
      </select>
      <!-- <input
        type="submit"
        value="NIL"
        style="font-size: 18px; padding: 10px"
      /> -->
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
            <router-link :to="`/listing/${message.url}`">
              <button class="viewmore" type="button">Learn More</button>
            </router-link>
            <button
              class="viewmore"
              type="button"
              style="hover: true"
              v-on:click="displayLogin()"
            >
              Apply Now
            </button>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>

  <div id="id01" class="modal">
    <form class="modal-content animate">
      <div class="container">
        <div class="overlay"></div>
        <div class="content">
          <div class="imgcontainer" style="margin-left: 500px">
            <span
              onclick="document.getElementById('id01').style.display='none'"
              class="close"
              title="Close Modal"
              >&times;</span
            >
          </div>

          <br /><br />
          <div class="title" id="activityTitle">
            Interact and Socialise with Our Elderly
          </div>
          <p>by ABC Elderly Home</p>

          <h3>Tell us why you would like to join us!</h3>
          <textarea
            rows="5"
            cols="70"
            name="Enter description"
            style="height: 220px"
          ></textarea>
          <br /><br /><br />
          <div
            class="buttonclass"
            style="margin-left: 200px; float: left; margin-top: -15px"
          >
            <a class="redeemclass">Submit</a>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
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
      holder: [],
    };
  },
  mounted() {
    this.storeMessage(this.selectedSorting);
    // async function display() {
    //     let z = await getDocs(collection(db, "Applications"))
    //     let ind = 1
    //     //var tp = 0

    //     z.forEach((docs) => {
    //         let yy = docs.data()
    //         var region = (yy.Region)

    //         console.log(ind);
    //         console.log(region);
    //         this.list.push(region) // unable to find this.list

    //         console.log("fin");

    //         // adding content to bottom
    //         // console.log(content)
    //         // const e = document.createElement('div');
    //         // e.innerHTML = '<h3 class="listingbox">content<h3>';
    //         // document.body.appendChild(e);

    //         // val(ticker)

    //         // setInterval(() => {
    //         //     val(ticker)
    //         // }, 2000)

    //         // async function val(ticker) {
    //         //     let binance = new ccxt.binance()
    //         //     let x = await binance.fetch_ohlcv(ticker, "5m")
    //         //     cell6.innerHTML = x[499][4]
    //         //     cell7.innerHTML = 50
    //         //     tp = tp + parseFloat(cell7.innerHTML)
    //         // }
    //         ind += 1
    //     })
    // }
    //display()
    console.log(this.list);
    //this.retrieveemployees()
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
        // this.filteredPostings = this.messages.orderBy(sort);
        // this.storeMessage(sort);
        if (sort == "Vacancy") {
          this.filteredPostings.sort(function (a, b) {
            // console.log(a.sort);
            // console.log(b.sort);
            return a.vacancy - b.vacancy;
          });
        } else if (sort == "VacancyDescending") {
          this.filteredPostings.sort(function (a, b) {
            // console.log(a.sort);
            // console.log(b.sort);
            return b.vacancy - a.vacancy;
          });
        } else if (sort == "Duration") {
          this.filteredPostings.sort(function (a, b) {
            // console.log(a.sort);
            // console.log(b.sort);
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
    displayLogin() {
      return (document.getElementById("id01").style.display = "block");
    },
    async storeMessage(/*sort*/) {
      this.messages = [];
      const q = query(
        collection(db, "Opportunities"),
        orderBy(this.selectedSorting)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let yy = doc.data();
        this.messages.push({
          content: yy.Content,
          duration: yy.Duration,
          region: yy.Region,
          status: yy.Status,
          title: yy.Title,
          vacancy: yy.Vacancy,
          needed: yy["Volunteers Needed"],
          url: yy.sn,
        });
        this.messageText = "";
      });
      this.filteredPostings = this.messages;
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
h1 {
  background-color: lightgreen;
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
  min-height: 500px;
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
  color: #a8a8a8;
}

#achieved {
  background: #ff9213;
  color: #fff6d7;
}

#notachieved {
  background: #fff6d7;
  /* rgba(0,225,225,0.1);
  opacity: */
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
  font-size: 35px;
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
  height: 450px;
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
