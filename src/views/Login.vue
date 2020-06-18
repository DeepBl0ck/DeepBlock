<template>
  <v-content>
    <fieldCard class="max auto">
      <v-card-text class="loginText" style="color: #3949AB">LOGIN TO CONTINUE</v-card-text>
      <p style="color:red" v-show="this.message" > {{message}} </p>
      <v-form style="padding: 30px 50px 20px 50px">
        <v-text-field
          v-model="user.username"
          label="Username"
          :rules="usernameRules"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="user.password"
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
        <v-btn @click="onSubmit()" block dark color="indigo">Login</v-btn>
        <div class="forgotBtn">
          <span
            class="loginUserRouter underlineWhenHover"
            @click="$router.push({ name: 'ForgotUsername' })"
          >Forgot Username</span>
          <span class="barText">|</span>
          <span
            class="loginPasswordRouter underlineWhenHover"
            @click="$router.push({ name: 'ForgotPassword' })"
          >Password</span>
        </div>
      </v-form>
      <div class="signupBtn">
        Do you have an account?
        <a href="/signUp">Sign up!</a>
      </div>
    </fieldCard>
  </v-content>
</template>

<script>
import FieldCard from "../components/user/FieldCard.vue";
import { mapActions } from "vuex";
import { LOGIN } from "@/store/auth";

export default {
  components: {
    fieldCard: FieldCard
  },
  data() {
    return {
      message: "",
      user: {
        username: "",
        password: ""
      },
      showPassword: false,
      usernameRules: [
        v => !!v || "UserName is required",
        v => (v && v.length >= 6) || "UserName must be more than 6 characters",
        v =>
          (v && v.length <= 12) || "UserName must be less than 12 characters",
        v => /^[a-z0-9_.]/.test(v) || "소문자, 숫자, _, . 만 가능합니다"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password must be more than 8 characters",
        v => (v && v.length <= 20) || "Password must be less than 20 characters"
      ]
    };
  },

  methods: {
    ...mapActions('auth', [LOGIN] ),
    onSubmit() {
      this[LOGIN](this.user)
        .then(() => {
          this.$router.push("./");
        })
        .catch(err => {
          this.message = err;
        });
    }
  }
};
</script>

<style lang="sass">
.rememberme .v-label
  font-size: 14px

.underlineWhenHover
  &:hover
    text-decoration: underline

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
