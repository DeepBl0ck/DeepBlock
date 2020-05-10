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

            <v-card-text style="font-size:1.2em; color: #7986CB;padding-top: 50px;">Delete Account</v-card-text>

            <v-form style="padding: 30px 50px 20px 50px">
              <v-text style="font-size:1.0em;font-weight: bold;">Are you really delete account?</v-text>
              <v-text-field id="password" label="Password" outlined dense style="padding-top: 15px"></v-text-field>
              <!-- <v-btn @click="submit" block dark color="indigo" >DeleteAccount</v-btn> -->
              <v-btn
                @click="deleteAccount = !deleteAccount"
                block
                dark
                color="indigo"
                style="text-transform: none;"
                href="./completeDeleteAccount"
              >DeleteAccount</v-btn>
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
      deleteAccount: false
    };
  },
  methods: {}
};
</script>

<style>
.rememberme .v-label {
  font-size: 14px;
}
</style>
