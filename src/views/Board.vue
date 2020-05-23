<template>
  <v-content class="text-left">
    <v-tabs
      class="tabbar"
      background-color="#B0BEC5"
      color="#000000"
      dark
      show-arrows
      center-active
    >
      <v-tabs-slider color="#263238" />
      <v-tab
        v-for="tabs in tabs"
        :key="tabs.name"
        :href="tabs.lnk"
        @click="renameTitle(tabs.id)"
      >
        {{ tabs.name }}
        <v-btn class="closeTab" icon x-small @click="deleteTabs(tabs)">
          <v-icon size="small">mdi-close</v-icon>
        </v-btn>
      </v-tab>
      <v-divider vertical style="color: #000000" />
      <v-btn class="plustabs" icon @click="addTabs">
        <v-icon color="white">mdi-plus</v-icon>
      </v-btn>
    </v-tabs>
    <block />
    <chart />
    <palette />
    <parameter />
  </v-content>
</template>

<script>
import palette from "@/components/Palette.vue";
import parameter from "@/components/LayerParameter.vue";
import block from "@/components/Block.vue";
import chart from "@/components/Chart.vue"

export default {
  name: "Board",
  components: {
    palette,
    parameter,
    block,
    chart
  },
  data() {
    return {
      tabs: [{ name: "board 1", lnk: "", id: '1' }],
    };
  },
  methods: {
    addTabs: function() {
      this.tabs.push({
        name: `board ${this.tabs.length + 1}`,
        lnk: "",
        id: `${this.tabs.length + 1}`,
      });
    },
    deleteTabs: function(tab) {
        this.tabs.splice(this.tabs.indexOf(tab), 1)
    },
    renameTitle: function(tabs) {
      console.log(tabs);
    },
  },
};
</script>

<style lang="sass">
.plustabs
  margin-top: 8px
</style>
