<template>
  <!-- <div id="nav">
    <router-link to="/">HomePage</router-link>

    <router-link to="/about">About</router-link>

    <router-link to="/volunteer">Volunteer</router-link>

    <router-link to="/myapplications">My Applications</router-link>
  </div> -->
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
#nav {
  padding: 30px;
  font-size: 20px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  padding: 7px;
  color: #d3b566 !important;
  text-decoration-line: none;
}

#nav a.router-link-exact-active {
  color: #e0953d !important;
  text-decoration-line: underline;
}
</style>
