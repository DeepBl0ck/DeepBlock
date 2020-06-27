<template>
  <v-content>
    <fieldcard class="max auto">
      <v-card-text class="account-info">
        <h3 class="darkblue-color username-text">{{ username }}</h3>
        <div class="email-box justify-center align-center">
          <v-avatar class="avatar-box" size="15">
            <img :src="avatar" alt />
          </v-avatar>
          <span class="email-info">{{ email }}</span>
        </div>
        
      </v-card-text>

      <v-form class="change-form">
        <p class="check-info-title">Please authenticate yourself before continuing.</p>
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
        <p
          class="find-password-router cursor-pointer underline-hover"
          @click="$router.push('FindPassword')"
        >Did you forget your password?</p>
        <v-btn block dark color="#274555" @click="checkPassword()">Next</v-btn>
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

<style lang="sass">
.username-text
  font-weight: normal
  font-size: 1.4em
  padding: 0px 0px 10px 0px
  
.account-info
  padding: 40px 0px 0px 0px

.email-box
  border-radius: 16px
  width: auto
  height: 30px
  padding: 5px 5px 5px 5px !important
  margin: 0px 0px 10px 0px
  border: 1px solid #dadce0
  letter-spacing: 1.0px
  display: inline-flex
  border-color: LightGray

.check-info-title
  font-size: 0.8em
  text-align: left
  padding: 30px 0px 0px 0px 

.change-form
  padding: 0px 50px 20px 50px

.find-password-router
  font-size: 15px
   
.avatar-box
  margin: 0px 5px 0px 0px

.email-info
  font-size: 0.8em
  font-weight: bolder
</style>
