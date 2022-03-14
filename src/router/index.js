import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import MyApplications from "@/views/MyApplications.vue";

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
    path: "/myapplications",
    name: "MyApplications",
    component: MyApplications,
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
