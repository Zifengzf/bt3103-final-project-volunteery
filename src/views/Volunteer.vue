<template>
  <NavBar />
  <VolunteerPage />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import VolunteerPage from "@/components/VolunteerPage.vue";

export default {
  name: "App",
  components: {
    VolunteerPage,
    NavBar,
  },
};
</script>

<style scoped>

</style>
