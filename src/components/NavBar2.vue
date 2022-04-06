<template>
  <div class="topnav">
    <!-- <div id="logged" v-if="user"> -->
    <img
      src="@/assets/volunteery_logo.png"
      alt=""
      style="margin-left: 0px; height: 60; float: left"
    />
    <div class="dropdown">
      <button class="dropbtn">Organisation</button>
      <div class="dropdown-content">
        <a href="#">Profile</a>
        <router-link to="/" class="router-link">Sign out</router-link>
      </div>
    </div>
    <div id="nav">
      <!-- <router-link to="/" class="router-link">Home</router-link> | -->
      <!-- <router-link to="/about" class="router-link">Switch to User</router-link> | -->
      <router-link to="/opportunitiespage">Volunteer Opportunities</router-link> |
      <router-link to="/applicants">Applicants Review</router-link> |
      <router-link to="/mypostings">My Postings</router-link>
    </div>

    <!-- </div> -->
  </div>
</template>

<script>
// import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "NavBar",

  data() {
    return {
      user: false,
    };
  },

  // mounted() {
  //     const auth = getAuth();
  //     onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //         this.user = user;
  //         console.log("showing nav " + user)
  //     }
  //     })
  // },
};
</script>

<style scoped>
.topnav {
  background-color: #ff9213;
  overflow: hidden;
  justify-items: center;
}
#nav {
  padding: 30px 0px 30px 0px;
  text-align: center;
  font-size: 20px;
}

#nav a {
  font-weight: bold;
  color: black;
}

#nav a.router-link-exact-active {
  color: #fff9e9;
}
.dropdown {
  overflow: hidden;
  float: inline-end;
  padding: 15px;
}

.dropdown .dropbtn {
  font-size: 25px;
  border: none;
  outline: none;
  color: #fff9e9;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.navbar a:hover,
.dropdown:hover .dropbtn {
  color: #ffe5a3;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffe5a3;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ffd466;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
