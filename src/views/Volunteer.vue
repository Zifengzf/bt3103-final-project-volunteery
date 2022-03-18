<template>
  <VolunteerPage />
</template>

<script>
import VolunteerPage from "@/components/VolunteerPage.vue";

export default {
  name: "App",
  components: {
    VolunteerPage,
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
