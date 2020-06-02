<template>
  <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
    <template>
      <v-btn outlined>User</v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img src="../assets/lucy.jpg" alt />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
            <v-list-item-subtitle>Founder of Vuetify.js</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list v-for="account in accounts" :key="account">
        <v-list-item>
          <v-list-item-action>
            <v-icon>{{ account.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title style="text-align:left">
              {{
              account.text
              }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      accounts: [
        { text: "비밀번호 변경", icon: "mdi - lock" },
        { text: "로그아웃", icon: "mdi - logout" }
      ]
    };
  }
};
</script>