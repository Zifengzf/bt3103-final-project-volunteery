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
export default {};
</script>

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
  border-collapse: collapse;
  width: 100%;
}
tr:nth-child(even) {
  background-color: #ffd466;
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
