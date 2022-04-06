<template>
  <NavBar2 />
  <OrgDetailedListingPage />
</template>

<script>
import NavBar2 from "@/components/NavBar2.vue";
import OrgDetailedListingPage from "@/components/OrgDetailedListingPage.vue";

export default {
  name: "App",
  components: {
    OrgDetailedListingPage,
    NavBar2,
  },
};
</script>

<style scoped>

</style>
