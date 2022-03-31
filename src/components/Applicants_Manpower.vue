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
          <th>Applied Date</th>
          <th>Status</th>
          <th>Review</th>
          <th>Accept</th>
          <th>Reject</th>
        </tr>
      </table>
    </div>
    <div class="manpower_overview"></div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  increment,
} from "firebase/firestore";
export default {
  mounted() {
    const db = getFirestore(firebaseApp);
    async function display() {
      let z = await getDocs(collection(db, "Applicants(Zifeng)"));
      let ind = 1;

      z.forEach((docs) => {
        let data = docs.data();
        var table = document.getElementById("table");

        var row = table.insertRow(ind);
        var date = docs.get("Applied Date");
        var name = data.Name;
        var listing_name = data.Listing;
        var status = data.Status;

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);

        cell1.innerHTML = name;
        cell2.innerHTML = listing_name;
        cell3.innerHTML = date;
        cell4.innerHTML = status;
        cell5.className = "review";
        cell6.className = "accept";
        cell7.className = "reject";

        var review_button = document.createElement("button");
        review_button.className = "bwt1";
        review_button.innerHTML = "Review";
        review_button.onclick = function () {
          console.log("Review functionality not available yet");
        };
        cell5.appendChild(review_button);

        if (status == "Pending") {
          var accept_button = document.createElement("button");
          var reject_button = document.createElement("button");
          accept_button.className = "bwt2";
          accept_button.innerHTML = "Accept";
          reject_button.className = "bwt3";
          reject_button.innerHTML = "Reject";
          accept_button.onclick = function () {
            accept(name, listing_name);
          };
          reject_button.onclick = function () {
            reject(name, listing_name);
          };
          cell6.appendChild(accept_button);
          cell7.appendChild(reject_button);
        }

        if (status == "Approved") {
          var cancel_button = document.createElement("button");
          cancel_button.className = "bwt3";
          cancel_button.innerHTML = "Cancel";
          cancel_button.onclick = function () {
            cancel(name, listing_name);
          };
          cell7.appendChild(cancel_button);
        }
      });
    }
    display();

    async function accept(name, listing_name) {
      // Part 1: Change applicant status to be approved
      await updateDoc(doc(db, "Applicants(Zifeng)", name), {
        Status: "Approved",
      });
      // Part 2: Change listing volunteer values
      await updateDoc(doc(db, "Listings", listing_name), {
        Approved: increment(1),
        Pending: increment(-1),
      });
      clearTable();
      display();
    }

    async function cancel(name, listing_name) {
      //Part 1: Delete document from applicants
      await deleteDoc(doc(db, "Applicants(Zifeng", name));
      //Part 2: Update documents in listings
      await updateDoc(doc(db, "Listings", listing_name), {
        Approved: increment(-1),
        Remaining: increment(1),
      });
      clearTable();
      display();
    }

    async function reject(name, listing_name) {
      //Part 1: Delete document from applicants
      await deleteDoc(doc(db, "Applicants(Zifeng", name));
      //Part 2: Update documents in listings
      await updateDoc(doc(db, "Listings", listing_name), {
        Pending: increment(-1),
      });
      clearTable();
      display();
    }

    async function clearTable() {
      let tb = document.getElementById("table");
      while (tb.rows.length > 1) {
        tb.deleteRow(1);
      }
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
</style>
