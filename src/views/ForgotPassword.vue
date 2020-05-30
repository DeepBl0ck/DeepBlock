<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="forgotForm" icon max-width="400">
            <v-list-item-title class="passwordTitle">
              <div class="passwordIconHeadline">
                <v-icon large>mdi-view-headline</v-icon>DeepBlock
              </div>
            </v-list-item-title>
            <v-divider color="#3949AB"></v-divider>

            <v-card-text class="passwordText" style="color: #3949AB;"
              >PASSWORD RECOVER</v-card-text
            >
            <v-text class="findPasswordText"
              >Enter your email to reset your password</v-text
            >

            <v-form class="passwordForm">
              <v-text-field
                id="username"
                label="Username"
                :rules="usernameRules"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                id="email"
                label="Email"
                :rules="emailRules"
                outlined
                dense
              ></v-text-field>
              <v-btn @click="submit" block dark color="indigo"
                >Send email
              </v-btn>
              <v-layout justify-space-between class="passwordLinkLayout">
                <span
                  class="loginRouter"
                  @click="$router.push({ name: 'Login' })"
                  >Return to login</span
                >
                <span
                  class="signupRouter"
                  @click="$router.push({ name: 'SignUp' })"
                  >Sign Up</span
                >
              </v-layout>
            </v-form>
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
      email: "",
      username: "",
      usernameRules: [
        (v) => !!v || "UserName is required",
        (v) =>
          (v && v.length >= 6) || "UserName must be more than 6 characters",
        (v) =>
          (v && v.length <= 12) || "UserName must be less than 12 characters",
        (v) => /^[a-z0-9_.]/.test(v) || "소문자, 숫자, _, . 만 가능합니다",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    submit: function() {
      this.$axiox
        .post(`/findpasswd`, {
          username: this.username,
          email: this.email,
        })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Email sent",
              text: response.data.message,
            });
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            Swal.fire({
              icon: "error",
              title: "Fail",
              text: err.response.data.message,
            });
          }
        });
    },
  },
};
</script>

<style lang="sass">
.span_hover:hover
  text-decoration: underline

.loginRouter
  font-size: 14px
  color: black

.signupRouter
  font-size: 14px
  color: black

.forgotForm
  height: 80%
  width: 95%

.passwordTitle
  font-size:1.5em
  color: #3949AB

.passwordIconHeadline
  padding-top: 10px
  padding-bottom: 10px

.passwordText
  font-size:1.3em
  padding: 50px 0px 20px 0px

.findPasswordText
  font-size:0.97em
  padding-top: 5px

.passwordForm
  padding: 30px 50px 20px 50px

.passwordLinkLayout
  padding: 10px 0px 0px 0px
</style>
