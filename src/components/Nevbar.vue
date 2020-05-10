<template>
  <v-content>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-col cols="200">
          <v-list-item>
            <v-list-item-avatar size="50" two-line>
              <v-img src="../assets/lucy.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="font-size:18px;text-align:left;padding-bottom:5px">{{
                user
              }}</v-list-item-title>
              <v-list-item-subtitle style=" font-size:12px;text-align:left">{{
                email
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>

        <v-divider></v-divider>

          <v-list-item v-for="item in items" :key="item.text" :href="item.href">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title style="text-align:left">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-btn block>Logout</v-btn>
      </template>
    </v-navigation-drawer>

        <!-- <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text">BASiL</h1>
      </v-card-title>
  
      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab
          v-for="item in items"
          :key="item"
          :href="item.href"
        >
          {{item.text}}
        </v-tab>
      </v-tabs>
  
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item"
        >
          <v-card
            color="basil"
            flat
          >
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card> -->

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="text-uppercase grey--text">
        <div>
          <v-btn text x-large href="/"> DeepBlock</v-btn>
        </div>
      </v-toolbar-title>
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
      items: [
        { icon: "home", text: "Home", href: "/" },
        { icon: "folder", text: "Projects", href: "/projects" },
        { icon: "layers", text: "DataSet"},
      ],
      user: "Lucy",
      email: "khmin09015@gmail.com",
      addProject: false,
      Rules: [(v) => !!v || "The input is required"],
      routeUrl: true,
    };
  },
};
</script>
