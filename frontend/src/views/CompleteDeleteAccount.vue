<template>
  <v-content>
    <v-container>
      <div class="d-flex flex-wrap justify-center align-center">
        <v-form class="centeralize background-color">
          <i class="fas fa-check-circle pink-style lightorange-color" aria-hidden="true"></i>
          <p class="title">Your account has been deleted.</p>
          <p class="sub-title">Thank you for using our service.</p>
          <p class="text">We'll be back with a better service.</p>

          <v-btn dark color="#f9a11b" @click="$router.push('/homeLogin')">
            Thank you
          </v-btn>
        </v-form>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  created(){ this.logout() },
  methods: { ...mapActions("auth", ['logout']) }
}
</script>
<style lang="sass" scoped>
.pink-style 
  justify: center
  font-size: 50px
  padding: 20px 0px 20px 0px

.title 
  font-size: 1.8em
  font-weight: bold

.sub-title
  font-size: 1.4em
  padding-top: 40px

.text
  padding-bottom: 20px

.background-color
  background: rgba(204, 229, 255, 0.2)
  width: 100%
</style>
