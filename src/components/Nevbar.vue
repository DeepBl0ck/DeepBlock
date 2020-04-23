<template>
  <v-content>
    <v-navigation-drawer v-model="drawer" app clipped dark>
      <v-list>
        <v-list-item>
          <v-list-item-avatar two-line>
            <v-img src="../assets/lucy.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user }}</v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        
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

      <template v-slot:append>
        <div>
          <v-btn block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Deep</span>
        <span>Block</span>
      </v-toolbar-title>
    </v-app-bar>
  </v-content>
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
      user : 'Lucy',
      email: 'khmin09015@gmail.com'
    };
  },
  methods: {
    listMove: function() {},
  },
};
</script>
