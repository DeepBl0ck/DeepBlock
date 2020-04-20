<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar dark flat>
              <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Deep</span>
                <span>Block</span>
              </v-toolbar-title>
              <v-toolbar-title slot="extension" class="white--text"
                >Create account</v-toolbar-title
              >
              <v-spacer />
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn icon large router="/signUp" target="_blank" v-on="on">
                    <i class="fas fa-sign-in-alt fa-2x" href="/signUp"></i>
                  </v-btn>
                </template>
                <span>Do you already have an account?</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="ID"
                  name="ID"
                  prepend-icon="person"
                  type="text"
                />

                <v-text-field
                  label="EMAIL"
                  name="Email"
                  prepend-icon="mail"
                  type="text"
                />

                <v-card-actions>
                  <v-spacer />
                  <v-btn dark depressed>Send</v-btn>
                </v-card-actions>
                <!-- 버튼 클릭시 인증 메소드 실행과 동시에 인증 입력필드 띄우기 -->

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                />

                <v-text-field
                  id="confirm"
                  label="Confirm"
                  name="confirm"
                  prepend-icon="lock"
                  type="password"
                />
              </v-form>
              <v-card-actions>
                <v-spacer />
                <v-btn dark depressed href="/home">LOGIN</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "SignUp",
};
</script>

<style scoped></style>
