<template>
  <v-container>
    <v-row>
      <v-tabs class="tab-bar" background-color="#aacfd0" color="#000000" dark show-arrows center-active dense height="48px">
        <v-tabs-slider color="#263238" />
        <v-tab v-for="(tab, i) in tabs" :key="i">
          {{ tab.name }}
          <v-btn v-show="tab.deletable" icon @click="deleteTabs(tab)">
            <v-icon size="medium">mdi-close</v-icon>
          </v-btn>
        </v-tab>
        <div class="add-tab-btn">
          <v-btn icon @click="addTab = true">
            <v-icon color="white">mdi-plus</v-icon>
          </v-btn>
        </div>

        <v-tab-item v-for="(tab, i) in tabs" :key="i">
          <draggable class="model" :list="tab.model" :group="{ type: 'model', put: true }">
            <v-card v-model="model" class="model-block" id="model" v-for="(element, i) in tab.model" :class="element.key" :key="i" @click="inputParameter(tab.model, element)">
              {{ element.type }}
              <v-btn v-show="element.type !== 'compile'" icon @click="closeLayer(tab.model, element)">
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </v-card>
          </draggable>
        </v-tab-item>
      </v-tabs>
      <v-row>
        <v-col cols="12" align="end">
          <v-btn fab rounded outlined color="#1B5E20" @click="saveLayer()">Save</v-btn>
          <v-btn class="reset-btn" fab rounded outlined color="#B71C1C" @click="layerReset()">Reset</v-btn>
        </v-col>
      </v-row>
    </v-row>
    <v-dialog v-model="addTab" :persistent="false" max-width="600px">
      <v-card>
        <v-card-title>
          <span>Add Tab</span>
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
import swal from "@/util/swal";
import model from "@/service/model";

export default {
  name: "Board",
  components: {
    draggable,
  },
  props: {
    pID: String,
  },
  data: () => ({
    addTab: false,
    tabs: [],
    models: [],
    model: null,
    tabName: null,
  }),
  created() {
    model
      .loadModel(this.pID)
      .then((res) => {
        let reqModel = JSON.parse(res.data);

        for (let model of reqModel.models) {
          this.tabs.push({
            deletable: true,
            name: model.tabName,
            id: `${this.tabs.length + 1}`,
            model: model.layers,
          });
        }
      })
      .catch(() => {
        this.tabs.push({
          deletable: true,
          name: "board 1",
          id: "1",
          model: [],
        });
      });
  },
  methods: {
    addTabs: function() {
      this.tabs.push({
        deletable: true,
        name: this.tabName,
        id: `${this.tabs.length + 1}`,
        model: [],
      });
      this.tabName = "";
      this.addTab = false;
    },

    deleteTabs: function(tab) {
      this.tabs.splice(this.tabs.indexOf(tab), 1);
    },
    saveLayer: function() {
      let layers = [];
      let totalLayer = [];
      for (let tab of this.tabs) {
        for (let layer of tab.model) {
          layers.push({
            key: layer.key,
            type: layer.type,
            ID: tab.model.indexOf(layer),
            required: layer.required,
            advanced: layer.advanced,
          });
        }
        totalLayer.push({
          tabName: tab.name,
          total_layer: layers.length,
          layers: layers,
        });
        layers = [];
      }

      let modelsObject = new Object();
      modelsObject.models = totalLayer;

      const modelJson = JSON.stringify(modelsObject);

      model
        .saveModel(this.pID, { modelJson })
        .then((res) => {
          swal.success(res.data.message);
        })
        .catch((err) => {
          swal.error(err.response.data.message);
          this.$router.push("/model");
        });
    },
    layerReset: function() {
      for (let tab of this.tabs) {
        tab.model = [];
      }
    },

    inputParameter: function(tabModel, layer) {
      let index = tabModel.indexOf(layer);
      eventBus.$emit("requiredParameter", tabModel[index].required);
      eventBus.$emit("advancedParameters", tabModel[index].advanced);
    },

    closeLayer: function(tabModel, element) {
      tabModel.splice(tabModel.indexOf(element), 1);
    },
  },
};
</script>

<style lang="sass" scoped>
.tab-bar
  height: 600px
  overflow-y: auto

.reset-btn
  margin-left: 20px

.add-tab-btn
  padding-top: 7px

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

.model-block
  width: 50%
  font-size: 100%
  margin-bottom: 2%
  margin-left: 25%

#model.basic
  background: #324b73
  border: 2px solid #F0E5DE
  font-weight: bold

#model.convol
  background: #6d819c
  border: 2px solid #F0E5DE
  font-weight: bold

#model.nomalization
  background: #e4e7ec
  border: 2px solid #F0E5DE
  font-weight: bold

#model.pooling
  background: #55967e
  border: 2px solid #F0E5DE
  font-weight: bold

#model.inputs
  background: #C5E99B
  border: 2px solid #F0E5DE
  font-weight: bold
  aacfd0
</style>
