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

            <!-- <v-card-text
              style="font-size:1.2em; color: #7986CB;padding-top: 50px;"
              >Create your account</v-card-text
            > -->

            <v-card-text
              style="font-size:1.2em; color: #7986CB;padding-top: 50px;"
              >CREATE YOUR ACCOUNT</v-card-text
            >

            <v-form style="padding: 40px 50px 30px 50px">
              <v-text-field
                id="username"
                label="Username"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                id="eamil"
                label="Email"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                id="apassword"
                label="Password"
                outlined
                dense
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-btn @click="submit" block dark color="indigo">Sign Up</v-btn>
            </v-form>
            <div style="padding-bottom: 10px">
              Already have an account? <a href="/login">Login!</a>
            </div>
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
      showPassword: false,
      password: 'Password',
    }
  }
};
</script>

<style>
.rememberme .v-label {
  font-size: 14px;
}
</style>
