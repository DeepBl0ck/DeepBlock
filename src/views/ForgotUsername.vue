<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card icon max-width="400">
            <v-list-item-title style="font-size:1.5em; color: #7986CB;">
              <div style="padding-top: 10px; padding-bottom: 10px;">
                <v-icon large>mdi-view-headline</v-icon>DeepBlock
              </div>
            </v-list-item-title>
            <v-divider color="#3949AB"></v-divider>

            <v-card-text
              style="font-size:1.2em; color: #7986CB;padding-top: 50px;"
              >Find Username</v-card-text
            >

            <v-form style="padding: 30px 50px 20px 50px">
              <v-text-field
                id="email"
                label="Email"
                outlined
                dense
              ></v-text-field>
              <!-- <v-btn @click="submit" block dark color="indigo" >Send username email </v-btn> -->
              <v-btn @click="submit" block dark color="indigo"
                >Send Username email
              </v-btn>
              <v-layout
                justify-space-between
                class="rememberme"
                style="padding: 10px 0px 0px 0px;"
              >
                <span @click="$router.push({ name: 'Login' })"
                  >return to Login</span
                >
                <span @click="$router.push({ name: 'SignUp' })">Sign Up!</span>
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

<style>

span {
  font-size: 14px;
  color: black;
}
</style>
