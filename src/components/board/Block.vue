<template>
  <draggable class="model" :list="model" :group="{ type: 'model', put: true }">
    <v-card
      v-model="model"
      class="modelblock"
      id="model"
      v-for="element in model"
      :class="element.key"
      :key="element.ID"
      @click="inputParameter(element)"
    >
      {{ element.type }}
      <v-btn class="closeLayerBtn" icon @click="closeLayer(element)">
        <v-icon small>mdi-close</v-icon>
      </v-btn>
    </v-card>

    <v-col cols="12" align="end">
      <v-btn
        class="saveBtn"
        fab
        rounded
        outlined
        color="#1B5E20"
        @click="layerSave()"
        >Save</v-btn
      >
      <v-btn
        class="resetBtn"
        fab
        rounded
        outlined
        color="#B71C1C"
        @click="layerReset()"
        >Reset</v-btn
      >
    </v-col>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import { eventBus } from "../../main";

export default {
  name: "Block",
  components: {
    draggable,
  },
  data: () => ({
    model: [
      {
        key: "inputs",
        type: "inputLayer",
        ID: "i0",
        params: {
          inputShape: "",
          batchSize: "",
          batchInputShape: "",
          dtype: "",
          sparse: "",
          name: "",
        },
      },
      { key: "basic", type: "output", ID: "b0", params: {} },
    ],
  }),
  methods: {
    layerSave: function() {
      const layer = JSON.stringify(this.model);
      console.log(layer);
    },
    layerReset: function() {
      this.model = [
        {
          key: "inputs",
          type: "inputLayer",
          ID: "i0",
          params: {
            inputShape: "",
            batchSize: "",
            batchInputShape: "",
            dtype: "",
            sparse: "",
            name: "",
          },
        },
        { key: "basic", type: "output", ID: "b0", params: {} },
      ];
    },
    inputParameter: function(element) {
      var index = this.model.indexOf(element);
      eventBus.$emit("inputParameter", this.model[index].params);
    },
    closeLayer: function(element) {
      this.model.splice(this.model.indexOf(element), 1);
    },
  },
};
</script>

<style lang="sass">
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
  font-weight: bold

#model.inputs
  background: #FFA7A7
  border: 2px solid #980000
  font-weight: bold
</style>
