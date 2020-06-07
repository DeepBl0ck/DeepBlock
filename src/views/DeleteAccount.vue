<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-card class="deleteForm" icon max-width="400">
            <v-list-item-title class="accountTitle">
              <div class="accountIconHeadline">
                <v-icon large>mdi-view-headline</v-icon>DeepBlock
              </div>
            </v-list-item-title>
            <v-divider color="#3949AB" />

            <v-card-text class="accountText" style="color: #3949AB;">Delete Account</v-card-text>
            <v-text class="deleteAccountText">Are you really delete account?</v-text>

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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      password: "",
      username: "",
      passwordRules: [v => !!v || "Password is required"]
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
            this.$router.push('./completeDeleteAccount');
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
