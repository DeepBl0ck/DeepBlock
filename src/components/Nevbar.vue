<template>
  <v-content>
    <v-navigation-drawer v-model="drawer" app clipped v-if="isLoggedin">
      <v-list nav>
        <v-col cols="auto">
          <v-list-item>
            <v-list-item-avatar size="50" two-line>
              <v-img :src="avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="font-size:1.2em;text-align:left">{{ username }}</v-list-item-title>
              <v-list-item-subtitle style=" font-size:0.8em;text-align:left">{{ email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>

        <v-divider />

        <template v-for="item in items">
          <v-list-item :key="item.text" @click="$router.push(item.route)">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title style="text-align:left">{{item.text}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- appbar -->
    <v-app-bar dense app clipped-left clipped-right>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <a style="text-decoration: none" @click="$router.push('/')">
        <v-toolbar-title class="text-uppercase grey--text">
          <div>DeepBlock</div>
        </v-toolbar-title>
      </a>
      <v-spacer />

      <!-- if logged in -->
      <template v-if="isLoggedin">
        <v-btn icon @click="$router.push('/')">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn icon href="/profile" @click="$router.push({ name: 'profile' })">
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn icon href="/model" @click="$router.push({ name: 'model' })">
          <v-icon>settings</v-icon>
        </v-btn>
        <popover :menu="menu" />
      </template>

      <!-- not logged in -->
      <template v-else>
        <v-btn outlined href="/login" style="margin-left:10px">Login</v-btn>
      </template>
    </v-app-bar>

    <v-dialog v-model="addProject" max-width="500px">
      <v-card>
        <v-card-text>
          <v-text-field label="Project Name" :rules="Rules" required></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="primary" @click="dialog=true">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
// import Swal from "sweetalert2";
import ProfilePopoverMenu from "@/components/ProfilePopoverMenu";
export default {
  components: {
    popover: ProfilePopoverMenu
  },
  name: "Nevbar",
  data() {
    return {
      menu: false,
      drawer: false,
      items: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "mdi-database", text: "Projects", route: "/projectMain" },
        { icon: "mdi-database", text: "Dataset", route: "/datasetMain" },
        {
          icon: "layers",
          text: "Model",
          route: "/model"
        }
      ],
      addProject: false,
      Rules: [v => !!v || "The input is required"],
      routeUrl: true
    };
  },
  methods: {
    gohome: function () { },
  },
  computed: {
    ...mapGetters("auth", ["isLoggedin", "username", "email"]),
    ...mapGetters("avatar", ["avatar"])
  }
};
</script>

<style lang="sass">
#nav
  padding: 30px


#nav a
  font-weight: bold
  color: #2c3e50


#nav a.router-link-exact-active
  color: #42b983
</style>
