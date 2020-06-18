<template>
  <v-content>
    <fieldcard>
      <v-card-text class="changePasswordTitle" style="color: #3949AB">CHANGE TO PASSWORD</v-card-text>
      <v-form class="changeForm">
        <v-text-field
          v-model="afterpw"
          class="passwordField"
          label="Password"
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-text-field
          v-model="afterpw_verify"
          label="Confirm Password"
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-btn class="changeBtn" small dark color="indigo" @click="onSubmit()">Change</v-btn>
      </v-form>
    </fieldcard>
  </v-content>
</template>

<script>
import FieldCard from "../components/user/FieldCard.vue";
import auth from "@/service/auth";
import Swal from "sweetalert2";

export default {
  components: {
    fieldcard: FieldCard
  },
  data() {
    return {
      afterpw: "",
      afterpw_verify: "",
      showPassword: false,
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password should be more than 8 characters",
        v => (v && v.length <= 20) || "Password should be less than 20 characters"
      ]
    };
  },
  methods: {
    onSubmit: function () {
      auth.changePassword({
        after_password: this.afterpw,
        after_password_verify: this.afterpw_verify
      })
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Password changed successfully',
            text: res.data.message
          })
        })
        .catch(err => {
          const { message } = err.response ? err.response.data : err
          Swal.fire({
            icon: 'error',
            text: message
          })
        })
      this.$router.replace("/login")
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
