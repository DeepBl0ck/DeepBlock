<template>
  <div>
    <v-app-bar app height="70px" color="white" elevate-on-scroll class="appbar-interval auto">
      <div>
        <span class="deep-font-size lightorange-color cursor-pointer" @click="goHome()">DEEP</span>
        <span class="block-font-size darkblue-color cursor-pointer block-font-bold">BLOCK</span>
      </div>
      <v-spacer />

      <template v-if="isLoggedin">
        <span
          class="projects-font color-hover cursor-pointer"
          @click="$router.push('/projectMain')"
          :class="this.$route.path=='/projectMain'?'highlight':''"
        >Projects</span>
        <span
          class="datasets-font color-hover cursor-pointer"
          @click="$router.push('/datasetMain')"
          :class="this.$route.path=='/datasetMain'?'highlight':''"
        >Datasets</span>
        <div class="beside-border">
          <popover :menu="menu" />
        </div>
      </template>

      <template v-else>
        <v-btn outlined class="darkblue-color" @click="$router.push('/login')">Login</v-btn>
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
    ...mapGetters("avatar", ["avatar"])
  }
};
</script>

<style lang="sass">
.appbar-interval
  padding-left: 50px
  padding-right: 50px
  
.deep-font-size, .block-font-size
  font-size: 32px

.block-font-bold
  font-weight: bold

.projects-font, .datasets-font
  padding-right: 15px
  font-weight: bold
  color: grey

.beside-border
  border-left: 2px solid 
  padding-left: 15px
</style>
