<template>
  <v-content class="text-left">
    <v-tabs v-model="tab" height="48px" background-color="#5A6D76" centered dark icons-and-text>
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="item in items" :key="item" @click="setCompoState(item)">
        {{
        item
        }}
      </v-tab>

      <v-tab-item>
        <board />
      </v-tab-item>
      <v-tab-item>
        <train />
      </v-tab-item>
      <v-tab-item>
        <evaluation />
      </v-tab-item>
    </v-tabs>
  </v-content>
</template>

<script>
import board from "@/components/board/Board";
import train from "@/components/board/Train";
import evaluation from "@/components/board/Evaluation";

export default {
  name: "Model",
  components: {
    board,
    train,
    evaluation
  },
  data() {
    return {
      tabs: [{ name: "board 1", lnk: "", id: "1" }],
      items: ["board", "train", "evaluation"],
      more: [{ name: "train" }, { name: "test" }],
      compo: this.$store.getters.getCompoState
    };
  },
  methods: {
    addTabs: function () {
      this.tabs.push({
        name: `board ${this.tabs.length + 1}`,
        lnk: "",
        id: `${this.tabs.length + 1}`
      });
    },
    addItem(item) {
      const removed = this.items.splice(0, 1);
      this.items.push(...this.more.splice(this.more.indexOf(item), 1));
      this.more.push(...removed);
      this.$nextTick(() => {
        this.currentItem = "tab-" + item;
      });
    },
    deleteTabs: function (tab) {
      this.tabs.splice(this.tabs.indexOf(tab), 1);
    },
    setCompoState: function (item) {
      this.$store.commit("setCompo", item);
    }
  },
  computed: {
    compoState() {
      return this.$store.getters.getCompoState;
    }
  }
};
</script>

<style lang="sass">
.plustabs
  margin-top: 8px
</style>
