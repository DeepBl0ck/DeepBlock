<template>
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
        <v-tab v-for="(tab, i) in tabs" :key="i">
          {{ tab.name }}
          <v-btn v-show="tab.deletable" class="closeTab" icon x-small @click="deleteTabs(tab)">
            <v-icon left size="small">mdi-close</v-icon>
          </v-btn>
        </v-tab>
        <v-btn class="plustabs" icon @click="addTab = true">
          <v-icon color="white">mdi-plus</v-icon>
        </v-btn>

        <v-tab-item v-for="(tab, i) in tabs" :key="i">
          <draggable class="model" :list="tab.model" :group="{ type: 'model', put: true }">
            <v-card
              v-model="model"
              class="modelblock"
              id="model"
              v-for="(element, i) in tab.model"
              :class="element.key"
              :key="i"
              @click="inputParameter(tab.model, element)"
            >
              {{ element.type }}
              <v-btn
                v-show="element.type!=='compile'"
                class="closeLayerBtn"
                icon
                @click="closeLayer(tab.model, element)"
              >
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </v-card>
          </draggable>
        </v-tab-item>
      </v-tabs>
      <v-row>
        <v-col cols="12" align="end">
          <v-btn class="saveBtn" fab rounded outlined color="#1B5E20" @click="saveLayer()">Save</v-btn>
          <v-btn class="resetBtn" fab rounded outlined color="#B71C1C" @click="layerReset()">Reset</v-btn>
        </v-col>
      </v-row>
    </v-row>
    <v-dialog v-model="addTab" :persistent="false" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Tab</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Tab Name *" v-model="tabName" required />
            </v-col>
          </v-row>
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
import draggable from "vuedraggable";
import { eventBus } from "../../main";
import Swal from "sweetalert2";

export default {
  name: "Block",
  components: {
    draggable
  },
  data: () => ({
    addTab: false,
    tabs: [
      {
        deletable: false,
        name: "board 1",
        id: "1",
        model: []
      }
    ],
    models: []
    //layers: []
  }),

  watch: {
    // tabs: function() {
    //   for(let tab of this.tabs){
    //     let model = tab.model;
    //     if(model.indexOf())
    //   }
    // }
  },

  methods: {
    addTabs: function() {
      this.tabs.push({
        deletable: true,
        name: this.tabName,
        id: `${this.tabs.length + 1}`,
        model: []
      });
      this.tabName = "";
      this.addTab = false;
    },

    deleteTabs: function(tab) {
      this.tabs.splice(this.tabs.indexOf(tab), 1);
    },
    cloneObject: function(obj) {
      return { ...obj };
    },
    saveLayer: function() {
      let layers = [];
      let totalLayer = [];
      //let models = [];
      for (let tab of this.tabs) {
        for (let layer of tab.model) {
          layers.push({
            key: layer.key,
            type: layer.type,
            ID: tab.model.indexOf(layer),
            params: Object.assign(layer.required, layer.advanced)
          });
        }
        totalLayer.push({
          total_layer: layers.length,
          layers: layers
        });
        layers = [];
      }
      //let compile = layers.splice(layers.map(x => x.type).indexOf("compile"));

      //TODO: 반복문 tab 처리

      let modelsObject = new Object();
      modelsObject.models = totalLayer;
      //modelsObject.compile = compile;

      const modelJson = JSON.stringify(modelsObject);
      console.log(modelJson);

      this.$axios
        .put(`./u/project/1/model`, { modelJson })
        .then(res => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              text: res.data.message
            });
          }
        })
        .catch(err => {
          let msg = "";
          let res = err.response;
          if (res.data.message) {
            msg = res.data.message;
          }
          Swal.fire({
            icon: "error",
            text: msg
          });
          this.$router.replace("/model");
        });
    },
    layerReset: function() {
      this.model = [
        {
          key: "basic",
          type: "output",
          ID: "",
          required: {
            loss: "",
            optimizer: ""
          },
          advanced: {}
        }
      ];
      this.models = [];
    },
    inputParameter: function(tabModel, layer) {
      let index = tabModel.indexOf(layer);
      eventBus.$emit("requiredParameter", tabModel[index].required);
      eventBus.$emit("advancedParameters", tabModel[index].advanced);
    },
    closeLayer: function(tabModel, element) {
      tabModel.splice(tabModel.indexOf(element), 1);
    },
    getDefaultName: function() {
      let index = 1;
      let defaultName = null;
      while (!defaultName) {
        for (let tab of this.tabs) {
          if (tab.name.indexOf(`board ${index}`) === -1) {
            defaultName = `board ${index}`;
          }
          if (tab.name.indexOf(`board ${index}`) !== -1) {
            defaultName = null;
            break;
          }
        }
        index += 1;
      }
      return defaultName;
    }
  }
};
</script>

<style lang="sass">
.tabbar
  height: 600px
  overflow-y: auto

h1
  color: black
  text-align: center

.resetBtn
  margin-left: 20px

.model
  width: 100%
  min-height: 500px
  background: white
  border-radius: 10px
  margin-top: 20px
  text-align: center

.block
  width: 50%
  font-size: 100%
  margin-top: 2%
  margin-bottom: 2%

.modelblock
  width: 50%
  font-size: 100%
  margin-bottom: 2%
  margin-left: 25%

#model.basic
  background: #BDBDBD
  border: 2px solid #5D5D5D
  font-weight: bold

#model.convol
  background: #E1BEE7
  border: 2px solid #AB47BC
  font-weight: bold

#model.nomalization
  background: #DCE775
  border: 2px solid #827717
  font-weight: bold

#model.pooling
  background: #B2DFDB
  border: 2px solid #26A69A

#model.inputs
  background: #FFA7A7
  border: 2px solid #980000
  font-weight: bold
</style>
