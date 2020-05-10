import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import Model from '../views/Board'
import Profile from '../views/Profile'
import ForgotPassword from '../views/ForgotPassword'
import ForgotUsername from '../views/ForgotUsername'
import DeleteAccount from '../views/DeleteAccount'
import CompleteDeleteAccount from '../views/CompleteDeleteAccount'
import Projects from '../views/Projects'
import test from '../views/test'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/board',
        name: 'Board',
        component: Model
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/forgotPassword',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        path: '/forgotUsername',
        name: 'ForgotUsername',
        component: ForgotUsername
    },
    {
        path: '/deleteAccount',
        name: 'DeleteAccount',
        component: DeleteAccount
    },
    {
        path: '/completeDeleteAccount',
        name: 'CompleteDeleteAccount',
        component: CompleteDeleteAccount
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects
    },
    {
        path: '/test',
        name: 'test',
        component: test
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router