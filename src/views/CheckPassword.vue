<template>
  <v-content>
    <fieldcard>
      <v-card-text class="accountInfo">
        <h3>{{ username }}</h3>
        <div class="emailbox">
          <v-avatar class="avatarBox" size="23">
            <img :src="avatar" alt />
          </v-avatar>
          {{ email }}
        </div>
        <p class="infoTitle">Verify your identification</p>
      </v-card-text>

      <v-form class="changeForm">
        <v-text-field
          id="password_verify"
          v-model="passwordVerify"
          label="Password"
          outlined
          dense
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <span
          class="loginPasswordRouter"
          @click="$router.push('FindPassword')"
        >Did you forget your password?</span>
        <v-btn class="nextBtn" small dark color="indigo" @click="checkPassword()">Next</v-btn>
      </v-form>
    </fieldcard>
  </v-content>
</template>

<script>
import FiledCard from "../components/user/FieldCard.vue";
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import auth from "@/service/auth";

export default {
  components: {
    fieldcard: FiledCard
  },
  data() {
    return {
      showPassword: false,
      password_verify: "",
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
    checkPassword() {
      auth.checkPassword({
        password_verify: this.passwordVerify
      })
        .then(() => {
          this.$router.push("./changePassword");
        })
        .catch(err => {
          const { message } = err.response ? err.response.message : "check password error"
          Swal.fire({
            icon: "error",
            text: message
          });
        });
    }
  },
  computed: {
    ...mapGetters("auth", ["username", "email"]),
    ...mapGetters("avatar", ["avatar"])
  }
};
</script>

<style lang="sass">
.accountInfo
  padding: 40px 0px 0px 0px

.round
  -webkit-border-radius: 10px
  border-radius: 10px
  height: 20px
  width: 40px
  margin-right: 8px

.emailbox
  border-radius: 16px
  margin: 10px 0px 0px 0px
  padding: 5px 5px 5px 5px !important
  border: 1px solid #dadce0
  letter-spacing: .25px
  display: inline-flex
  border-color: LightGray
  font-size: 14px
  padding-top: 10px

.infoTitle
  font-size: 14px
  text-align: left
  margin-bottom: 2px
  padding: 20px 0px 0px 50px

.changeForm
  padding: 0px 50px 20px 50px

.nextBtn
  margin-left: 24px

.avatarBox
  margin: 0px 5px 1px 2px
</style>
