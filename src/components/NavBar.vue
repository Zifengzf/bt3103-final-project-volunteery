<template>
  <div class="topnav">
    <img
      src="@/assets/volunteery_copy.png"
      alt=""
      style="margin-left: 0px; height: 60; float: left; padding-top: 11px"
    />

    <div id="nav">
      <router-link class="rl" to="/volunteer">Volunteer Opportunities</router-link> 
      <router-link class="rl" to="/myapplications">My Applications</router-link> 
      <router-link class="rl" to="/reward">My Rewards</router-link>
      <router-link class="rl" to="/profile">My Profile</router-link>
      <router-link class="rl" to="/">Sign out</router-link>
    </div>

  </div>
</template>

<script>

export default {
  name: "NavBar",

  data() {
    return {
      user: false,
    };
  },
};
</script>

<style scoped>
.topnav {
  background-color: #fff9e9;
  overflow: hidden;
  justify-items: center;
}
#nav {
  padding: 30px 10px 30px 0px;
  text-align: right;
  font-size: 20px;
  color: #D3B566;
}

#nav a {
  font-weight: bold;
  color: black;
}

#nav a.router-link-exact-active {
  color: #ff9213;
}
.dropdown {
  overflow: hidden;
  float: right;
  /* padding: 15px; */
}
.rl {
  padding: 10px;
  color: #D3B566; 
  text-decoration:none;
}

.dropdown .dropbtn {
  font-size: 25px;
  border: none;
  outline: none;
  color: #ff9213;
  padding: 22px 16px 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.navbar a:hover,
.dropdown:hover .dropbtn {
  color: #ffbf00;
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
