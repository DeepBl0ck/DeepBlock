<template>
  <v-content class="text-left">
    <v-card>
      <v-tabs v-model="tab" height="48px" background-color="#5A6D76" centered dark icons-and-text>
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="item in items" :key="item" @click="setCompoState(item)">{{ item }}</v-tab>

        <v-tab-item v-model="tab">
          <v-container>
            <v-row>
              <v-col cols="2">
                <palette />
              </v-col>
              <v-col dense cols="8">
                <v-container>
                  <v-row>
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
                          <v-icon left size="small">mdi-close</v-icon>
                        </v-btn>
                      </v-tab>
                      <v-btn class="plustabs" icon @click="addTabs">
                        <v-icon color="white">mdi-plus</v-icon>
                      </v-btn>
                    </v-tabs>
                  </v-row>
                  <v-row dense justify="center">
                    <block />
                  </v-row>
                </v-container>
              </v-col>
              <v-col cols="2">
                <parameter />
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <train />
        </v-tab-item>
        <v-tab-item>
          <evaluation />
        </v-tab-item>
      </v-tabs>
      <!-- <v-tab-item v-model="tab">
        <template>
          <v-tab-item v-for="item in items" :key="item"></v-tab-item>
        </template>
      </v-tab-item>-->
    </v-card>
  </v-content>
</template>

<script>
import block from "@/components/board/Block";
import train from "@/components/board/Train";
import evaluation from "@/components/board/Evaluation";
import palette from "@/components/board/Palette";
import parameter from "@/components/board/LayerParameter";

export default {
  name: "Board",
  components: {
    block,
    train,
    evaluation,
    palette,
    parameter
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
    addTabs: function() {
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
    deleteTabs: function(tab) {
      this.tabs.splice(this.tabs.indexOf(tab), 1);
    },
    renameTitle: function(tabs) {
      console.log(tabs);
    },
    setCompoState: function(item) {
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
