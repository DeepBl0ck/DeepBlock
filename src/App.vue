<template>
  <v-app id="app">
      <HelloWorld/>
      <router-view/>
  </v-app>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'

  export default {
    name: 'app',
    components: {
      HelloWorld
    }
  }
</script>