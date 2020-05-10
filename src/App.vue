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