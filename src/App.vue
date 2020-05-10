<template>
  <v-app>
    <router-view/>
    <Nevbar/>
  </v-app> 
</template>

<script>
import Nevbar from '@/components/Nevbar'

  export default {
    name: 'app',
    components: {
      Nevbar
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Open Sans', sans-serif;
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