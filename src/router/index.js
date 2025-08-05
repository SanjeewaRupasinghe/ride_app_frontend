import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import LoginView from "@/views/LoginView.vue";
import axios from "axios";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/landing",
      name: "landing",
      component: LandingView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

const checkAuthentication = (next) => {
  axios
    .get("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      console.log(response);
      next();
    })
    .catch((error) => {
      console.log(error);
      localStorage.removeItem("token");
      next({ name: "login" });
    });
};

router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    return next();
  }

  if (!localStorage.getItem("token")) {
    return next({ name: "login" });
  }

  checkAuthentication(next);
});

export default router;
