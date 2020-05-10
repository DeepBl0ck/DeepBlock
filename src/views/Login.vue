<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card icon max-width="400">
            <v-list-item-title class="projectTitle">
              <div class="loginIconHeadline">
                <v-icon large>mdi-view-headline</v-icon>DeepBlock
              </div>
            </v-list-item-title>
            <v-divider color="#3949AB"></v-divider>

            <v-card-text
              class="loginText"
              style="color: #3949AB"
              >LOGIN TO CONTINUE</v-card-text
            >

            <v-form class="loginForm">
              <v-text-field
                id="username"
                label="Username"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                id="password"
                label="Password"
                outlined
                dense
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-layout
                justify-space-between
                class="rememberme"
              >
                <v-checkbox
                  dense
                  label="Remember Me"
                  v-model="rememberMe"
                  color="indigo"
                  class="checkBox"
                  style="margin-top: 0px;padding-top: 0px;"
                >
                </v-checkbox>
              </v-layout>
              <v-btn @click="submit" block dark color="indigo">Login</v-btn>
              <div class="forgotBtn">
                <span @click="$router.push({name:'ForgotUsername'})">Forgot Username</span>
                <span> | </span>
                <span @click="$router.push({name:'ForgotPassword'})">Password</span>
              </div>
            </v-form>
            <div class="signupBtn">
              Do you have an account? <a href="/signUp">Sign up!</a>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      password: "Password",
      href: "/forgotPassword"
    };
  },
};
</script>

<style lang="sass">
.rememberme .v-label 
  font-size: 14px

span:hover 
  text-decoration: underline

span 
  font-size:13px
  color:black

.loginIconHeadline
  padding-top: 10px 
  padding-bottom: 10px

.projectTitle
  font-size:1.5em
  color: #3949AB

.loginText
  font-size:1.3em
  padding: 50px 0px 20px 0px

.loginForm
  padding: 30px 50px 20px 50px

.rememberme
  padding: 0px 0px 10px 0px

.forgotBtn
  padding-top:10px

.signupBtn
  padding-bottom: 10px
</style>
