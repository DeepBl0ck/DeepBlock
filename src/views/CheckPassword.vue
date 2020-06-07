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

            <v-card-text class="accountInfo">
              <h3>{{ userName }}</h3>
              <div class="emailbox">
                <v-avatar class="avatarBox" size="23">
                  <img src="../assets/lucy.jpg" alt />
                </v-avatar>
                {{ email }}
              </div>
              <p class="infoTitle">본인임을 인증하시오.</p>
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
                @click="$router.push({ name: 'ForgotPassword' })"
              >Did you forget your password?</span>
              <v-btn class="nextBtn" small dark color="indigo" @click="checkPassword()">Next</v-btn>
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
      userName: "Lucyhopy",
      email: "kmn0010@gmail.com",
      password_verify: "",
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    checkPassword: function() {
      this.$axios
        .post(`./u/checkpasswd`, {
          password_verify: this.passwordVerify
        })
        .then(response => {
          if (response.status === 200) {
            location.href = "./changePassword";
          }
        })
        .catch(err => {
          let msg = "";
          if (err.response.data.message) {
            msg = err.response.data.message;
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
