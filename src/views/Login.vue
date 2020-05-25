<template>
  <v-content>
    <v-container class="fill-height" fluid text-center>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card icon max-width="400">
            <v-list-item-title class="projectTitle">
              <div class="loginIconHeadline">
                <v-icon large>mdi-view-headline</v-icon>DeepBlock
              </div>
            </v-list-item-title>
            <v-divider color="#3949AB"></v-divider>
            <v-card-text class="loginText" style="color: #3949AB">LOGIN TO CONTINUE</v-card-text>
            <v-form style="padding: 30px 50px 20px 50px">
              <v-text-field
                v-model="username"
                label="Username"
                :rules="usernameRules"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                outlined
                dense
                :rules="passwordRules"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-layout justify-space-between class="rememberme">
                <v-checkbox
                  dense
                  label="Remember Me"
                  v-model="rememberMe"
                  color="indigo"
                  class="checkBox"
                  style="margin-top: 0px;padding-top: 0px;"
                ></v-checkbox>
              </v-layout>
              <v-btn @click="login" block dark color="indigo">Login</v-btn>
              <div class="forgotBtn">
                <span
                  class="loginUserRouter underlineWhenHover"
                  @click="$router.push({ name: 'ForgotUsername' })"
                >Forgot Username</span>
                <span class="barText">|</span>
                <span
                  class="loginPasswordRouter underlineWhenHover"
                  @click="$router.push({ name: 'ForgotPassword' })"
                >Password</span>
              </div>
            </v-form>
            <div class="signupBtn">
              Do you have an account?
              <a href="/signUp">Sign up!</a>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { apiserver } from "./apiserver";

export default {
  data() {
    return {
      showPassword: false,
      href: "/forgotPassword",
      username: "",
      usernameRules: [
        v => !!v || "UserName is required",
        v =>
          (v && v.length <= 10) || "UserName must be less than 10 characters",
        v => /^[a-z0-9_.]/.test(v) || "소문자, 숫자, _, . 만 가능합니다"
      ],
      password: "",
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    login: function() {
      this.axios
        .post(
          `${apiserver}/login`,
          {
            username: this.username,
            password: this.password
          },
          { withCredentials: true }
        )
        .then(res => {
          console.log(res);
          console.log("로그인 성공");
        })
        .catch(err => {
          console.log(err);
          console.log("로그인 실패");
        });
    }
  }
};
</script>

<style lang="sass">
.rememberme .v-label
  font-size: 14px

.underlineWhenHover
  &:hover
    text-decoration: underline
  
.loginUserRouter
  font-size: 13px

.barText
  font-size: 13px

.loginPasswordRouter
  font-size: 13px

.loginIconHeadline
  padding-top: 10px
  padding-bottom: 10px

.projectTitle
  font-size: 1.5em
  color: #3949AB

.loginText
  font-size: 1.3em
  padding: 50px 0px 20px 0px

.loginForm
  padding: 30px 50px 20px 50px

.rememberme
  padding: 0px 0px 10px 0px

.forgotBtn
  padding-top: 10px

.signupBtn
  padding-bottom: 10px
</style>
