<template>
  <v-content>
<<<<<<< HEAD
    <v-container grid-list-xl>
      <v-layout align-center justify-center row>
        <v-flex md6 xs12>
          <div>
            <h2>Built by Developer</h2>
            <p class="subTitle">Deep Block is a development platform inspired by how to learn deep learning. Build blocks for deep learning and derive results. Blocks can be coded.</p>
          </div>
        </v-flex>
        <v-flex md6  xs12>
          <div class="textcenter">
            <v-card icon max-width="400">
              <v-list-item-title class="mainSignupTitle">
                <div class="mainIconHeadline">
                  <v-icon large>mdi-view-headline</v-icon>DeepBlock
                </div>
              </v-list-item-title>
              <v-divider color="#3949AB"></v-divider>

              <v-card-text class="mainTitle" style="color: #3949AB">CREATE YOUR ACCOUNT</v-card-text>

              <v-form class="mainSinupForm">
                <v-text-field
                  v-model="username"
                  label="Username"
                  :rules="usernameRules"
                  outlined
                  dense
                ></v-text-field>
                <v-text-field v-model="email" label="Email" :rules="emailRules" outlined dense></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  :rules="passwordRules"
                  outlined
                  dense
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-btn @click="signup(this)" block dark color="indigo">Sign Up</v-btn>
              </v-form>
              <div class="mainLoginBtn">
                Already have an account?
                <a href="/login">Login!</a>
=======
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
>>>>>>> connect-server
              </div>
            </v-card>
          </div>
        </v-flex>
        
      </v-layout>
      <v-layout align-center justify-center row>
          <v-flex md12 xs12>
            <iframe
              width="100%"
              height="700px"
              src="https://www.youtube.com/embed/VqnJwh6E9ak"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </v-flex>
        </v-layout>
    </v-container>
  </v-content>
</template>

<script>
<<<<<<< HEAD
export default {};
=======
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
            username: this.username,
            password: this.password,
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
>>>>>>> connect-server
</script>

<style lang="sass">

.subTitle
  font-size: 20px

.textcenter
  text-align: -webkit-center

<<<<<<< HEAD

.mainTitle
  font-size: 1.2em
  padding-top: 50px

.mainIconHeadline
=======
.rememberme .v-label
  font-size: 14px

.loginUserRouter
  font-size: 13px

.barText
  font-size: 13px

.loginPasswordRouter
  font-size: 13px

.loginIconHeadline
>>>>>>> connect-server
  padding-top: 10px
  padding-bottom: 10px

.mainSignupTitle
  font-size: 1.5em
  color: #3949AB

.mainSinupForm
  padding: 40px 50px 30px 50px

.mainLoginBtn
  padding-bottom: 10px

  
</style>