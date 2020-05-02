<template>
  <v-app id="app">
    <router-view/>
    <HelloWorld/>
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