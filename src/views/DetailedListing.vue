<template>
  <NavBar />
  <DetailedListingPage />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import DetailedListingPage from "@/components/DetailedListingPage.vue";

export default {
  name: "App",
  components: {
    DetailedListingPage,
    NavBar,
  },
};
</script>

<style scoped>

</style>
