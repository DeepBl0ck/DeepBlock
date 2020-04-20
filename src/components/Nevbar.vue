<template>
  <nav>
    <v-toolbar dark flat app>
      <v-app-bar-nav-icon @click="drawer =! drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Deep</span>
        <span>Block</span>
      </v-toolbar-title>
      <v-layout column align-center>
        <v-flex class="user">
          <v-avatar size="100">
            <img src alt />
          </v-avatar>
        </v-flex>
      </v-layout>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" color="#546E7A" app clipped class="primary">
      <v-list nav>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-btn block>Logout</v-btn>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Nevbar",
  data() {
    return {
      drawer: false,
      links: [
        { icon: "dashboard", text: "Home", route: "/home" },
        { icon: "person", text: "Login", route: "/login" },
        { icon: "folder", text: "Model", route: "/model" },
        { icon: "person", text: "SignUp", route: "/signUP" },
      ],
    };
  },
  methods: {
    listMove : function() {

    }
  }
};
</script>