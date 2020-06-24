<template>
  <div>
    <v-app-bar app height="70px" color="white" elevate-on-scroll class="appbar-interval auto">
      <div class="logo">
        <span class="logo-deep pointer" @click="goHome()">DEEP</span>
        <span class="logo-block pointer">BLOCK</span>
      </div>
      <v-spacer />
      <span
        class="app-item font-hover pointer"
        @click="$router.push('/projectMain')"
        :class="this.$route.path=='/projectMain'?'highlight':''"
      >Projects</span>
      <span
        class="app-item font-hover pointer"
        @click="$router.push('/datasetMain')"
        :class="this.$route.path=='/datasetMain'?'highlight':''"
      >Datasets</span>

      <div class="item-border">
        <template v-if="isLoggedin">
          <popover :menu="menu" />
        </template>

        <template v-else>
          <v-btn outlined color="#1e5f8d" @click="$router.push('/login')">Login</v-btn>
        </template>
      </div>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
        { icon: "layers", text: "Model", route: "/model" }
      ],
      addProject: false,
      Rules: [v => !!v || "The input is required"],
      routeUrl: true
    };
  },
  methods: {
    goHome: function() {
      this.$router.push("/").catch(err => {
        if (err.name !== "NavigationDuplicated") throw err;
      });
    },
    goProfile() {
      this.$router.push("/profile").catch(err => {
        if (err.name !== "NavigationDuplicated") throw err;
      });
    },
    goSetting() {
      this.$router.push("/model").catch(err => {
        if (err.name !== "NavigationDuplicated") throw err;
      });
    }
  },
  computed: {
    ...mapGetters("auth", ["isLoggedin", "username", "email"]),
    ...mapGetters("avatar", ["avatar"]),
  },
};
</script>

<style lang="sass">
.profile
  text-align: left

  .username
    font-size: 1.2em

  .email
    font-size: 0.8em

#nav
  padding: 30px

#nav a
  font-weight: bold
  color: #2c3e50

#nav a.router-link-exact-active
  color: #42b983

.appbar-interval
  padding-left: 50px
  padding-right: 50px
  
.logo-deep
  font-size: 32px
  color: green

.logo-block
  font-size: 32px
  font-weight: bold
  color: #1e5f8d

.app-item
  padding-right: 15px
  font-weight: bold
  color: grey

.font-hover
  &:hover
    color: #1e5f8d

.highlight
    color: #1e5f8d

.item-border
  border-left: 2px solid #1e5f8d
  padding-left: 15px

.pointer
  cursor: pointer
</style>
