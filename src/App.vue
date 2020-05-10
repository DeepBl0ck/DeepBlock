<template>
  <v-app class="grey lighten-4">
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