<template>
  <v-content class="text-left">
    <v-tabs class="tabbar" background-color="#B0BEC5" dark show-arrows>
      <v-tabs-slider color="#263238"/>
      <v-tab v-for="tabs in tabs" :key="tabs.name" :href="tabs.lnk">
        <v-icon>{{ tabs.icon }}</v-icon> {{ tabs.name }}
      </v-tab>
      <v-btn class="plustabs" icon @click="addTabs">
        <v-icon color="white">mdi-plus</v-icon>
      </v-btn>
    </v-tabs>
    <block/>
    <palette />
    <parameter />
  </v-content>
</template>

<script>
import palette from "@/components/Palette.vue";
import parameter from "@/components/LayerParameter.vue";
import block from "@/components/Block.vue";

export default {
  name: "Board",
  components: {
    palette,
    parameter,
    block
  },
  data() {
    return {
      tabs: [{name: "Board", lnk: "/board/0" }],
    };
  },
  methods: {
    addTabs: function() {
      this.tabs.push({
        name: "test",
        lnk: ""
      });
    },
    renameTitle: function() {
      // 탭바 이름 변경 메소드
    },
  },
};
</script>

<style lang="sass">
.plustabs
  margin-top: 8px
</style>
