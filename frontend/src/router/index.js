import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import SignUp from "@/views/SignUp";
import FindPassword from "@/views/FindPassword";
import FindID from "@/views/FindID";
import DeleteAccount from "@/views/DeleteAccount";
import CompleteDeleteAccount from "@/views/CompleteDeleteAccount";
import ProjectInfo from "@/views/ProjectInfo";
import VerifyEmail from "@/views/VerifyEmail";
import CheckPassword from "@/views/CheckPassword";
import ChangePassword from "@/views/ChangePassword";
import Home from "@/views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/verifyemail",
    component: VerifyEmail,
  },
  {
    path: "/model",
    component: ProjectInfo,
  },
  {
    path: "/find-password",
    component: FindPassword,
  },
  {
    path: "/find-id",
    component: FindID,
  },
  {
    path: "/delete-account",
    component: DeleteAccount,
  },
  {
    path: "/complete-delete-account",
    component: CompleteDeleteAccount,
  },
  {
    path: "/check-password",
    component: CheckPassword,
  },
  {
    path: "/",
    component: Home,
  },
  {
    path: "/change-password",
    component: ChangePassword,
  },
  {
    path: "/dataset",
    component: () => import("@/views/DatasetMain.vue"),
  },
  {
    path: "/datasetinfo",
    component: () => import("@/views/DatasetInfo.vue"),
  },
  {
    path: "/project",
    component: () => import("@/views/ProjectMain.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
