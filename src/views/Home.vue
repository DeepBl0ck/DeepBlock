<template>
  <v-content>
    <h1>{{ text }}</h1>

    <v-btn @click="getAvatar">change IMG</v-btn>
  </v-content>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      text: "This is Home page."
    };
  }
};
</script>
