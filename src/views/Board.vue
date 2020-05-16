<template>
  <v-content class="text-left">
    <v-tabs class="tabbar" align-with-title background-color="#B0BEC5" dark>
      <v-tabs-slider color="#263238"/>
      <v-tab to>
        <v-icon>mdi-console</v-icon>Board
      </v-tab>
    </v-tabs>
    <palette/>
    <parameter/>
    <router-view/>
  </v-content>
</template>

<script>
import palette from "@/components/Palette.vue";
import parameter from "@/components/LayerParameter.vue"
export default {
  name: "Board",
  components: {
    palette,
    parameter
  }
};
</script>

<style lang="sass">
.tabbar
  font-color: black
</style>