import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Volunteer from "@/views/Volunteer.vue";
import MyApplications from "@/views/MyApplications.vue";
import MyReward from "@/views/Reward.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/volunteer",
    name: "Volunteer",
    component: Volunteer,
  },
  {
    path: "/myapplications",
    name: "MyApplications",
    component: MyApplications,
  },
  {
    path: "/reward",
    name: "MyReward",
    component: MyReward,
  },
  /** 
   * Wait for more routes to be added
  {
    path: "/profit",
    name: "OnlyProfit",
    component: OnlyProfit,
  },
  */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
