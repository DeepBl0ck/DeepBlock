<template>
  <v-app class="grey lighten-4">
    <Nevbar/>
  </v-app>     
</template>

<script>
// import Home from '@/views/Home'
// import Login from '@/views/Login'
// import Board from '@/views/Board'
 import Nevbar from '@/components/Nevbar'
// import Profile from '@/views/Profile'
// import SignUp from '@/views/SignUp'

export default {
  name: 'helloWorld',
  components: { 
    // 'home' : Home,
    // 'login' : Login,
    // 'board' : Board  ,
     Nevbar,
    // Profile,
    // 'signUp' : SignUp
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>