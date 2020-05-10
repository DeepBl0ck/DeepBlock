<template>
  <v-content class="text-left">
    <v-tabs fixed-tabs background-color="indigo" dark>
      <v-tab to>
        <v-icon>mdi-console</v-icon>Board
      </v-tab>
    </v-tabs>
    <palette />
    <router-view />
  </v-content>
</template>

<script>
import palette from "@/components/Palette.vue";
export default {
  name: "Board",
  components: {
    palette
  }
};
</script>
