<template>
  <v-content>
    <fieldcard>
        <v-card-text class="accountText" style="color: #3949AB;">Delete Account</v-card-text>
        <p class="deleteAccountText">Are you really delete account?</p>

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
          <v-btn @click="checkPassword" block dark color="indigo">Next</v-btn>
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
      username: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password should be more than 8 characters",
        v => (v && v.length <= 20) || "Password should be less than 20 characters"
      ]
    };
  },
  methods: {
    checkPassword: function() {
      this.$axios
        .delete(`/u/unregister`, {
          data: {
            password: this.password
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.$router.push("./completeDeleteAccount");
          }
        })
        .catch(err => {
          let msg = "";
          if (err.res.data.message) {
            msg = err.res.data.message;
          }
          Swal.fire({
            icon: "error",
            text: msg
          });
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
