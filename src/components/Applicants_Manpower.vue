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
        APPLICANTS
      </div>
    </div>
  </div>

  <div class="bottombanner">
    <div class="applicant_review">
      <div class="orangetext">Review Applicants</div>
      <br />
      <table id="table" class="auto-index">
        <tr>
          <th>Name</th>
          <th>Listing</th>
          <th>Status</th>
          <th>Review</th>
          <th>Accept</th>
          <th>Reject</th>
        </tr>
      </table>
    </div>
    <br />
    <div class="manpower_overview">
      <div class="orangetext">Manpower Overview</div>
      <br />
      <div class="listing_container">
        <div
          v-for="message in messages"
          :key="message.id"
          class="listing_wrapper"
        >
          <div class="listing_header">
            <div class="title">{{ message.title }}</div>
            <div class="date">{{ message.date }}</div>
          </div>
          <div class="listing_body">
            <div style="width: 70%; float: left; text-align: left">
              <div>Volunteers Needed:</div>
              <div>Approved:</div>
              <div>Pending Approval:</div>
              <div>Vacancies:</div>
            </div>
            <div style="width: 10%; float: left">
              <div>{{ message.volunteers_needed }}</div>
              <div>{{ message.approved }}</div>
              <div>{{ message.pending }}</div>
              <div>{{ message.remaining }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br />
    <div class="addpts">
      <div class="orangetext">Manage Volunteers</div>
      <h3>Points to Add: <input type="number" id="ptsToAdd" /></h3>
      <br />
      <div id="volnames">
        <table id="table2" class="auto-index">
          <tr>
            <th>S/N</th>
            <th>Volunteer Name</th>
            <th>Volunteer Email</th>
            <th>Add</th>
          </tr>
        </table>
      </div>
    </div>
  </div>

  <div id="id00" class="modal">
    <form class="modal-content animate">
      <div class="overlay"></div>
      <div class="content">
        <div class="imgcontainer" style="float: right; margin-right: 30px">
          <span
            onclick="document.getElementById('id02').style.display='none'"
            class="close"
            title="Close Modal"
            >&times;</span
          >
        </div>

        <br /><br /><br />

        <form style="margin-bottom: 30px">
          <p>by ABC Elderly Home</p>
          <h3>Rating (out of 5 stars):</h3>
          <h3>Describe your overall experience!</h3>
          <br /><br /><br />
        </form>
      </div>
    </form>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);
export default {
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    async storeMessage() {
      this.messages = [];
      let q = await getDocs(collection(db, "Opportunities"));
      q.forEach((doc) => {
        let data = doc.data();
        this.messages.push({
          title: data.Title,
          date: data.Date,
          volunteers_needed: doc.get("Volunteers Needed"),
          approved: data.Accepted,
          pending: data.Pending,
          remaining: data.Vacancy,
          id: data.sn,
        });
        console.log(doc.id, " => ", doc.data());
      });
    },
  },
  mounted() {
    this.storeMessage();
    async function display() {
      clearTable();
      const k = await getDocs(collection(db, "Opportunities"));
      var listings = {};
      k.forEach((doc1) => {
        listings[doc1.id] = doc1.data().Title;
      });
      console.log(listings);
      const q = query(
        collection(db, "volunteers"),
        where("applied", "==", true)
      );
      const z = await getDocs(q);
      let ind = 1;

      z.forEach((doc) => {
        let data = doc.data();
        var name = data.name;
        var email = data.email;

        if (data.ApprovedListings.length == 0) {
          for (var list_ref of data.PendingListings) {
            addlisting(name, list_ref, "Pending", email, ind, listings);
          }
        } else if (data.PendingListings.length == 0) {
          for (var list_ref_1 of data.ApprovedListings) {
            addlisting(name, list_ref_1, "Approved", email, ind, listings);
          }
        } else {
          for (var list_ref_2 of data.PendingListings) {
            addlisting(name, list_ref_2, "Pending", email, ind, listings);
          }
          for (var list_ref_3 of data.ApprovedListings) {
            addlisting(name, list_ref_3, "Approved", email, ind, listings);
          }
        }
      });
    }
    display();

    async function addlisting(name, listing_ref, status, email, index, dict) {
      var table = document.getElementById("table");
      var row = table.insertRow(index);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      cell1.innerHTML = name;
      cell2.innerHTML = dict[listing_ref];
      cell3.innerHTML = status;
      cell4.className = "review";
      cell5.className = "accept";
      cell6.className = "reject";
      var review_button = document.createElement("button");
      review_button.className = "bwt4";
      review_button.innerHTML = "Review";
      review_button.onclick = function () {
        review(name, listing_ref, email);
      };

      cell4.appendChild(review_button);
      if (status == "Pending") {
        var accept_button = document.createElement("button");
        var reject_button = document.createElement("button");
        accept_button.className = "bwt2";
        accept_button.innerHTML = "Accept";
        reject_button.className = "bwt3";
        reject_button.innerHTML = "Reject";

        accept_button.onclick = function () {
          accept(listing_ref, email);
        };
        reject_button.onclick = function () {
          reject(listing_ref, email);
        };
        cell5.appendChild(accept_button);
        cell6.appendChild(reject_button);
      }

      if (status == "Approved") {
        var cancel_button = document.createElement("button");
        cancel_button.className = "bwt3";
        cancel_button.innerHTML = "Cancel";
        cancel_button.onclick = function () {
          cancel(listing_ref, email);
        };
        cell6.appendChild(cancel_button);
      }
    }

    async function accept(listing_ref, email) {
      await updateDoc(doc(db, "volunteers", email), {
        ApprovedListings: arrayUnion(listing_ref),
        PendingListings: arrayRemove(listing_ref),
      });
      await updateDoc(doc(db, "Opportunities", listing_ref), {
        Approved: increment(1),
        Pending: increment(-1),
      });
      display();
    }

    async function cancel(listing_ref, email) {
      await updateDoc(doc(db, "volunteers", email), {
        ApprovedListings: arrayRemove(listing_ref),
      });
      const docSnap = await getDoc(doc(db, "volunteers", email));
      var data = docSnap.data();
      if (
        data.ApprovedListings.length == 0 &&
        data.PendingListings.length == 0
      ) {
        await updateDoc(doc(db, "volunteers", email), {
          applied: false,
        });
      }
      await updateDoc(doc(db, "Opportunities", listing_ref), {
        Approved: increment(-1),
        Remaining: increment(1),
      });

      display();
    }

    async function reject(listing_ref, email) {
      await updateDoc(doc(db, "volunteers", email), {
        PendingListings: arrayRemove(listing_ref),
      });
      const docSnap = await getDoc(doc(db, "volunteers", email));
      var data = docSnap.data();
      if (
        data.ApprovedListings.length == 0 &&
        data.PendingListings.length == 0
      ) {
        await updateDoc(doc(db, "volunteers", email), {
          applied: false,
        });
      }
      await updateDoc(doc(db, "Opportunities", listing_ref), {
        Pending: increment(-1),
      });

      display();
    }

    async function review(name, listing_ref, email) {
      const z = await getDoc(
        doc(db, "volunteers/" + email + "/applications/" + listing_ref)
      );
      var userDescription = z.data().description;
      alert(name + ": " + userDescription);
    }

    async function clearTable() {
      let tb = document.getElementById("table");
      while (tb.rows.length > 1) {
        tb.deleteRow(1);
      }
    }

    async function displayAddpts() {
      let z = await getDocs(collection(db, "volunteers"));

      let ind = 1;
      // let numpts = document.getElementByID('ptsToAdd').value;

      z.forEach((docs) => {
        let data = docs.data();

        var toAdd = data.ApprovedListings;

        if (toAdd.length > 0) {
          var table2 = document.getElementById("table2");

          var row = table2.insertRow(ind);
          var name = data.name;
          var email = data.email;

          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);

          cell1.innerHTML = ind;
          cell2.innerHTML = name;
          cell3.innerHTML = email;

          var review_button = document.createElement("button");
          review_button.className = "bwt1";
          review_button.innerHTML = "Add";
          review_button.onclick = function () {
            var numpts = document.getElementById("ptsToAdd").value;
            console.log(numpts);
            userAddPts(email, numpts);
          };
          cell4.appendChild(review_button);
          ind += 1;
        }
      });
    }
    displayAddpts();

    async function userAddPts(email, numpts) {
      console.log(email);
      console.log(numpts);
      alert("Adding " + numpts + " for " + email);

      await updateDoc(doc(db, "volunteers", email), {
        totalPoints: increment(numpts),
        currentPoints: increment(numpts),
      });
    }
  },
};
/**
 * Function logic: 2 collections, one for applications and one for listings
 * Each document in application has applicant name, listing name, application date, status
 * Each document in listings has listing name, date, volunteers needed, approved, pending, remaining
 * Review button should not lead anywhere yet
 * Accept button calls a function that updates application collection with correct status and updates listing collection
 * Reject button removes application document and updates listing document
 */
//Note: Somehow button styling cannot be set to scoped, else it doesn't apply
</script>

<style>
.bwt1 {
  background-color: #ff9213;
  color: white;
}
.bwt2 {
  background-color: #099e21;
  color: white;
}
.bwt3 {
  background-color: #e81515;
  color: white;
}
.bwt4 {
  background-color: #ff9213;
  color: white;
}
tr:nth-child(odd) {
  background-color: #ffe5a3;
}
th,
td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}
</style>
<style scoped>
.orangetext {
  color: #ff9213;
  font-size: 20px;
  font-weight: bold;
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
  padding: 5%;
}
table {
  font-family: arial, sans-serif;
  border: 3px solid #ffd466;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}
.listing_container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
}
.listing_wrapper {
  padding: 0px;
  margin-right: 20px;
  margin-bottom: 20px;
  height: 150px;
  width: 25%;
  border: 5px solid #ffd466;
  border-radius: 15px 15px 15px 15px;
  overflow: hidden;
}
.listing_header {
  text-align: center;
  padding: 5px;
  height: 30%;
  width: 100%;
  background-color: #ffe5a3;
  box-sizing: border-box;
}
.listing_body {
  margin-top: 5%;
  margin-left: 10%;
  padding: 2px;
  text-align: center;
  height: 70%;
  width: 100%;
  background-color: #fff9e9;
  box-sizing: border-box;
}
.title {
  font-weight: bold;
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
