import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Login from "@/views/Login";
import SignUp from "@/views/SignUp";
import Profile from "@/views/Profile";
import ForgotPassword from "@/views/ForgotPassword";
import ForgotUsername from "@/views/ForgotUsername";
import DeleteAccount from  "@/views/DeleteAccount";
import CompleteDeleteAccount from "@/views/CompleteDeleteAccount";
import Board from "@/views/Board"
import VerifyEmail from "@/views/VerifyEmail";
import CheckPassword from '@/views/CheckPassword'
import ChangePassword from '@/views/ChangePassword'
import TrainChart from "@/views/TrainChart"
import EvaluationChart from "@/views/EvaluationChart"

Vue.use(VueRouter);

const routes = [
  {
    path: "/train",
    name: "TrainChart",
    component: TrainChart
  },
  {
    path: "/evaluation",
    name: "EvaluationChart",
    component: EvaluationChart

  },
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
    path: "/board",
    name: "Board",
    component: Board
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