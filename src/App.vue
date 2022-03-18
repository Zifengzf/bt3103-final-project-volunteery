<template>
  <!-- <div id="nav">
    <router-link to="/">HomePage</router-link>
    ||
    <router-link to="/about">About</router-link>
    ||
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
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: rgb(34, 94, 74);
}
</style>
