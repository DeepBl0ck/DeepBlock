<template>
  <v-content>
    <v-container class="fill-height" fluid text-center>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card icon max-width="400">
            <v-list-item-title style="font-size:1.5em; color: #7986CB;">
              <div style="padding-top: 10px; padding-bottom: 10px;">
                <v-icon large>mdi-view-headline</v-icon>DeepBlock
              </div>
            </v-list-item-title>
            <v-divider color="#3949AB"></v-divider>

            <v-card-text
              style="font-size:1.2em; color: #7986CB;padding-top: 50px;"
            >LOGIN TO CONTINUE</v-card-text>

            <v-form style="padding: 30px 50px 20px 50px">
              <v-text-field v-model="username" label="Username" outlined dense></v-text-field>
              <v-text-field
                label="Password"
                outlined
                dense
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-layout justify-space-between class="rememberme" style="padding: 0px 0px 10px 0px;">
                <v-checkbox
                  dense
                  label="Remember Me"
                  v-model="rememberMe"
                  color="indigo"
                  class="shrink mr-2"
                  style="margin-top: 0px;padding-top: 0px;"
                ></v-checkbox>
              </v-layout>
              <v-btn @click="login" block dark color="indigo">Login</v-btn>
              <div style="padding-top:10px">
                <v-text style="font-size:13px;color:black;">Forgot</v-text>
                <span class="underline" @click="$router.push({name:'ForgotUsername'})">Username</span>
                <span>|</span>
                <span class="underline" @click="$router.push({name:'ForgotPassword'})">Password</span>
              </div>
            </v-form>
            <div style="padding-bottom: 10px;">
              Do you have an account?
              <a href="/signUp">Sign up!</a>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { apiserver } from "./apiserver";
export default {
  data() {
    return {
      showPassword: false,
      href: "/forgotPassword"
    };
  },
  methods: {
    login: function() {
      this.axios
        .post(
          `${apiserver}/login`,
          {
            username: this.username,
            password: this.password
          },
          { withCredentials: true }
        )
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style>
.rememberme .v-label {
  font-size: 14px;
}
.underline:hover {
  text-decoration: underline;
}
span {
  font-size: 13px;
  color: black;
}
</style>
