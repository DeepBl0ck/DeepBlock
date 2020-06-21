<template>
  <v-content>
    <fieldcard>
      <v-card-text class="accountText" style="color: #3949AB;">Delete Account</v-card-text>
      <p class="deleteAccountText">Are you really want to delete account?</p>

      <v-form class="accountForm">
        <v-text-field
          id="password"
          v-model="password"
          label="Password"
          outlined
          dense
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-btn @click="deleteAccount" block dark color="indigo">Delete</v-btn>
      </v-form>
    </fieldcard>
  </v-content>
</template>

<script>
import FieldCard from "../components/user/FieldCard.vue"
import swal from "@/util/swal"
import auth from "@/service/auth"

export default {
  components: {
    fieldcard: FieldCard
  },
  data() {
    return {
      showPassword: false,
      password: "",
      username: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password should be more than 8 characters",
        v => (v && v.length <= 20) || "Password should be less than 20 characters"
      ]
    };
  },
  methods: {
    deleteAccount: function () {
      auth.deleteAccount({data: {
          password: this.password
        }})
        .then(res => {
          if (res.status === 200) {
            this.$router.replace("./completeDeleteAccount");
          }
        })
        .catch(err => {
          let { message } = err.response ? err.response.data : "password is not mathced"
          swal.error(message)
        });
    }
  }
};
</script>

<style lang="sass">
.deleteForm
  height: 80%
  width: 95%

.accountTitle
  font-size: 1.5em
  color: #3949AB

.accountIconHeadline
  padding-top: 10px
  padding-bottom: 10px

.accountText
  font-size: 1.3em
  padding: 50px 0px 20px 0px

.deleteAccountText
  font-size: 0.97em
  padding-top: 5px

.accountForm
  padding: 30px 50px 20px 50px
</style>
