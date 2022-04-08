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
      </select>
      <!-- <div class="col-auto">
        <button type="button" class="btn btn-primary mb-2" @click="searchPostings">Search</button>
      </div> -->
      <!-- <input
        type="submit"
        value="NIL"
        style="font-size: 18px; padding: 10px"
      /> -->
    </div>
    <!-- <div style='padding: 10px 90px 20px 0px'>
      <button class="addlisting" type="button" style='padding: 0 0 0 10'>Add Listing</button>
    </div> -->
    <!-- <table id="table" class="auto-index">
        <tr>
            <th>S.No</th>
            <th>Coin</th>
            <th>Ticker</th>
            <th>Buy_Price</th>
            <th>Buy_Quantity</th>
            <th>Current_Price</th>
            <th>Profit</th>
            <th>Options</th>
        </tr>
    </table> -->
    <!-- <div v-for="thing in things" :key="thing">
      <br />
      <div class="listingbox">
        <img
          class="imgbox"
          src="https://media.istockphoto.com/photos/volunteers-serving-hot-meal-to-people-in-community-soup-kitchen-picture-id482802211?k=20&m=482802211&s=612x612&w=0&h=wZtnwsE0iQOqzXp8z99blyjq16JLCeyRDeV0UuOZmkA="
          alt="Listing Pic"
          style="float: left"
        />
        <div class="listingpara" style="float: left">
          <p class="listingtitle">{{ thing.title }}</p>
          <p class="listinginfo">{{ thing.content }}</p>
          <div class="listingdetails">
            <img
              id="profpic"
              src="../assets/calendar.png"
              alt="Profile Pic"
              height="30"
              width="30"
            />
            <p>Region: {{ thing.region }}</p>
            <img
              id="profpic"
              src="../assets/calendar.png"
              alt="Profile Pic"
              height="30"
              width="30"
            />
            <p>Commitment Period: {{ thing.duration }} months</p>
            <img
              id="profpic"
              src="../assets/vacancy.png"
              alt="Profile Pic"
              height="30"
              width="30"
            />
            <p>Vacancy: 7 / 30 left</p>
          </div>
        </div>
        <div class="listingbuttonsbox">
          <p class="approvedstatus">{{ thing.status }}</p>
          <button class="editlisting" type="button">Edit Listing</button>
          <button class="applicants" type="button">Applicants</button>
        </div>
      </div>
    </div> -->
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
      <!-- <form @submit.prevent="storeMessage">
    <br>
    <button class="btn btn-primary">View Applications</button>
  </form> -->
      <br />
      <!-- Messages -->
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
                  <!-- <p class="specdetails">Vacancy: 7 / 30 left</p> -->
                </div>
              </div>
            </div>
            <div class="listingbuttonsbox">
              <p class="approvedstatus">{{ message.status }}</p>
              <!-- <button class="viewmore" type="button">View More</button> -->
              <router-link :to="`/listing/${message.url}`">
                <button class="viewmore" type="button">View More</button>
              </router-link>
            </div>
          </div>
          <br />
        </div>
      </div>
      <!-- <div v-for="sorting of filteredPostings" :key="sorting">{{ sorting }}</div> -->
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import firebaseApp from "@/firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      // things: {
      //   apple: {
      //     content:
      //       "Help the Home carry out services such as social-recreational activities for our Residents, gardening, cleaning and general maintenance, and other services so that our caregivers may focus on attending to the daily needs of our residents.",
      //     duration: "1",
      //     region: "East",
      //     status: "Approved",
      //     statusbox: "approvedstatus",
      //     title: "Chefs needed for CNY",
      //   },
      //   pear: {
      //     content:
      //       "Help the Home carry out services such as social-recreational activities for our Residents, gardening, cleaning and general maintenance, and other services so that our caregivers may focus on attending to the daily needs of our residents.",
      //     duration: "3",
      //     region: "South-West",
      //     status: "Pending",
      //     statusbox: "approvedstatus",
      //     title: "Accompany the Elderly",
      //   },
      //   cherry: {
      //     content:
      //       "Help the Home carry out services such as social-recreational activities for our Residents, gardening, cleaning and general maintenance, and other services so that our caregivers may focus on attending to the daily needs of our residents.",
      //     duration: "6",
      //     region: "North",
      //     status: "Approved",
      //     statusbox: "approvedstatus",
      //     title: "Walk pets for SPCA",
      //   },
      // },
      results: [],
      cities: [],
      messages: [],
      // messages2: [],
      messageText: "",
      nickname: "hootlex",
      filteredPostings: [],
      selectedPosting: "",
      selectedPeriod: "",
      selectedSorting: "Vacancy",
      tempUsername: "2001chenxi@gmail.com",
      myListings: [],
      holder: [],
    };
  },
  // firestore: {
  //   filteredPostings: collection(db, "Opportunities").orderBy("Region"),
  // },
  mounted() {
    this.retrieveUserListing(this.tempUsername);
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
    async storeMessage(/*sort*/) {
      this.messages = [];
      const q = query(
        collection(db, "Opportunities"),
        orderBy(this.selectedSorting)
      );
      const querySnapshot = await getDocs(q);
      // this.messages.clear();
      querySnapshot.forEach((doc) => {
        if (this.myListings.includes(doc.id)) {
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
        }
        this.messageText = "";
      });
      // this.messages2 = this.messages;
      // for (let i = 0; i < this.messages.length; i++) {
      //   if (
      //     this.filteredPostings.find(this.messages.at(i)) == this.messages.at(i)
      //   ) {
      //     continue;
      //   } else {
      //     this.messages2.splice(i);
      //   }
      // }
      this.filteredPostings = this.messages;
    },

    async retrieveUserListing(userEmail) {
      // fix to having only 1 organisation for now
      const p = query(collection(db, "volunteers"));
      const postingsSnapshot = await getDocs(p);
      postingsSnapshot.forEach((doc) => {
        if (doc.id == userEmail) {
          let zz = doc.data();
          let listingsArr = zz.MyListings;
          for (let i = 0; i < listingsArr.length; i++) {
            console.log(listingsArr[i]);
            this.myListings.push(listingsArr[i]);
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

    // sortPostings() {
    //   this.filteredPostings = this.messages;
    //   console.log(this.selectedPosting);

    //   if (this.selectedPosting == "") {
    //     return this.filteredPostings;
    //   }

    //   if (this.selectedPosting != "") {
    //     this.filteredPostings = this.filteredPostings.sortBy((posting) => {
    //       return posting.region;
    //     });
    //   }
    // },
    // async retrieveemployees() {
    //   let z = await getDocs(collection(db, "Applications"))
    //   z.forEach(response => {
    //     console.log("pitstop");
    //     console.log(response);
    //     //let yy = response.data()
    //     //this.employees = response.data;
    //     //this.details = yy;
    //     //console.log(yy);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    // }
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
</style>
