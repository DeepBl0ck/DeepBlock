<template>
  <v-content>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list nav>
        <v-col cols="auto">
          <v-list-item>
            <v-list-item-avatar size="50" two-line>
              <v-img src="../assets/lucy.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="font-size:1.2em;text-align:left">
                {{
                user
                }}
              </v-list-item-title>
              <v-list-item-subtitle style=" font-size:0.8em;text-align:left">
                {{
                email
                }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>

        <v-divider />

        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            prepend-icon="folder"
            :append-icon="item.model ? item.icon : item['icon-alt']"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title style="text-align:left">{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon"></v-list-item-action>
              <v-list-item-content>
                <v-list-item-title style="text-align:left" @click="addProject = !addProject">
                  <v-icon mall>{{ child.icon }}</v-icon>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item v-else :key="item.text" :href="item.route">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title style="text-align:left">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <template v-slot:append>
        <v-btn block>Logout</v-btn>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left clipped-right flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <a href="/" style="text-decoration: none">
        <v-toolbar-title class="text-uppercase grey--text">
          <div>DeepBlock</div>
        </v-toolbar-title>
      </a>
      <v-spacer />

      <v-btn icon href="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon href="/profile">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn outlined href="/login" style="margin-left:10px">Login</v-btn>
    </v-app-bar>

    <div id="app2"></div>

    <v-dialog v-model="addProject" max-width="500px">
      <v-card>
        <v-card-text>
          <v-text-field label="Project Name" :rules="Rules" required></v-text-field>
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
      items: [
        { icon: "home", text: "Home", route: "/" },
        // {
        //   icon: "keyboard_arrow_up",
        //   "icon-alt": "keyboard_arrow_down",
        //   text: "Projects",
        //   route: "/login",
        //   model: true,
        //   children: [{ icon: "add", text: "add project" }]
        // },
        { icon: "mdi-database", text: "Projects", route: "/datasetMain" },
        { icon: "mdi-database", text: "Dataset", route: "/datasetMain" },
        {
          icon: "layers",
          text: "Board",
          route: "/board"
        },
      ],
      user: "Lucy",
      email: "khmin09015@gmail.com",
      addProject: false,
      Rules: [v => !!v || "The input is required"],
      routeUrl: true
    };
  },
  methods: {
    gohome: function() {}
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
