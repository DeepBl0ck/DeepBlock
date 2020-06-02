<template>
  <div class="text-center">
    <v-menu v-model="menu" offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <v-avatar size="27" v-on="on">
          <v-img src="../assets/lucy.jpg" style="cursor:pointer"></v-img>
        </v-avatar>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="../assets/lucy.jpg" alt="lucy" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Lucy</v-list-item-title>
              <v-list-item-subtitle>khmin09015@gmail.com</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Boolean
    }
  },
  data() {
    return {
      fav: true,
      items: [
        { title: "Click Me1" },
        { title: "Click Me1" },
        { title: "Click Me1" },
        { title: "Click Me1" }
      ]
    };
  }
};
</script>

<style>
</style>