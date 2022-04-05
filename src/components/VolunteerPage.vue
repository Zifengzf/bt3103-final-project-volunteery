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
        <option value="">--Region--</option>
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
        <option value="">Commitment Period</option>
        <option value="1">1 month or less</option>
        <option value="3">1 month - 3 months</option>
        <option value="6">3 months - 6 months</option>
        <option value="12">6 months - 1 year</option>
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
        <option value="Duration">Duration</option>
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
            <button class="viewmore" type="button">Apply Now</button>
          </div>
        </div>
        <br />
      </div>
    </div>
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
      console.log(fil);
      if (fil == "") {
        this.filteredPostings = this.messages;
      }
      if (fil != "") {
        this.filteredPostings = this.messages.filter((posting) => {
          return posting.region.toLowerCase() == fil.toLowerCase();
        });
      }
    },
    selectedPeriod(fil) {
      console.log(fil);
      if (fil == "") {
        this.filteredPostings = this.messages;
      }
      if (fil != "") {
        this.filteredPostings = this.messages.filter((posting) => {
          return posting.duration.toLowerCase() == fil.toLowerCase();
        });
      }
    },
    selectedSorting(sort) {
      console.log(sort);
      if (sort == "") {
        this.filteredPostings = this.messages;
      }
      if (sort != "") {
        this.storeMessage(sort);
      }
    },
  },
  methods: {
    async storeMessage(sort) {
      this.messages = [];
      const q = query(collection(db, "Opportunities"), orderBy(sort));
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
          needed: yy['Volunteers Needed'],
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
</style>
