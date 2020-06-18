import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Login from "@/views/Login";
import SignUp from "@/views/SignUp";
import Profile from "@/views/Profile";
import FindPassword from "@/views/FindPassword";
import FindID from "@/views/FindID";
import DeleteAccount from "@/views/DeleteAccount";
import CompleteDeleteAccount from "@/views/CompleteDeleteAccount";
import Model from "@/views/Model"
import VerifyEmail from "@/views/VerifyEmail";
import CheckPassword from '@/views/CheckPassword'
import ChangePassword from '@/views/ChangePassword'
import HomeLogin from '@/views/HomeLogin'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
  },
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
    component: Model
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/findPassword",
    component: FindPassword,
  },
  {
    path: "/findID",
    component: FindID,
  },
  {
    path: "/deleteAccount",
    component: DeleteAccount,
  },
  {
    path: "/completeDeleteAccount",
    component: CompleteDeleteAccount,
  },
  {
    path: "/checkPassword",
    component: CheckPassword
  },
  {
    path: "/homeLogin",
    component: HomeLogin
  },
  {
    path: "/changePassword",
    component: ChangePassword
  },
  {
    path: '/datasetMain',
    component: () => import('@/views/DatasetMain.vue')
  },
  {
    path: '/datasetInfo',
    component: () => import('@/views/DatasetInfo.vue')
  },
  {
    path: '/projectMain',
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