import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Login from "@/views/Login";
import SignUp from "@/views/SignUp";
import Profile from "@/views/Profile";
import ForgotPassword from "@/views/ForgotPassword";
import ForgotUsername from "@/views/ForgotUsername";
import DeleteAccount from "@/views/DeleteAccount";
import CompleteDeleteAccount from "@/views/CompleteDeleteAccount";
import Model from "@/views/Model"
import VerifyEmail from "@/views/VerifyEmail";
import CheckPassword from '@/views/CheckPassword'
import ChangePassword from '@/views/ChangePassword'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/verifyemail",
    name: "VerifyEmail",
    component: VerifyEmail,
  },
  {
    path: "/model",
    name: "Model",
    component: Model
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/forgotPassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/forgotUsername",
    name: "ForgotUsername",
    component: ForgotUsername,
  },
  {
    path: "/deleteAccount",
    name: "DeleteAccount",
    component: DeleteAccount,
  },
  {
    path: "/completeDeleteAccount",
    name: "CompleteDeleteAccount",
    component: CompleteDeleteAccount,
  },
  {
    path: "/checkPassword",
    name: "CheckPassword",
    component: CheckPassword
  },
  {
    path: "/changePassword",
    name: "ChangePassword",
    component: ChangePassword
  },
  {
    path: '/datasetMain',
    name: 'DatasetMain',
    component: () => import('@/views/DatasetMain.vue')
  },
  {
    path: '/datasetInfo',
    name: 'DatasetInfo',
    component: () => import('@/views/DatasetInfo.vue')
  },
  {
    path: '/projectMain',
    name: 'ProjectMain',
    component: () => import('@/views/ProjectMain.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/Test.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;