<template>
  <v-content>
    <fieldCard class="max auto">
      <v-card-text class="login-text" style="color: #3949AB">LOGIN TO CONTINUE</v-card-text>
      <v-form style="padding: 30px 50px 20px 50px">
        <v-text-field v-model="username" label="Username" :rules="usernameRules" outlined dense></v-text-field>
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
            color="indigo"
            class="checkBox"
            style="margin-top: 0px;padding-top: 0px;"
          ></v-checkbox>
        </v-layout>
        <v-btn @click="login()" block dark color="indigo">Login</v-btn>
        <div class="forgot-button">
          <span
            class="login-user-router underline-hover"
            @click="$router.push({ name: 'ForgotUsername' })"
          >Forgot Username</span>
          <span class="bar-text">|</span>
          <span
            class="login-password-router underline-hover"
            @click="$router.push({ name: 'ForgotPassword' })"
          >Password</span>
        </div>
      </v-form>
      <div class="signup-button">
        Do you have an account?
        <a href="/signUp">Sign up!</a>
      </div>
    </fieldCard>
  </v-content>
</template>

<script>
import FieldCard from "../components/user/FieldCard.vue";
import Swal from "sweetalert2";
export default {
  components: {
    fieldCard: FieldCard
  },
  data() {
    return {
      showPassword: false,
      href: "/forgotPassword",
      username: "",
      usernameRules: [
        v => !!v || "UserName is required",
        v => (v && v.length >= 6) || "UserName must be more than 6 characters",
        v =>
          (v && v.length <= 12) || "UserName must be less than 12 characters",
        v => /^[a-z0-9_.]/.test(v) || "소문자, 숫자, _, . 만 가능합니다"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password must be more than 8 characters",
        v => (v && v.length <= 20) || "Password must be less than 20 characters"
      ],
    };
  },
  methods: {
    login() {
      this.$axios
        .post(
          `/login`,
          {
            username: this.username,
            password: this.password
          },
          { withCredentials: true }
        )
        .then(res => {
          if (res.status === 200) {
            this.$router.push("./");
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
          this.$router.replace("/login");
        });
    }
  }
};
</script>

<style lang="sass" scoped>
.login-text
  font-size: 1.3em
  padding: 50px 0px 20px 0px

.rememberme .v-label
  font-size: 14px

.forgot-button
  padding-top: 10px

.underline-hover
  &:hover
    text-decoration: underline

.login-user-router
  font-size: 13px

.bar-text
  font-size: 13px

.login-password-router
  font-size: 13px

.signup-button
  padding-bottom: 10px
</style>
