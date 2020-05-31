<template>
  <v-content class="text-left">
    <v-tabs
      class="tabbar"
      background-color="#B0BEC5"
      color="#000000"
      dark
      show-arrows
      center-active
      height="48px"
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
      <v-btn class="plustabs" icon @click="addTabs">
        <v-icon color="white">mdi-plus</v-icon>
      </v-btn>
    </v-tabs>


<!-- TODO: Vuex 사용해서 상태에 따라 board / Train / Evaluation 화면 뜨게 하기 -->
<!-- Vuex에 있는 CompoState 변수 사용 -->
    <!-- <template v-if="store.status.name == board"> -->
      <block />
    <!-- </template> -->

    <!-- <template v-if="store.status.name == train">
      <train />
    </template> -->

    <!-- <template v-if="store.status.name == evalutation"> -->
      <!-- <evaluation /> -->
    <!-- </template> -->

    <palette />
    <parameter />
  </v-content>
</template>

<script>
import palette from "@/components/board/Palette";
import parameter from "@/components/board/LayerParameter";
import block from "@/components/board/Block";
// import train from "@/components/board/Train";
// import evaluation from "@/components/board/Evaluation"

export default {
  name: "Board",
  components: {
    palette,
    parameter,
    block,
    // train,
    // evaluation
  },
  data() {
    return {
      tabs: [{ name: "board 1", lnk: "", id: "1" }],
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
      this.tabs.splice(this.tabs.indexOf(tab), 1);
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
