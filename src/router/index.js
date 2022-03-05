import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";

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
