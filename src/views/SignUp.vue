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

            <v-card-text class="signupText" style="color: #3949AB"
              >CREATE YOUR ACCOUNT</v-card-text
            >

            <v-form class="signupForm">
              <v-text-field
                v-model="username"
                label="Username"
                :rules="usernameRules"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                outlined
                dense
              ></v-text-field>
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
              <v-btn @click="signup(this)" block dark color="indigo"
                >Sign Up</v-btn
              >
            </v-form>
            <div class="loginBtn">
              Already have an account?
              <a href="/login">Login!</a>
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
      username: "",
      usernameRules: [
        (v) => !!v || "UserName is required",
        (v) =>
          (v && v.length >= 6) || "UserName must be more than 6 characters",
        (v) =>
          (v && v.length <= 12) || "UserName must be less than 12 characters",
        (v) => /^[a-z0-9_.]/.test(v) || "소문자, 숫자, _, . 만 가능합니다",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => (v && v.length < 40) || "Email must be less than 40 characters",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 8) || "Password must be more than 8 characters",
        (v) =>
          (v && v.length <= 20) || "Password must be less than 20 characters",
      ],
    };
  },
  methods: {
    signup: function() {
      this.$axios
        .post(
          `/register`, 
        {
          username: this.username,
          password: this.password,
          email: this.email,
        })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Congratulation",
              text: response.data.message,
            });
            location.href = "./login";
          }
        })
        .catch((err) => {
          if (err.response.status === 409)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data.message,
            });
        });
    },
  },
};
</script>

<style lang="sass">
.rememberme .v-label
  font-size: 14px

.signupTitle
  font-size: 1.5em
  color: #3949AB

.signupIconHeadline
  padding-top: 10px
  padding-bottom: 10px

.signupText
  font-size: 1.2em
  padding-top: 50px

.signupForm
  padding: 40px 50px 30px 50px

.loginBtn
  padding-bottom: 10px
</style>
