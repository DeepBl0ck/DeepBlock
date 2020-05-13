<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="deleteForm" icon max-width="400">
            <v-list-item-title class="accountTitle">
              <div class="accountIconHeadline">
                <v-icon large>mdi-view-headline</v-icon>DeepBlock
              </div>
            </v-list-item-title>
            <v-divider color="#3949AB" />

            <v-card-text class="accountText" style="color: #3949AB;"
              >Delete Account</v-card-text
            >
            <v-text class="deleteAccountText"
              >Are you really delete account?</v-text
            >

            <v-form class="accountForm">
              <v-text-field
                id="email"
                label="Email"
                outlined
                dense
              ></v-text-field>
              <v-btn @click="submit" block dark color="indigo" href="/completeDeleteAccount"
                >Send Email</v-btn
              >
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
  font-size:1.3em
  padding: 50px 0px 20px 0px

.deleteAccountText
  font-size:0.97em
  padding-top: 5px

.accountForm
  padding: 30px 50px 20px 50px
</style>
