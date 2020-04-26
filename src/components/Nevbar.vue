<template>
  <v-content>
    <v-navigation-drawer v-model="drawer" app clipped>
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

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title style="text-align:left;">Home</v-list-item-title>
        </v-list-item>

        <v-list-group prepend-icon="folder" value="true">
          <template v-slot:activator>
            <v-list-item-title style="text-align:left;">Projects</v-list-item-title>
          </template>

          <v-btn icon @click="addProject = !addProject">
            <v-icon>mdi-plus</v-icon>
            <v-list-item-title class="text-lowercase">add project</v-list-item-title>
          </v-btn>

          <!-- 조건문을 이용해 생성된 프로젝트 리스트 구현 -->
          <!-- <v-list-group no-action sub-group value="true">
          </v-list-group> -->
        </v-list-group>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>

          <v-list-item-title style="text-align:left;">Data</v-list-item-title>
        </v-list-item>

        <!-- <v-list-item
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
        </v-list-item> -->
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
      <v-spacer />
      <v-btn icon href="/home">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn color="white" outlined fab x-small dark href="/profile">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- 프로젝트 생성 폼 -->
    <v-dialog v-model="addProject" max-width="500px">
      <v-card>
        <v-card-text>
          <v-text-field
            label="Project Name"
            :rules="Rules"
            required
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="primary" @click="dialog = true">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
export default {
  name: "Nevbar",
  data() {
    return {
      drawer: false,
      // links: [
      //   { icon: "dashboard", text: "Home", route: "/home" },
      //   { icon: "person", text: "Login", route: "/login" },
      //   { icon: "folder", text: "Model", route: "/model" },
      //   { icon: "person", text: "SignUp", route: "/signUP" },
      // ],
      user: "Lucy",
      email: "khmin09015@gmail.com",
      addProject: false,
      Rules: [(v) => !!v || "The input is required"],
    };
  },
  methods: {
    listMove: function() {},
    checkNull: () => {
      console.log(this);
    },
  },
  computed: {
    // dialog: () => {
    //   if
    // }
  },
};
</script>
