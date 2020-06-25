<template>
  <v-content>
    <fieldCard class="max auto">
      <v-card-text class="login-text" style="color: #1e5f8d">LOGIN TO CONTINUE</v-card-text>
      <p style="color:red" v-show="this.message">{{message}}</p>
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
        <v-btn @click="onSubmit()" block dark color="#1e5f8d" @keyup.enter="onSubmit()">Login</v-btn>
        <div class="forgot-button">
          <span class="login-user-router underline-hover pointer" @click="$router.push('/findID')">Find ID</span>
          <span class="bar-text">|</span>
          <span
            class="login-password-router underline-hover pointer"
            @click="$router.push('/findPassword')"
          >Password</span>
        </div>
      </v-form>
      <div class="signup-button">
        Do you have an account?
        <a @click="$router.push('/signup')" style="color:#1e5f8d">Sign up!</a>
      </div>
    </fieldCard>
  </v-content>
</template>

<script>
import FieldCard from "../components/user/FieldCard.vue";
import { mapActions } from "vuex";

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
        v => (v && v.length >= 6) || "UserName should be more than 6 characters",
        v =>
          (v && v.length <= 12) || "UserName should be less than 12 characters",
        v => /^[a-z0-9_.]/.test(v) || "소문자, 숫자, _, . 만 가능합니다"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password should be more than 8 characters",
        v => (v && v.length <= 20) || "Password should be less than 20 characters"
      ]
    };
  },

  methods: {
    ...mapActions('auth', ['login']),
    ...mapActions('avatar', ['getAvatar']),
    onSubmit() {
      this.login(this.user)
        .then(() => {
          this.getAvatar()
          this.$router.push("/");
        })
        .catch(err => {
          this.message = err;
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

.pointer
  cursor: pointer

.bar-text
  font-size: 13px

.login-password-router
  font-size: 13px

.signup-button
  padding-bottom: 10px
</style>
