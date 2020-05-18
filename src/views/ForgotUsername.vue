<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card icon max-width="400">
            <v-list-item-title class="usernameTitle">
              <div class="usernameIconHeadline">
                <v-icon large>mdi-view-headline</v-icon>DeepBlock
              </div>
            </v-list-item-title>
            <v-divider color="#3949AB"></v-divider>

            <v-card-text class="usernameText" style="color: #3949AB;"
              >Find Username</v-card-text
            >
            <v-text
              class="userFindText"
              >Enter your email to send your username</v-text
            >

            <v-form class="usernameForm">
              <v-text-field
                id="email"
                label="Email"
                :rules="emailRules"
                outlined
                dense
              ></v-text-field>
              <v-btn @click="submit" block dark color="indigo"
                >Send email
              </v-btn>

              <v-layout
                justify-space-between
                class="usernameLinkLayout"
              >
                <span class="userLoginRouter" @click="$router.push({ name: 'Login' })"
                  >Return to login</span
                >
                <span class="userSignupRouter" @click="$router.push({ name: 'SignUp' })">Sign Up</span>
              </v-layout>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  }
};
</script>

<style lang="sass">
span:hover
  text-decoration: underline

.userLoginRouter
  font-size: 14px
  color: black

.userSignupRouter
  font-size: 14px
  color: black

.usernameTitle
  font-size:1.5em
  color: #3949AB

.usernameIconHeadline
  padding-top: 10px
  padding-bottom: 10px

.usernameText
  font-size:1.3em
  padding: 50px 0px 20px 0px

.userFindText
  font-size:0.97em
  padding-top: 5px

.usernameForm
  padding: 30px 50px 20px 50px

.usernameLinkLayout
  padding: 10px 0px 0px 0px
</style>
