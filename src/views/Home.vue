<template>
  <NavBar />
  <HomePage />
</template>

<script>
import HomePage from "@/components/HomePage.vue";
import NavBar from "@/components/NavBar2.vue";

export default {
  name: "App",
  components: {
    NavBar,
    HomePage,
  },
  data() {
    return {
      refreshComp: 0,
    };
  },
  methods: {
    change() {
      this.refreshComp += 1;
    },
  },
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
#bg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
