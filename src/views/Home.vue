<template>
  <v-content>
    <v-row align="center">
      <v-col align="center">
        <h1>{{ text }}</h1>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      text: 'This is Home page.'
    }
  }
}
</script>
