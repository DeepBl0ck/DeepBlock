<template>
  <v-content>
    <v-container>
      <v-row align="center">
        <v-col align-self="center">
          <v-card flat>
            <p class="customTitle">Built by Developer</p>
            <p class="subTitle">
              Deep Block is a development platform inspired by how to learn deep
              learning. Build blocks for deep learning and derive results.
              Blocks can be coded.
            </p>
          </v-card>
        </v-col>
        <v-col align-self="center">
          <v-card class="loginCard" outlined max-width="450">
            <v-list-item-title class="projectTitle">
              <div class="loginIconHeadline">
                <v-icon large>mdi-view-headline</v-icon>DeepBlock
              </div>
            </v-list-item-title>
            <v-divider color="#3949AB"></v-divider>

            <v-card-text class="loginText" style="color: #3949AB"
              >LOGIN TO CONTINUE</v-card-text
            >

            <v-form style="padding: 30px 50px 20px 50px">
              <v-text-field
                v-model="userName"
                label="Username"
                :rules="usernameRules"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="passWord"
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
              <v-btn @click="login()" block dark color="indigo">Login</v-btn>
              <div class="forgotBtn">
                <span
                  class="loginUserRouter"
                  @click="$router.push({ name: 'ForgotUsername' })"
                  >Forgot Username</span
                >
                <span class="barText"> | </span>
                <span
                  class="loginPasswordRouter"
                  @click="$router.push({ name: 'ForgotPassword' })"
                  >Password</span
                >
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
import Swal from "sweetalert2";
export default {
  data() {
    return {
      showPassword: false,
      href: "/forgotPassword",
      username: "",
      usernameRules: [
        (v) => !!v || "UserName is required",
        (v) =>
          (v && v.length <= 10) || "UserName must be less than 10 characters",
        (v) => /^[a-z0-9_.]/.test(v) || "소문자, 숫자, _, . 만 가능합니다",
      ],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    login: function() {
      this.$axios
        .post(
          `/login`,
          {
            username: this.userName,
            password: this.passWord,
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.status === 200) {
            location.href = "./";
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            Swal.fire({
              icon: "warning",
              text: err.response.data.message,
            });
          } else if (err.response.status === 401) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data.message,
            });
          } else if (err.response.status === 500) {
            Swal.fire({
              icon: "error",
              title: "Fail...",
              text: err.response.data.message,
            });
          }
        });
    },
  },
};
</script>

<style lang="sass">
.customTitle
  font-size: 50px
  text-align: left

.subTitle
  text-align: left
  font-size: 22px
  margin-right: 10px

.loginCard
  margin: 50px 0px 0px 100px

.rememberme .v-label
  font-size: 14px

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
