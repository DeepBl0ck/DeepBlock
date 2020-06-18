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
        <v-btn @click="onSubmit()" block dark color="indigo">Send email</v-btn>
        <v-layout justify-space-between class="passwordLinkLayout">
          <span class="loginRouter" @click="$router.push('/login')">Return to login</span>
          <span class="signupRouter" @click="$router.push('/signup')">Sign Up</span>
        </v-layout>
      </v-form>
    </fieldcard>
  </v-content>
</template>

<script>
import FieldCard from "../components/user/FieldCard.vue"
import Swal from "sweetalert2";
import auth from "@/service/auth"

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
        v => (v && v.length >= 6) || "UserName should be more than 6 characters",
        v =>
          (v && v.length <= 12) || "UserName should be less than 12 characters",
        v => /^[a-z0-9_.]/.test(v) || "only lowercase, _, . can be used"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail should be valid"
      ]
    };
  },
  methods: {
    onSubmit: function () {
      auth.findPassword({
        username: this.username,
        email: this.email
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Email sent",
            text: "Please check your email"
          });
          this.$router.replace("/login");

        })
        .catch(err => {
          const {message} = err.response ? err.response.data : "Find Password Error"
          Swal.fire({
            icon: "error",
            text: message
          });
          this.$router.replace("/findPassword");
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
