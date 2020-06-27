<template>
  <v-content>
    <fieldcard>
      <v-card-text class="account-info">
        <h3>{{ username }}</h3>
        <div class="email-box">
          <v-avatar class="avatar-box" size="23">
            <img :src="avatar" alt />
          </v-avatar>
          {{ email }}
        </div>
        <p class="info-title">본인임을 인증하시오.</p>
      </v-card-text>

      <v-form class="change-form">
        <v-text-field
          id="password_verify"
          v-model="verify"
          label="Password"
          outlined
          dense
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <span
          class="login-password-router"
          @click="$router.push('FindPassword')"
        >Did you forget your password?</span>
        <v-btn class="next-button" small dark color="indigo" @click="checkPassword()">Next</v-btn>
      </v-form>
    </fieldcard>
  </v-content>
</template>

<script>
import FiledCard from "../components/user/FieldCard.vue";
import swal from "@/util/swal"
import { mapGetters } from "vuex";
import auth from "@/service/auth";

export default {
  components: {
    fieldcard: FiledCard
  },
  data() {
    return {
      showPassword: false,
      verify: "",
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
        password_verify: this.verify
      })
        .then(() => {
          this.$router.replace("./changePassword");
        })
        .catch(err => {
          const { message } = err.response ? err.response.message : "check password error"
          swal.error(message)
        });

    }
  },
  computed: {
    ...mapGetters("auth", ["username", "email"]),
    ...mapGetters("avatar", ["avatar"])
  }
};
</script>

<style lang="sass" scoped>
.account-info
  padding: 40px 0px 0px 0px

.round
  -webkit-border-radius: 10px
  border-radius: 10px
  height: 20px
  width: 40px
  margin-right: 8px

.email-box
  border-radius: 16px
  margin: 10px 0px 0px 0px
  padding: 5px 5px 5px 5px !important
  border: 1px solid #dadce0
  letter-spacing: .25px
  display: inline-flex
  border-color: LightGray
  font-size: 14px
  padding-top: 10px

.info-title
  font-size: 14px
  text-align: left
  margin-bottom: 2px
  padding: 20px 0px 0px 50px

.change-form
  padding: 0px 50px 20px 50px

.next-button
  margin-left: 24px

.avatar-box
  margin: 0px 5px 1px 2px
</style>
