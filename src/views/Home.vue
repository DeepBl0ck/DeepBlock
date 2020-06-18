<template>
  <v-content>
    <h1>{{ text }}</h1>

    <div v-if="isLoggedin">
      <strong>Hello, {{ username }}!</strong>
    </div>
    <div v-else>
      <strong>Welcome, guest!</strong>
    </div>
  </v-content>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Home",
  components: {},
  data() {
    return {
      text: "This is Home page."
    };
  },
  computed: {
    ...mapGetters('auth', ['isLoggedin', 'username'])
  }
};
</script>
