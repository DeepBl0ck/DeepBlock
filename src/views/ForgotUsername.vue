<template>
  <v-content>
    <fieldcard>
      <v-card-text class="usernameText" style="color: #3949AB;">Find Username</v-card-text>
      <v-text class="userFindText">Enter your email to send your username</v-text>

      <v-form class="usernameForm">
        <v-text-field v-model="email" label="Email" :rules="emailRules" outlined dense></v-text-field>
        <v-btn @click="submit()" block dark color="indigo">Send email</v-btn>

        <v-layout justify-space-between class="usernameLinkLayout">
          <span class="userLoginRouter" @click="$router.push({ name: 'Login' })">Return to login</span>
          <span class="userSignupRouter" @click="$router.push({ name: 'SignUp' })">Sign Up</span>
        </v-layout>
      </v-form>
    </fieldcard>
  </v-content>
</template>

<script>
import FieldCard from "../components/user/FieldCard.vue";
import Swal from "sweetalert2";
export default {
  components: {
    fieldcard: FieldCard
  },
  data() {
    return {
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    submit() {
      this.$axios
        .post(`/findid`, {
          email: this.email
        })
        .then(res => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Email sent",
              text: res.data.message
            });
            this.$router.push("./login");
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
          this.$router.replace("./forgotUsername");
        });
    }
  }
};
</script>

<style lang="sass">
.span_hover:hover
  text-decoration: underline

.userLoginRouter
  font-size: 14px
  color: black

.userSignupRouter
  font-size: 14px
  color: black

.usernameTitle
  font-size: 1.5em
  color: #3949AB

.usernameIconHeadline
  padding-top: 10px
  padding-bottom: 10px

.usernameText
  font-size: 1.3em
  padding: 50px 0px 20px 0px

.userFindText
  font-size: 0.97em
  padding-top: 5px

.usernameForm
  padding: 30px 50px 20px 50px

.usernameLinkLayout
  padding: 10px 0px 0px 0px
</style>
