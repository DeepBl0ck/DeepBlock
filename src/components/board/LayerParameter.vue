<template>
  <v-list class="parameterList">
    <div class="parameter">
      <h2>Parameter Input</h2>
      <v-divider class="line" />
      <span>* indicates required field</span>

      <template class="layerParams" v-for="(pa, i) in requiredParams">
        <v-list :key="i">
          <v-row class="paramsName">
            <v-col cols="12" style="padding: 8px">
              <p style="margin-bottom: 0px">
                {{ pa }} *
                <v-tooltip right color="blue" min-width="20px" max-width="300px">
                  <template v-slot:activator="{ on, layerDescription }">
                    <v-btn
                      class="layerDescription"
                      v-bind="layerDescription"
                      v-on="on"
                      fab
                      x-small
                      icon
                    >
                      <v-icon>mdi-exclamation</v-icon>
                    </v-btn>
                  </template>
                  <div v-for="(explan, index) in explanation" :key="index">
                    <span v-if="pa === explan.param">{{ explan.explan }}</span>
                  </div>
                </v-tooltip>
              </p>
            </v-col>
            <v-col cols="12">
              <v-select
                v-if="pa === 'activation'"
                :items="activation"
                v-model="required[pa]"
                outlined
                dense
              />
              <v-select
                v-else-if="pa === 'padding'"
                :items="padding"
                v-model="required[pa]"
                outlined
                dense
              />
              <v-select
                v-else-if="
                  pa === 'kernelInitializer' ||
                    pa === 'biasInitializer' ||
                    pa === 'embeddingsInitializer'
                "
                :items="Initializer"
                v-model="required[pa]"
                outlined
                dense
              />
              <v-select
                v-else-if="
                  pa === 'kernelConstraint' ||
                    pa === 'biasConstraint' ||
                    pa === 'embeddingsConstraint'
                "
                :items="Constraint"
                v-model="required[pa]"
                outlined
                dense
              />
              <v-select
                v-else-if="pa === 'inputDType' || pa === 'dtype'"
                :items="DType"
                v-model="required[pa]"
                outlined
                dense
              />
              <v-select
                v-else-if="pa === 'dataFormat'"
                :items="DType"
                v-model="required[pa]"
                outlined
                dense
              />
              <v-select
                v-else-if="pa === 'trainable' || pa === 'useBias' || pa === 'maskZero'|| pa === 'normalize'|| pa === 'center'"
                :items="bool"
                v-model="required[pa]"
                outlined
                dense
              />
              <v-text-field
                v-else-if="pa==='units' || pa==='inputDim' || pa==='batchSize'|| pa==='rate'|| pa==='inputShape'|| pa==='batchInputShape'|| pa==='seed'|| pa==='outputDim'|| pa==='inputLength'|| pa==='dims'|| pa==='n'|| pa==='targetShape'|| pa==='input_shape'|| pa==='inputLength'|| pa==='batch_input_shape'|| pa==='batch_size' || pa==='filters'|| pa==='kernelSize'|| pa==='strides'|| pa==='dilationRate'|| pa==='axis'|| pa==='momentum'|| pa==='epsilon'"
                v-model.number="required[pa]"
                :rules="[rules.required,rules.numberRules]"
                dense
                solo
              />
              <v-text-field v-else v-model="required[pa]" dense solo />
              <v-divider />
            </v-col>
          </v-row>
        </v-list>
      </template>

      <v-list v-show="show">
        <v-list-group>
          <template v-slot:activator>
            <v-icon style="margin-right: 8%">mdi-selection</v-icon>
            <v-list-item-title :key="index">Advanced</v-list-item-title>
          </template>

          <template class="layerParams" v-for="(p, idx) in advancedParams">
            <v-list-item :key="idx">
              <v-row class="paramsName">
                <v-col cols="12" style="padding: 8px">
                  <p style="margin-bottom: 0px">
                    {{ p }}
                    <v-tooltip right color="blue" min-width="20px" max-width="300px">
                      <template v-slot:activator="{ on, layerDescription }">
                        <v-btn
                          class="layerDescription"
                          v-bind="layerDescription"
                          v-on="on"
                          fab
                          x-small
                          icon
                        >
                          <v-icon>mdi-exclamation</v-icon>
                        </v-btn>
                      </template>
                      <div v-for="(exp, e) in explanation" :key="e">
                        <span v-if="p === exp.param">{{ exp.explan }}</span>
                      </div>
                    </v-tooltip>
                  </p>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-if="p === 'activation'"
                    :items="activation"
                    v-model="advanced[p]"
                    outlined
                    dense
                  />
                  <v-select
                    v-else-if="p === 'padding'"
                    :items="padding"
                    v-model="advanced[p]"
                    outlined
                    dense
                  />
                  <v-select
                    v-else-if="
                      p === 'kernelInitializer' ||
                        p === 'biasInitializer' ||
                        p === 'embeddingsInitializer'
                    "
                    :items="Initializer"
                    v-model="advanced[p]"
                    outlined
                    dense
                  />
                  <v-select
                    v-else-if="
                      p === 'kernelConstraint' ||
                        p === 'biasConstraint' ||
                        p === 'embeddingsConstraint'
                    "
                    :items="Constraint"
                    v-model="advanced[p]"
                    outlined
                    dense
                  />
                  <v-select
                    v-else-if="p === 'inputDType' || p === 'dtype'"
                    :items="DType"
                    v-model="advanced[p]"
                    outlined
                    dense
                  />
                  <v-select
                    v-else-if="p === 'dataFormat'"
                    :items="DType"
                    v-model="advanced[p]"
                    outlined
                    dense
                  />
                  <v-select
                    v-else-if="p === 'trainable' || p === 'useBias' || p === 'maskZero'|| p === 'normalize'|| p === 'center'"
                    :items="bool"
                    v-model="advanced[p]"
                    outlined
                    dense
                  />
                  <v-text-field
                    v-else-if="p ==='units' || p ==='inputDim' || p ==='batchSize'|| p ==='rate'|| p ==='inputShape'|| p ==='batchInputShape'|| p ==='seed'|| p ==='outputDim'|| p ==='inputLength'|| p ==='dims'|| p ==='n'|| p ==='targetShape'|| p ==='input_shape'|| p ==='inputLength'|| p ==='batch_input_shape'|| p ==='batch_size' || p ==='filters'|| p ==='kernelSize'|| p ==='strides'|| p ==='dilationRate'|| p ==='axis'|| p ==='momentum'|| p ==='epsilon'"
                    v-model.number="advanced[p]"
                    :rules="rules.numberRules"
                    dense
                    solo
                  />
                  <v-text-field v-else v-model="advanced[p]" dense solo />
                  <v-divider />
                </v-col>
              </v-row>
            </v-list-item>
          </template>
        </v-list-group>
      </v-list>
    </div>
  </v-list>
</template>

<script>
import { eventBus } from "../../main";

export default {
  name: "layerparameter",
  created() {
    eventBus.$on("requiredParameter", required => {
      this.required = required;
    });
    eventBus.$on("advancedParameters", advanced => {
      this.advanced = advanced;
      if (Object.keys(this.advanced).length === 0) {
        this.show = false;
      } else {
        this.show = true;
      }
    });
  },
  data() {
    return {
      rules: {
        required: v => !!v || "Required Input.",
        numberRules: v => /[0-9]/.test(v) || "You can only enter numbers."
      },
      required: {},
      advanced: {},
      show: false,
      explanation: [
        {
          param: "inputShape",
          explan:
            "If defined, will be used to create an input layer to insert before this layer. If both inputShape and batchInputShape are defined, batchInputShape will be used. This argument is only applicable to input layers (the first layer of a model)."
        },
        {
          param: "units",
          explan: "Positive integer, dimensionality of the output space."
        },
        {
          param: "activation",
          explan:
            "Activation function to use. If unspecified, no activation is applied."
        },
        {
          param: "useBias",
          explan: "Whether to apply a bias."
        },
        {
          param: "kernelInitializer",
          explan: "Initializer for the dense kernel weights matrix."
        },
        {
          param: "biasInitializer",
          explan: "Initializer for the bias vector."
        },
        {
          param: "inputDim",
          explan: "If specified, defines inputShape as [inputDim]."
        },
        {
          param: "kernelConstraint",
          explan: "Constraint for the kernel weights."
        },
        {
          param: "biasConstraint",
          explan: "Constraint for the bias vector."
        },
        {
          param: "kernelRegularizer",
          explan:
            "Regularizer function applied to the dense kernel weights matrix."
        },
        {
          param: "biasRegularizer",
          explan: "Regularizer function applied to the bias vector."
        },
        {
          param: "activityRegularizer",
          explan: "Regularizer function applied to the activation."
        },
        {
          param: "batchInputShape",
          explan:
            "If defined, will be used to create an input layer to insert before this layer. If both inputShape and batchInputShape are defined, batchInputShape will be used. This argument is only applicable to input layers (the first layer of a model)."
        },
        {
          param: "batchSize",
          explan:
            "If inputShape is specified and batchInputShape is not specified, batchSize is used to construct the batchInputShape: [batchSize, ...inputShape]"
        },
        {
          param: "dtype",
          explan:
            "The data-type for this layer. Defaults to 'float32'. This argument is only applicable to input layers (the first layer of a model)."
        },
        {
          param: "name",
          explan: "Name for this layer"
        },
        {
          param: "trainable",
          explan:
            "Whether the weights of this layer are updatable by fit. Defaults to true."
        },
        {
          param: "inputDType",
          explan: "Legacy support. Do not use for new code."
        },
        {
          param: "rate",
          explan: "Float between 0 and 1. Fraction of the input units to drop."
        },
        {
          param: "noiseShape",
          explan:
            "Integer array representing the shape of the binary dropout mask that will be multiplied with the input."
        },
        {
          param: "seed",
          explan: "An integer to use as random seed."
        },
        {
          param: "outputDim",
          explan: "Integer >= 0. Dimension of the dense embedding."
        },
        {
          param: "embeddingsInitializer",
          explan: "Initializer for the embeddings matrix."
        },
        {
          param: "embeddingsRegularizer",
          explan: "Regularizer function applied to the embeddings matrix."
        },
        {
          param: "activityRegularizer",
          explan: "Regularizer function applied to the activation."
        },
        {
          param: "embeddingsConstraint",
          explan: "Constraint function applied to the embeddings matrix."
        },
        {
          param: "maskZero",
          explan:
            "Whether the input value 0 is a special 'padding' value that should be masked out. This is useful when using recurrent layers which may take variable length input."
        },
        {
          param: "inputLength",
          explan: "Length of input sequences, when it is constant."
        },
        {
          param: "dataFormat",
          explan: "Image data format: channeLast (default) or channelFirst."
        },
        {
          param: "dims",
          explan:
            "Array of integers. Permutation pattern. Does not include the sample (batch) dimension. Index starts at 1. For instance, [2, 1] permutes the first and second dimensions of the input."
        },
        {
          param: "n",
          explan: "The integer number of times to repeat the input."
        },
        {
          param: "targetShape",
          explan: "The target shape. Does not include the batch axis."
        },
        {
          param: "filters",
          explan:
            "The dimensionality of the output space (i.e. the number of filters in the convolution)."
        },
        {
          param: "kernelSize",
          explan:
            "The dimensions of the convolution window. If kernelSize is a number, the convolutional window will be square."
        },
        {
          param: "strides",
          explan:
            "The strides of the convolution in each dimension. If strides is a number, strides in both dimensions are equal."
        },
        {
          param: "padding",
          explan: "Padding mode."
        },
        {
          param: "dilationRate",
          explan:
            "The dilation rate to use for the dilated convolution in each dimension. Should be an integer or array of two or three integers."
        },
        {
          param: "axis",
          explan:
            "The integer axis that should be normalized (typically the features axis). Defaults to -1."
        },
        {
          param: "momentum",
          explan: "Momentum of the moving average. Defaults to 0.99."
        },
        {
          param: "epsilon",
          explan:
            "Small float added to the variance to avoid dividing by zero. Defaults to 1e-3."
        },
        {
          param: "center",
          explan:
            "If true, add offset of beta to normalized tensor. If false, beta is ignored. Defaults to true."
        },
        {
          param: "scale",
          explan:
            "If true, multiply by gamma. If false, gamma is not used. When the next layer is linear (also e.g. nn.relu), this can be disabled since the scaling will be done by the next layer. Defaults to true."
        },
        {
          param: "betaInitializer",
          explan: "Initializer for the beta weight. Defaults to 'zeros'."
        },
        {
          param: "gammaInitializer",
          explan: "Initializer for the gamma weight. Defaults to ones."
        },
        {
          param: "movingMeanInitializer",
          explan: "Initializer for the moving mean. Defaults to zeros"
        },
        {
          param: "movingVarianceInitializer",
          explan: "Initializer for the moving variance. Defaults to 'Ones'."
        },
        {
          param: "betaConstraint",
          explan: "Constraint for the beta weight"
        },
        {
          param: "gammaConstraint",
          explan: "Constraint for gamma weight."
        },
        {
          param: "betaRegularizer",
          explan: "Regularizer for the beta weight."
        },
        {
          param: "gammaRegularizer",
          explan: "Regularizer for the gamma weight."
        },
        {
          param: "poolSize",
          explan: "Size of the window to pool over, should be an integer."
        },
        {
          param: "sparse",
          explan: "Whether the placeholder created is meant to be sparse."
        },
        {
          param: "optimizer",
          explan:
            "The Optimizer base class provides methods to compute gradients for a loss and apply gradients to variables. A collection of subclasses implement classic optimization algorithms such as GradientDescent and Adagrad."
        },
        {
          param: "loss",
          explan:
            "Loss functions is to compute the quantity that a model should seek to minimize during training."
        }
      ],
      padding: ["valid", "same", "causal"],
      dataFormat: ["channelsFirst", "channelsLast"],
      Constraint: ["maxNorm", "minMaxNorm", "nonNeg", "unitNorm"],
      Initializer: [
        "constant",
        "glorotNormal",
        "glorotUniform",
        "heNormal",
        "heUniform",
        "identity",
        "leCunNormal",
        "leCunUniform",
        "ones",
        "orthogonal",
        "randomNormal",
        "randomUniform",
        "truncatedNormal",
        "varianceScaling",
        "zeros"
      ],
      DType: ["float32", "int32", "bool", "complex64"],
      activation: [
        "elu",
        "hardSigmoid",
        "linear",
        "relu",
        "relu6",
        "selu",
        "sigmoid",
        "softmax",
        "softplus",
        "softsign",
        "tanh"
      ],
      bool: [true, false]
    };
  },
  computed: {
    requiredParams() {
      return Object.keys(this.required);
    },
    advancedParams() {
      return Object.keys(this.advanced);
    }
  }
};
</script>

<style lang="sass">
.parameterList
  height: 700px
  overflow-y: auto

.apply_button
  text-align: center

.parameter
  margin: 10px

.parameter h2 p
  text-align: center
  margin: 10px
  color: black

.parameter span
  font-size: 13px

.layerParams p
  font-size: 18px

.line
  margin-bottom: 10px
</style>
