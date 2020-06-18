<template>
  <v-content>
    <fieldcard>
      <v-card-text class="signupText" style="color: #3949AB">CREATE YOUR ACCOUNT</v-card-text>

      <v-form class="signupForm">
        <v-text-field v-model="user.name" label="Username" :rules="usernameRules" outlined dense></v-text-field>
        <v-text-field v-model="user.email" label="Email" :rules="emailRules" outlined dense></v-text-field>
        <v-text-field
          v-model="user.pw"
          label="Password"
          :rules="passwordRules"
          outlined
          dense
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-btn @click="onSubmit(this)" block dark color="indigo">Sign Up</v-btn>
      </v-form>
      <div class="loginBtn">
        Already have an account?
        <a href="/login">Login!</a>
      </div>
    </fieldcard>
  </v-content>
</template>

<script>
import FieldCard from "../components/user/FieldCard.vue";
import Swal from "sweetalert2";
import auth from "@/service/auth"

export default {
  components: {
    fieldcard: FieldCard
  },
  data() {
    return {
      user: {
        name: "",
        pw: "",
        email: ""
      },
      showPassword: false,
      usernameRules: [
        v => !!v || "UserName is required",
        v => (v && v.length >= 6) || "UserName should be more than 6 characters",
        v =>
          (v && v.length <= 12) || "UserName should be less than 12 characters",
        v => /^[a-z0-9_.]/.test(v) || "only lowercase, _, . can be used"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => (v && v.length < 40) || "Email should be less than 40 characters",
        v => /.+@.+\..+/.test(v) || "E-mail should be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password should be more than 8 characters",
        v => (v && v.length <= 20) || "Password should be less than 20 characters"
      ]
    };
  },
  methods: {
    onSubmit() {
      auth.register(this.user)
        .then(res => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.message
          });
          this.$router.push("./login");

        })
        .catch(err => {
          const { message } = err.response ? err.response.data : "register error"
          Swal.fire({
            icon: "error",
            text: message
          });
        });
    }
  }
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
