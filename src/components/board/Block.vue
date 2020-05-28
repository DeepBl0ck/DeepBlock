<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <draggable
          class="model"
          :list="model"
          :group="{ type: 'model', put: true }"
        >
          <v-card
            v-model="model"
            class="modelblock"
            id="model"
            v-for="element in model"
            :class="element.key"
            :key="element.ID"
            @click="inputParameter()"
          >
            {{ element.type }}
            <v-btn class="closeLayerBtn" icon @click="closeLayer(element)">
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </v-card>
        </draggable>
      </v-col>

      <v-col cols="12" align="end">
        <div class="resultBtn" id="resultBtn">
          <v-btn fab rounded outlined color="#1B5E20" @click="layerTrain()"
            >Train</v-btn
          >
        </div>
        <div class="resetBtn" id="rsetBtn">
          <v-btn fab rounded outlined color="#B71C1C" @click="resetLayer()"
            >Reset</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
import { apiserver } from "@/views/apiserver.js";
import axios from "axios";

export default {
  name: "Block",
  components: {
    draggable,
  },
  data: () => ({
    model: [
      { key: "inputs", type: "inputLayer", ID: "i0", params: {} },
      { key: "basic", type: "output", ID: "b0", params: {} },
    ],
  }),
  methods: {
    layerTrain: function() {
      const data = JSON.stringify(this.model);
      console.log(data);
      axios
        .put(
          `${apiserver}/u/projects/4/model`,
          { dataset_name: data },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          console.log("Start Train");
          //TODO : 학습 완료시 Chart 그래프 나오게 하기
        })
        .catch((err) => {
          console.log(err);
          alert("train 실패");
        });
    },
    resetLayer: function() {
      this.model = [
        { key: "inputs", type: "inputLayer", ID: "i0", params: {} },
        { key: "basic", type: "output", ID: "b0", params: {} },
      ];
    },
    inputParameter: function() {
      this.$store.commit('inputParameter', this.model[1].type)
      // console.log(this.type)
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

.model
  position: absolute
  width: 88%
  min-height: 250px
  background: white
  border-radius: 10px
  margin-top: 20px
  text-align: center

.resultBtn,
.resetBtn
  margin: 20px

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

#model.activation
  background: #FFB2D9
  border: 2px solid #D9418C
  font-weight: bold

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
