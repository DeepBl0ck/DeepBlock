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

    <v-list-group v-for="(layername, i) in layersname" :key="i">
      <template v-slot:activator>
        <v-list-item-title @click="layername.show = !layername.show" style="font-size: 18px">
          <v-icon style="margin-right: 8%">mdi-layers</v-icon>
          {{ layername.name }}
        </v-list-item-title>
      </template>

      <div v-show="true">
        <draggable
          class="layers"
          :list="layers"
          :group="{ type: 'layer', pull: 'clone' }"
          :clone="cloneLayer"
        >
          <template v-for="(layer, i) in layers">
            <v-list-item
              v-if="layername.key === layer.key"
              class="layersList"
              :key="i"
              :group="{ type: 'key', put: false }"
              dense
              text-center
            >{{ layer.type }}</v-list-item>
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
    draggable
  },
  data() {
    return {
      show: "false",
      searchlayer: "",
      layers: [
        { key: "basic", type: "output", ID: "b0", params: {} },
        {
          key: "basic",
          type: "dense",
          ID: "",
          params: {
            units: "",
            activation: "",
            useBias: "",
            kernelInitializer: "",
            biasInitializer: "",
            inputDim: "",
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
            inputDType: ""
          }
        },
        {
          key: "basic",
          type: "dropout",
          ID: "",
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
            inputDType: ""
          }
        },
        {
          key: "basic",
          type: "embedding",
          ID: "",
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
            inputDType: ""
          }
        },
        {
          key: "basic",
          type: "flatten",
          ID: "",
          params: {
            dataFormat: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: ""
          }
        },
        {
          key: "basic",
          type: "permute",
          ID: "",
          params: {
            dims: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: ""
          }
        },
        {
          key: "basic",
          type: "repeatVector",
          ID: "",
          params: {
            n: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: ""
          }
        },
        {
          key: "basic",
          type: "reshape",
          ID: "",
          params: {
            targetShape: "",
            inputShape: "",
            batchInputShape: "",
            batchSize: "",
            dtype: "",
            name: "",
            trainable: "",
            weights: "",
            inputDType: ""
          }
        },
        {
          key: "basic",
          type: "spatialDropout1d",
          ID: "",
          params: {
            rate: "",
            seed: "",
            input_shape: "",
            batch_input_shape: "",
            batch_size: "",
            dtype: "",
            name: "",
            trainable: "",
            input_dtype: ""
          }
        },
        {
          key: "convol",
          type: "conv2d",
          ID: "",
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
            inputDType: ""
          }
        },
        {
          key: "nomalization",
          type: "batchNormalization",
          ID: "",
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
            inputDType: ""
          }
        },
        {
          key: "nomalization",
          type: "layerNormalization",
          ID: "",
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
            inputDType: ""
          }
        },
        {
          key: "pooling",
          type: "averagePooling2d",
          ID: "",
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
            inputDType: ""
          }
        },
        {
          key: "pooling",
          type: "maxPooling2d",
          ID: "",
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
            inputDType: ""
          }
        },
        {
          key: "inputs",
          type: "inputLayer",
          ID: "",
          params: {
            inputShape: "",
            batchSize: "",
            batchInputShape: "",
            dtype: "",
            sparse: "",
            name: ""
          }
        }
      ],
      layersname: [
        { show: true, key: "basic", name: "Basic" },
        { show: true, key: "convol", name: "Convolutional" },
        { show: true, key: "nomalization", name: "Nomalization" },
        { show: true, key: "pooling", name: "Pooling" },
        { show: true, key: "inputs", name: "Inputs" }
      ],
      layerCopy: []
    };
  },
  mounted() {
    this.layerCopy = [...this.layers];
  },
  methods: {
    cloneLayer: function({ key, type,ID, params }) {
      for (let layer of this.layers) {
        if (key === layer.key) {
          return {
            key: key,
            type: type,
            ID: ID,
            params: { ...params }
          };
        }
      }
    },
    search: function() {
      if (!this.searchlayer) {
        this.layers = this.layerCopy;
      }
      this.layers = this.layers.filter(layer => {
        return (
          layer.type.toLowerCase().indexOf(this.searchlayer.toLowerCase()) > -1
        );
      });
    }
  }
};
</script>

<style lang="sass">
h1
  color: black
  text-align: center

#searchbtn
  margin-top: 5%
  align: end

.layers
  padding-left: 45px

  
.layersList
  font-size: 16px

.searchBar
  padding: 2%
  margin-bottom: 2%
.block
  width: 50%
  font-size: 100%
  height: auto
  margin-left: 5%
</style>

