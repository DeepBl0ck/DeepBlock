<template>
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
                <v-tab v-for="tabs in tabs" :key="tabs.name" :href="tabs.lnk">
                  {{ tabs.name }}
                  <v-btn
                    class="closeTab"
                    icon
                    x-small
                    @click="deleteTabs(tabs)"
                  >
                    <v-icon left size="small">mdi-close</v-icon>
                  </v-btn>
                </v-tab>
              <v-btn class="plustabs" icon @click="addTab = true">
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

    <v-dialog v-model="addTab" :persistent="false" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Tab</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Tab Name *" v-model="tabName" required />
              </v-col>
            </v-row>
          </v-container>
          <small>* indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="indigo" text @click="addTab = false">Close</v-btn>
          <v-btn @click="addTabs()" color="indigo darken-1" text>Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import block from "@/components/board/Block";
import palette from "@/components/board/Palette";
import parameter from "@/components/board/LayerParameter";

export default {
  name: "Board",
  components: {
    block,
    palette,
    parameter,
  },
  data() {
    return {
      draggable: false,
      addTab: false,
      tabs: [{ name: "board 1", lnk: "", id: "1" }],
      mousefunction: {
        type: Function,
      },
    };
  },
  methods: {
    addTabs: function() {
      this.tabs.push({
        name: this.tabName,
        lnk: "",
        id: `${this.tabs.length + 1}`,
      });
      this.addTab = false;
    },
    deleteTabs: function(tab) {
      this.tabs.splice(this.tabs.indexOf(tab), 1);
    },
  },
};
</script>
