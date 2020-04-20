<template>
  <v-app id="nevbar">
    <v-navigation-drawer v-model="drawer" app clipped dark>
      <v-list>
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
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Deep</span>
        <span>Block</span>
      </v-toolbar-title>
    </v-app-bar>
  </v-app>
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
    listMove: function() {},
  },
};
</script>
