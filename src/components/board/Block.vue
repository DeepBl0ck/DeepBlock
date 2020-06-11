<template>
  <draggable class="model" :list="model" :group="{ type: 'model', put: true }">
    <v-card
      v-model="model"
      class="modelblock"
      id="model"
      v-for="(element, i) in model"
      :class="element.key"
      :key="i"
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
        @click="saveLayer()"
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
import Swal from "sweetalert2";

export default {
  name: "Block",
  components: {
    draggable,
  },
  data: () => ({
    model: [{
          key: "basic",
          type: "output",
          ID: "",
          params: {
            loss: "",
            optimizer: "",
          },
        }],
    models: [],
  }),
  methods: {
    saveLayer: function() {
      let compile;
      for (let model of this.model) {
        model.ID = this.model.indexOf(model);

        if (model.type === "output") {
          compile = model.params;
        }
      }

      let outputFind = this.model.findIndex(function(model) {
        return model.type === "output";
      });

      this.model.splice(outputFind, outputFind);

      let layers = this.model;
      let total_layer = this.model.length;

      this.models.push({
        total_layer: total_layer,
        layers: layers
      });

      let modelsLayer = this.models;

      const modelObject = new Object();
      modelObject.models = modelsLayer;
      modelObject.compile = compile;

      var models = JSON.stringify(modelObject);
      console.log(models);

      this.$axios
        .put(`./u/project/1/model`, { models })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              text: res.data.message,
            });
            this.model=[];
            this.models=[];
          }
        })
        .catch((err) => {
          let msg = "";
          let res = err.response;
          if (res.data.message) {
            msg = res.data.message;
          }
          Swal.fire({
            icon: "error",
            text: msg,
          });
          this.$router.replace("/model");
        });
    },
    layerReset: function() {
      this.model = [];
      this.models=[];
    },
    inputParameter: function(layer) {
      const index = this.model.indexOf(layer);
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
