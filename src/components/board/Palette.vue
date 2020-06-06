<template>
  <v-list nav rounded elevation dense expand>
    <v-list-item>
      <v-list-item-content class="searchBar">
        <v-text-field
          v-model="searchlayer"
          placeholder="search"
          prepend-inner-icon="mdi-magnify"
          @input="search"
        />
      </v-list-item-content>
    </v-list-item>

    <v-list-group v-for="layername in layersname" :key="layername.name">
      <template v-slot:activator>
        <v-list-item-title
          class="layerName"
          @click="layername.show = !layername.show"
        >
          <v-icon style="margin-right: 8%">mdi-layers</v-icon>
          {{ layername.name }}
        </v-list-item-title>
      </template>

      <!-- TODO: 글자 크기 및 중앙 처리 -->
      <div v-show="true">
        <draggable :list="layers" :group="{ type: 'layer', pull: 'clone' }">
          <template v-for="(layer, i) in layers">
            <v-list-item
              v-if="layername.key === layer.key"
              class="layersList"
              :key="i"
              :group="{ type: 'key', put: false }"
              dense
              text-center
              >{{ layer.type }}</v-list-item
            >
          </template>
        </draggable>
      </div>
    </v-list-group>
  </v-list>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "palette",
  components: {
    draggable,
  },
  data() {
    return {
      show: "false",
      searchlayer: "",
      layers: [
        { key: "basic", type: "output", ID: "b0", params: {} },
        {
          key: "basic",
          type: "dropout",
          ID: "b1",
          params: {
            rate: "",
            noiseShape: "",
            seed: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: "",
          },
        },
        {
          key: "basic",
          type: "embedding",
          ID: "b2",
          params: {
            inputDim: "",
            outputDim: "",
            embeddingInitializer: "",
            embeddingsRegularizer: "",
            activityRegularizer: "",
            embeddingsConstraint: "",
            maskZero: "",
            inputLength: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: "",
          },
        },
        {
          key: "basic",
          type: "flatten",
          ID: "b3",
          params: {
            dataFormat: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: "",
          },
        },
        {
          key: "basic",
          type: "permute",
          ID: "b4",
          params: {
            dims: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: "",
          },
        },
        {
          key: "basic",
          type: "repeatVector",
          ID: "b5",
          params: {
            n: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: "",
          },
        },
        {
          key: "basic",
          type: "reshape",
          ID: "b6",
          params: {
            targetShape: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: "",
          },
        },
        {
          key: "basic",
          type: "spatialDropout1d",
          ID: "b7",
          params: {
            rate: "",
            seed: "",
            input_shape: "",
            batch_input_shape: "",
            batch_size: "",
            dtype: "",
            name: "",
            trainable: "",
            input_dtype: "",
          },
        },
        {
          key: "convol",
          type: "conv2d",
          ID: "c0",
          params: {
            filters: "",
            kernelSize: "",
            strides: "",
            padding: "",
            dataFormat: "",
            dilationRate: "",
            activation: "",
            useBias: "",
            kernelInitializer: "",
            biasInitializer: "",
            kernelConstraint: "",
            biasConstraint: "",
            kernelRegularizer: "",
            biasRegularizer: "",
            activityRegularizer: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: "",
          },
        },
        {
          key: "nomalization",
          type: "batchNormalization",
          ID: "n0",
          params: {
            axis: "",
            momentum: "",
            epsilon: "",
            center: "",
            scale: "",
            betaInitializer: "",
            gammaInitializer: "",
            movingMeanInitializer: "",
            movingVarianceInitializer: "",
            betaConstraint: "",
            gammaConstraint: "",
            betaRegularizer: "",
            gammaRegularizer: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: "",
          },
        },
        {
          key: "nomalization",
          type: "layerNormalization",
          ID: "n1",
          params: {
            axis: "",
            epsilon: "",
            center: "",
            scale: "",
            betaInitializer: "",
            gammaInitializer: "",
            betaRegularizer: "",
            gammaRegularizer: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: "",
          },
        },
        {
          key: "pooling",
          type: "averagePooling2d",
          ID: "p0",
          params: {
            poolSize: "",
            strides: "",
            padding: "",
            dataFormat: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: "",
          },
        },
        {
          key: "pooling",
          type: "maxPooling2d",
          ID: "p1",
          params: {
            poolSize: "",
            strides: "",
            padding: "",
            dataFormat: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: "",
          },
        },
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
      ],
      layersname: [
        { show: true, key: "basic", name: "Basic" },
        { show: true, key: "convol", name: "Convolutional" },
        { show: true, key: "nomalization", name: "Nomalization" },
        { show: true, key: "pooling", name: "Pooling" },
        { show: true, key: "inputs", name: "Inputs" },
      ],
      layerCopy: [],
    };
  },
  mounted() {
    this.layerCopy = [...this.layers];
  },
  methods: {
    search: function() {
      if (!this.searchlayer) {
        this.layers = this.layerCopy;
      }
      this.layers = this.layers.filter((layer) => {
        return (
          layer.type.toLowerCase().indexOf(this.searchlayer.toLowerCase()) > -1
        );
      });
    },
  },
};
</script>

<style lang="sass">
h1
  color: black
  text-align: center
#searchbtn
  margin-top: 5%
  align: end
.layersList
  font-size: 15px
.searchBar
  padding: 2%
  margin-bottom: 2%
.block
  width: 50%
  font-size: 100%
  height: auto
  margin-left: 5%
</style>
