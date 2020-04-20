<template>
  <v-app id="signIn">
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
                  >Sign in</v-toolbar-title
                >
                <v-spacer/>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      router="/signUp"
                      target="_blank"
                      v-on="on"
                    >
                    <i class="fas fa-user-plus" href="/signUp"></i>
                    </v-btn>
                  </template>
                  <span>Add account</span>
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
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
                <v-card-actions>
                  <v-spacer />
                  <v-btn dark depressed href="/home">Sign in</v-btn>
              </v-card-actions>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  methods: {
    login: function() {

    },
    signUp: function() {
      
    } 
  },
};
</script>
