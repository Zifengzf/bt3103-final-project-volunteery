<template>
  <NavBar/>
  <RewardsPage/>

</template>

<script>
import NavBar from '@/components/NavBar.vue'
import RewardsPage from '@/components/RewardsPage.vue'

export default {
  name: "RewardPage",

  components: {
    NavBar,
    RewardsPage
  },
};
</script>

