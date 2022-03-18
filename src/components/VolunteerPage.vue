<template>
  <div class="topnav">
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
  </div>
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
        <!-- <p style="color: black; text-align: center">
          “As you grow older, you will discover that you have two hands <br />
          — one for helping yourself, the other for helping others.”, <br />
          —Audrey Hepburn
        </p> -->
        <br />
      </div>
    </div>
    <br />
    <div class="filterandsort">
      <label for="cars" style="font-size: 18px; padding: 10px"
        >Filter by:</label
      >
      <select name="cars" id="cars" style="font-size: 18px">
        <option value="volvo">Region</option>
        <option value="saab">North</option>
        <option value="opel">North-East</option>
        <option value="audi">East</option>
        <option value="audi">South-East</option>
        <option value="audi">South</option>
        <option value="audi">South-West</option>
        <option value="audi">West</option>
        <option value="audi">North-West</option>
      </select>
      <select name="cars" id="cars" style="font-size: 18px">
        <option value="volvo">Commitment Period</option>
        <option value="saab">1 week</option>
        <option value="opel">1 week - 1 month</option>
        <option value="audi">1 month - 3 months</option>
        <option value="audi">3 months - 6 months</option>
        <option value="audi">6 months - 1 year</option>
      </select>
      <label for="cars" style="font-size: 18px; padding: 10px">Sort by:</label>
      <select name="cars" id="cars" style="font-size: 18px">
        <option value="volvo">Vacancy</option>
        <option value="saab">Commitment Period</option>
        <option value="opel">Posted date</option>
      </select>
      <input
        type="submit"
        value="Search"
        style="font-size: 18px; padding: 10px"
      />
    </div>
    <div v-for="thing in things" :key="thing">
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
          <button class="learnmore" type="button">Learn More</button>
          <button class="applynow" type="button">Apply Now</button>
        </div>
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
  </div>
</template>

<script>
//import ccxt from "ccxt";
// import firebaseApp from "../firebase.js";
// import {getFirestore} from "firebase/firestore";
// import {collection, getDocs} from "firebase/firestore";

// const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      things: {
        apple: {
          content:
            "Help the Home carry out services such as social-recreational activities for our Residents, gardening, cleaning and general maintenance, and other services so that our caregivers may focus on attending to the daily needs of our residents.",
          duration: "1",
          region: "East",
          title: "Chefs needed for CNY",
        },
        pear: {
          content:
            "Help the Home carry out services such as social-recreational activities for our Residents, gardening, cleaning and general maintenance, and other services so that our caregivers may focus on attending to the daily needs of our residents.",
          duration: "3",
          region: "South-West",
          title: "Accompany the Elderly",
        },
        cherry: {
          content:
            "Help the Home carry out services such as social-recreational activities for our Residents, gardening, cleaning and general maintenance, and other services so that our caregivers may focus on attending to the daily needs of our residents.",
          duration: "6",
          region: "North",
          title: "Walk pets for SPCA",
        },
      },
      results: [],
      cities: [],
    };
  },
  mounted() {
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
  methods: {
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
