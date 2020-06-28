<template>
  <v-content>
    <v-container grid-list-lg>
      <v-layout align-center row>
        <v-flex md6 xs12>
          <div>
            <h1 class="darkblue-color" style="text-transform: none">We are DEEPBLOCK</h1>
            <br/>
            <p
              class="darkblue-color deepblock-info-subtitle"
            >DEEPBLOCK is a development platform inspired by how to learn deep learning. Build blocks for deep learning and derive results. Blocks can be coded.</p>
          </div>
        </v-flex>
        <v-flex md6 xs12>
          <v-row class="align-right" justify="center">
            <v-col cols="12">
              <fieldCard class="max auto">
                <v-card-text class="login-text darkblue-color">LOGIN TO CONTINUE</v-card-text>
                <p style="color:red" v-show="this.message">{{message}}</p>
                <v-form class="login-form">
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
                  <v-btn
                    @click="onSubmit()"
                    block
                    dark
                    color="#274555"
                    @keyup.enter="onSubmit()"
                  >Login</v-btn>
                  <div class="find-links">
                    <span
                      class="find-id-router darkblue-color underline-hover cursor-pointer"
                      @click="$router.push('/findID')"
                    >Find ID</span>
                    <span class="bar darkblue-color">|</span>
                    <span
                      class="find-password-router darkblue-color underline-hover cursor-pointer"
                      @click="$router.push('/findPassword')"
                    >Password</span>
                  </div>
                </v-form>
                <div class="signup-link darkblue-color">
                  Do you have an account?
                  <a
                    class="underline-hover"
                    @click="$router.push('/signup')"
                    style="color:#f9a11b"
                  >Sign up!</a>
                </div>
              </fieldCard>
            </v-col>
          </v-row>
        </v-flex>
        <v-flex md12 xs12>
          <iframe
            src="https://www.youtube.com/embed/VqnJwh6E9ak"
            allowfullscreen
            style="width: 73.5vw; height: 88vh"
          ></iframe>
        </v-flex>
      </v-layout>
    </v-container>
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
        v =>
          (v && v.length >= 6) || "UserName should be more than 6 characters",
        v =>
          (v && v.length <= 12) || "UserName should be less than 12 characters",
        v => /^[a-z0-9_.]/.test(v) || "소문자, 숫자, _, . 만 가능합니다"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          (v && v.length >= 8) || "Password should be more than 8 characters",
        v =>
          (v && v.length <= 20) || "Password should be less than 20 characters"
      ]
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    ...mapActions("avatar", ["getAvatar"]),
    onSubmit() {
      this.login(this.user)
        .then(() => {
          this.getAvatar();
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
.align-right
  width: 85%
  float: right

.deepblock-info-subtitle
  font-size: 1.3em
</style>