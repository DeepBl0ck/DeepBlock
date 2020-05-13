<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card icon max-width="400">
            <v-list-item-title class="signupTitle">
              <div class="signupIconHeadline">
                <v-icon large>mdi-view-headline</v-icon>DeepBlock
              </div>
            </v-list-item-title>
            <v-divider color="#3949AB"></v-divider>

            <v-card-text
              class="signupText"
              style="color: #3949AB"
              >CREATE YOUR ACCOUNT</v-card-text
            >

            <v-form class="signupForm">
            <v-form style="padding: 40px 50px 30px 50px">
              <v-text-field v-model="username" label="Username" outlined dense></v-text-field>
              <v-text-field v-model="email" label="Email" outlined dense></v-text-field>
              <v-text-field
                label="Password"
                outlined
                dense
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-btn @click="signup(this)" block dark color="indigo">Sign Up</v-btn>
            </v-form>
            <div class="loginBtn">
              Already have an account? <a href="/login">Login!</a>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import {apiserver} from './apiserver'
export default {
  data() {
    return {
      showPassword: false,
    };
  },
  methods: {
    signup: function() {
      this.axios.post(`${apiserver}/register`, {
        username: this.username,
        password: this.password,
        email   : this.email
      })
      .then(res => {
        console.log(res)
        console.log(res.success)
        console.log(res.message)
      })
    }
  }
};
</script>

<style lang="sass">
.rememberme .v-label 
  font-size: 14px

.signupTitle
  font-size:1.5em
  color: #3949AB

.signupIconHeadline
  padding-top: 10px
  padding-bottom: 10px

.signupText
  font-size:1.2em
  padding-top: 50px

.signupForm
  padding: 40px 50px 30px 50px

.loginBtn
  padding-bottom: 10px
</style>
