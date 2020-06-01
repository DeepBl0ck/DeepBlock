<template>
  <v-content>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-card max-width="400" height="360" outlined>
            <v-list-item-title class="projectTitle">
              <div class="loginIconHeadline">
                <v-icon large>mdi-view-headline</v-icon>DeepBlock
              </div>
            </v-list-item-title>
            <v-divider color="#3949AB"></v-divider>

            <v-card-text class="changePasswordTitle" style="color: #3949AB"
              >CHANGE TO PASSWORD</v-card-text
            >

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

              <v-btn
                class="changeBtn"
                small
                dark
                color="indigo"
                @click="changePasswd()"
                >Change
              </v-btn>
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
      showPassword: false,
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    changePasswd: function() {
      this.$axios
        .put(`./u/passwd`, {
          after_password: this.afterPassword,
          after_password_verify: this.afterPasswordVerify,
        })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Change Your Password",
              text: response.data.message,
            });
            location.href = "./profile";
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            Swal.fire({
              icon: "error",
              title: "Fail....",
              text: err.response.data.message,
            });
            location.replace="./changePassword"
          }else if (err.response.status === 403) {
            Swal.fire({
              icon: "error",
              title: "Sorry...",
              text: err.response.data.message
            })
          }
           location.replace="./changePassword"
        });
    },
  },
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
