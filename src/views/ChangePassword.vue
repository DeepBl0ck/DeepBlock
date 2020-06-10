<template>
  <v-content>
    <fieldcard>
      <v-card-text class="changePasswordTitle" style="color: #3949AB">CHANGE TO PASSWORD</v-card-text>

      <v-form class="changeForm">
        <v-text-field
          v-model="afterPassword"
          id="Password"
          class="passwordField"
          label="Password"
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-text-field
          v-model="afterPasswordVerify"
          id="Confirm Password"
          label="Confirm Password"
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-btn class="changeBtn" small dark color="indigo" @click="changePasswd()">Change</v-btn>
      </v-form>
    </fieldcard>
  </v-content>
</template>

<script>
import FieldCard from "../components/user/FieldCard.vue"
import Swal from "sweetalert2";
export default {
  components: {
    fieldcard: FieldCard
  },
  data() {
    return {
      showPassword: false,
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password must be more than 8 characters",
        v => (v && v.length <= 20) || "Password must be less than 20 characters"
      ]
    };
  },
  methods: {
    changePasswd: function() {
      this.$axios
        .put(`./u/passwd`, {
          after_password: this.afterPassword,
          after_password_verify: this.afterPasswordVerify
        })
        .then(response => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Change Your Password",
              text: response.data.message
            });
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
          this.$router.replace("/changePassword");
        });
    }
  }
};
</script>

<style lang="sass">
.changePasswordTitle
  font-size: 1.3em
  padding: 50px 0px 10px 0px
.passwordField
  padding-top: 30px

.changeBtn
  margin-left: 190px
</style>
