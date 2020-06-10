<template>
  <v-content>
    <fieldcard>
      <v-card-text class="signupText" style="color: #3949AB">CREATE YOUR ACCOUNT</v-card-text>

      <v-form class="signupForm">
        <v-text-field v-model="username" label="Username" :rules="usernameRules" outlined dense></v-text-field>
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
export default {
  components: {
    fieldcard: FieldCard
  },
  data() {
    return {
      showPassword: false,
      username: "",
      usernameRules: [
        v => !!v || "UserName is required",
        v => (v && v.length >= 6) || "UserName must be more than 6 characters",
        v =>
          (v && v.length <= 12) || "UserName must be less than 12 characters",
        v => /^[a-z0-9_.]/.test(v) || "only lowercase, _, . can be used"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => (v && v.length < 40) || "Email must be less than 40 characters",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password must be more than 8 characters",
        v => (v && v.length <= 20) || "Password must be less than 20 characters"
      ]
    };
  },
  methods: {
    signup() {
      this.$axios
        .post(`/register`, {
          username: this.username,
          password: this.password,
          email: this.email
        })
        .then(res => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
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
