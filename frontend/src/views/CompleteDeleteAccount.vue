<template>
  <v-content>
    <v-container>
      <div class="d-flex flex-wrap justify-center align-center">
        <v-form class="centeralize">
          <i class="fas fa-check-circle pink-style lightorange-color" aria-hidden="true"></i>
          <p class="delete-title">Your account has been deleted.</p>
          <p class="thankful-subtitle">Thank you for using our service.</p>
          <p class="promise-subtitle">We'll be back with a better service.</p>

          <v-btn dark color="#f9a11b" @click="$router.push('/')">
            Thank you
          </v-btn>
        </v-form>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions } from "vuex";

export default {
  created() {
    this.logout();
  },
  methods: { ...mapActions("auth", ["logout"]) },
};
</script>
<style lang="sass" scoped>
.pink-style
  justify: center
  font-size: 50px
  padding: 20px 0px 20px 0px

.delete-title
  font-size: 1.8em
  font-weight: bold

.thankful-subtitle
  font-size: 1.4em
  padding-top: 40px

.textpromise-subtitle
  padding-bottom: 20px
</style>
