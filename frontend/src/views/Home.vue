<template>
  <v-content>
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
    };
  },
  computed: {
    ...mapGetters('auth', ['isLoggedin', 'username'])
  }
};
</script>
