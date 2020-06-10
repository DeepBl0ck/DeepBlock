<template>
  <v-content>
    <fieldcard>
      <v-card-text class="passwordText" style="color: #3949AB;">PASSWORD RECOVER</v-card-text>
      <v-text class="findPasswordText">Enter your email to reset your password</v-text>

      <v-form class="passwordForm">
        <v-text-field
          v-model="username"
          id="username"
          label="Username"
          :rules="usernameRules"
          outlined
          dense
        ></v-text-field>
        <v-text-field v-model="email" id="email" label="Email" :rules="emailRules" outlined dense></v-text-field>
        <v-btn @click="submit()" block dark color="indigo">Send email</v-btn>
        <v-layout justify-space-between class="passwordLinkLayout">
          <span class="loginRouter" @click="$router.push({ name: 'Login' })">Return to login</span>
          <span class="signupRouter" @click="$router.push({ name: 'SignUp' })">Sign Up</span>
        </v-layout>
      </v-form>
    </fieldcard>
  </v-content>
</template>

<script>
import FieldCard from "../components/user/FieldCard.vue"
import Swal from "sweetalert2";

export default {
  components: {
    fieldcard: FieldCard
  },
  data() {
    return {
      email: "",
      username: "",
      usernameRules: [
        v => !!v || "UserName is required",
        v => (v && v.length >= 6) || "UserName must be more than 6 characters",
        v =>
          (v && v.length <= 12) || "UserName must be less than 12 characters",
        v => /^[a-z0-9_.]/.test(v) || "only lowercase, _, . can be used"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    submit: function() {
      this.$axios
        .put(`./findpasswd`, {
          username: this.username,
          email: this.email
        })
        .then(res => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Email send Chack Your E-mail",
              text: res.data.message
            });
            this.$router.replace("./login");
          }
        })
        .catch(err => {
          let msg = "";
          let res = err.response;
          if (res.data.message) {
            msg = res.data.message;
          }
          Swal.fire({
            icon: "error",
            text: msg
          });
          this.$router.replace("./forgotPassword");
        });
    }
  }
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
  font-size: 1.5em
  color: #3949AB

.passwordIconHeadline
  padding-top: 10px
  padding-bottom: 10px

.passwordText
  font-size: 1.3em
  padding: 50px 0px 20px 0px

.findPasswordText
  font-size: 0.97em
  padding-top: 5px

.passwordForm
  padding: 30px 50px 20px 50px

.passwordLinkLayout
  padding: 10px 0px 0px 0px
</style>
