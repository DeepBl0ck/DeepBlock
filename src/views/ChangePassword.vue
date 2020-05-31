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
                id="Password"
                class="passwordField"
                label="Password"  
                :rules="passwordRules"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>

              <v-text-field
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
                @click="$router.push({ name: 'Profile' })"
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
export default {
  data() {
    return {
      showPassword: false,
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
    };
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