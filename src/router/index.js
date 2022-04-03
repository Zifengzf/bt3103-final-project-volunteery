import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import AboutOrg from "@/views/AboutOrg.vue";
import Volunteer from "@/views/Volunteer.vue";
import MyApplications from "@/views/MyApplications.vue";
import MyReward from "@/views/Reward.vue";
import Applicants from "@/views/Applicants.vue";
import MyPostings from "@/views/MyPostings.vue";
import OpportunitiesPage from "@/views/OpportunitiesPage.vue";
import DetailedListing from "@/views/DetailedListing.vue";

const routes = [{
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
        path: "/aboutorg",
        name: "AboutOrg",
        component: AboutOrg,
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
    {
        path: "/applicants",
        name: "Applicants",
        component: Applicants,
    },
    {
        path: "/mypostings",
        name: "MyPostings",
        component: MyPostings,
    },
    {
        path: "/opportunitiespage",
        name: "OpportunitiesPage",
        component: OpportunitiesPage,
    },
    {
        path: "/listing/:sn",
        name: "DetailedListing",
        component: DetailedListing,
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