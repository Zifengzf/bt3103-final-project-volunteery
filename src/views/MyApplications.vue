<template>
  <NavBar />
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
          MY APPLICATIONS
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
              <p class="approvedstatus"> Approved </p>
              <router-link :to="`/listing/${message.url}`">
                <button class="viewmore" type="button">View More</button>
              </router-link>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div v-for="message in filteredPostings2" class="card" :key="message">
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
              <p class="pendingstatus"> Pending </p>
              <router-link :to="`/listing/${message.url}`">
                <button class="viewmore" type="button">View More</button>
              </router-link>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      results: [],
      cities: [],
      messages: [],
      messages2: [],
      messageText: "",
      nickname: "hootlex",
      filteredPostings: [],
      filteredPostings2: [],
      selectedPosting: "",
      selectedPeriod: "",
      selectedSorting: "Vacancy",
      tempUsername: "hellokitty@gmail.com",
      myApprovedPostings: [],
      myPendingPostings: [],
      holder: [],
      holder2: [],
    };
  },
  mounted() {
    const auth = getAuth()
    var email = auth.currentUser.email;
    console.log("this is " + email);
    this.retrieveUserListing(email);
    this.storeMessage(this.selectedSorting);
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
          return (
            Number(a) < Number(posting.duration) &&
            Number(posting.duration) <= Number(b)
          );
        });
      }
      this.filteredPostings = this.holder;

      this.holder2 = this.messages2;
      if (currPosting != "") {
        this.holder2 = this.holder2.filter((posting) => {
          return posting.region.toLowerCase() == currPosting.toLowerCase();
        });
      }
      if (currPeriod != "") {
        let arr = currPeriod.split(",");
        let a = arr[0];
        let b = arr[1];
        console.log("more than " + a);
        console.log("less than " + b);
        this.holder2 = this.holder2.filter((posting) => {
          return (
            Number(a) < Number(posting.duration) &&
            Number(posting.duration) <= Number(b)
          );
        });
      }
      this.filteredPostings2 = this.holder2;
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
          return (
            Number(a) < Number(posting.duration) &&
            Number(posting.duration) <= Number(b)
          );
        });
      }
      this.filteredPostings = this.holder;

      this.holder2 = this.messages2;
      if (currPosting != "") {
        this.holder2 = this.holder2.filter((posting) => {
          return posting.region.toLowerCase() == currPosting.toLowerCase();
        });
      }
      if (currPeriod != "") {
        let arr = currPeriod.split(",");
        let a = arr[0];
        let b = arr[1];
        console.log("more than " + a);
        console.log("less than " + b);
        this.holder2 = this.holder2.filter((posting) => {
          return (
            Number(a) < Number(posting.duration) &&
            Number(posting.duration) <= Number(b)
          );
        });
      }
      this.filteredPostings2 = this.holder2;
    },
    selectedSorting(sort) {
      console.log(sort);
      if (sort != "") {
        if (sort == "Vacancy") {
          this.filteredPostings.sort(function (a, b) {
            return a.vacancy - b.vacancy;
          });
          this.filteredPostings2.sort(function (a, b) {
            return a.vacancy - b.vacancy;
          });
        } else if (sort == "VacancyDescending") {
          this.filteredPostings.sort(function (a, b) {
            return b.vacancy - a.vacancy;
          });
          this.filteredPostings2.sort(function (a, b) {
            return b.vacancy - a.vacancy;
          });
        } else if (sort == "Duration") {
          this.filteredPostings.sort(function (a, b) {
            return a.duration - b.duration;
          });
          this.filteredPostings2.sort(function (a, b) {
            return a.duration - b.duration;
          });
        } else {
          this.filteredPostings.sort(function (a, b) {
            return b.duration - a.duration;
          });
          this.filteredPostings2.sort(function (a, b) {
            return b.duration - a.duration;
          });
        }
      }
    },
  },
  methods: {
    async storeMessage(/*sort*/) {
      this.messages = [];
      this.messages2 = [];
      const q = query(
        collection(db, "Opportunities"),
        orderBy(this.selectedSorting)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (this.myApprovedPostings.includes(doc.id)) {
          let yy = doc.data();
          console.log(yy.Title);
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
        }
        if (this.myPendingPostings.includes(doc.id)) {
          let yy = doc.data();
          console.log(yy.Title);
          this.messages2.push({
            content: yy.Content,
            duration: yy.Duration,
            region: yy.Region,
            status: yy.Status,
            title: yy.Title,
            vacancy: yy.Vacancy,
            needed: yy["Volunteers Needed"],
            url: yy.sn,
          });
        }
        this.messageText = "";
      });

      this.filteredPostings = this.messages;
      this.filteredPostings2 = this.messages2;
    },

    async retrieveUserListing(userEmail) {
      const p = query(collection(db, "volunteers"));
      const postingsSnapshot = await getDocs(p);
      postingsSnapshot.forEach((doc) => {
        if (doc.id == userEmail) {
          let zz = doc.data();
          let listingsArr = zz.ApprovedListings;
          for (let i = 0; i < listingsArr.length; i++) {
            console.log("approved is " + listingsArr[i]);
            this.myApprovedPostings.push(listingsArr[i]);
          }
          let y = zz.PendingListings;
          for (let i = 0; i < y.length; i++) {
            console.log("pending is " + y[i]);
            this.myPendingPostings.push(y[i]);
          }
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
</style>
