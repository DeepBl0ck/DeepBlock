<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="forgotForm" icon max-width="400">
            <v-list-item-title class="passwordTitle">
              <div class="passwordIconHeadline">
                <v-icon large>mdi-view-headline</v-icon>DeepBlock
              </div>
            </v-list-item-title>
            <v-divider color="#3949AB"></v-divider>

            <v-card-text class="passwordText" style="color: #3949AB;"
              >PASSWORD RECOVER</v-card-text
            >
            <v-text class="findPasswordText"
              >Enter your email to reset your password</v-text
            >

            <v-form class="passwordForm">
              <v-text-field
                id="email"
                label="Email"
                outlined
                dense
              ></v-text-field>
              <v-btn @click="submit" block dark color="indigo"
                >Send email
              </v-btn>
              <v-layout justify-space-between class="passwordLinkLayout">
                <span @click="$router.push({ name: 'Login' })"
                  >Return to login</span
                >
                <span @click="$router.push({ name: 'SignUp' })">Sign Up</span>
              </v-layout>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {};
</script>

<style lang="sass">
.forgotForm
  height: 80%
  width: 95%

.passwordTitle
  font-size:1.5em
  color: #3949AB

.passwordIconHeadline
  padding-top: 10px
  padding-bottom: 10px

.passwordText
  font-size:1.3em
  padding: 50px 0px 20px 0px

.findPasswordText
  font-size:0.97em
  padding-top: 5px

.passwordForm
  padding: 30px 50px 20px 50px

.passwordLinkLayout
  padding: 10px 0px 0px 0px
</style>
