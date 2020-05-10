<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <i class="fas fa-check-circle pinkstyle" aria-hidden="true"></i>
          <p class="title">
            Your account has been deleted.
          </p>
          <p class="subTitle">
            Thank you for using the service.
          </p>
          <p class="text">We'll be back with a better service.</p>

          <v-btn dark color="#7986cb" href="/">Home
              <v-icon right dark>mdi-home</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {};
</script>

<style lang="sass">
.rememberme .v-label 
  font-size: 14px

.pinkstyle 
  color: #7986cb
  font-size: 50px
  padding: 20px 0px 20px 0px

.title 
  font-size:1.8em
  font-weight: bold

.subTitle
  font-size:1.4em
  padding-top:40px
  margin-bottom: 5px

.text
  padding-bottom: 20px
</style>
