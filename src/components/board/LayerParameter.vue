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
                <v-tooltip
                  right
                  color="blue"
                  min-width="20px"
                  max-width="300px"
                >
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
                v-else-if="
                  pa === 'trainable' ||
                    pa === 'useBias' ||
                    pa === 'maskZero' ||
                    pa === 'normalize' ||
                    pa === 'center'
                "
                :items="bool"
                v-model="required[pa]"
                outlined
                dense
              />
              <v-text-field
                v-else-if="
                  pa === 'units' ||
                    pa === 'inputDim' ||
                    pa === 'batchSize' ||
                    pa === 'rate' ||
                    pa === 'inputShape' ||
                    pa === 'batchInputShape' ||
                    pa === 'seed' ||
                    pa === 'outputDim' ||
                    pa === 'inputLength' ||
                    pa === 'dims' ||
                    pa === 'n' ||
                    pa === 'targetShape' ||
                    pa === 'input_shape' ||
                    pa === 'inputLength' ||
                    pa === 'batch_input_shape' ||
                    pa === 'batch_size' ||
                    pa === 'filters' ||
                    pa === 'poolSize' ||
                    pa === 'kernelSize' ||
                    pa === 'strides' ||
                    pa === 'dilationRate' ||
                    pa === 'axis' ||
                    pa === 'momentum' ||
                    pa === 'epsilon'
                "
                v-model.number="required[pa]"
                :rules="[rules.required, rules.numberRules]"
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
            <v-list-item-title>Advanced</v-list-item-title>
          </template>

          <template class="layerParams" v-for="(p, idx) in advancedParams">
            <v-list-item :key="idx">
              <v-row class="paramsName">
                <v-col cols="12" style="padding: 8px">
                  <p style="margin-bottom: 0px">
                    {{ p }}
                    <v-tooltip
                      right
                      color="blue"
                      min-width="20px"
                      max-width="300px"
                    >
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
                    v-else-if="
                      p === 'trainable' ||
                        p === 'useBias' ||
                        p === 'maskZero' ||
                        p === 'normalize' ||
                        p === 'center'
                    "
                    :items="bool"
                    v-model="advanced[p]"
                    outlined
                    dense
                  />
                  <v-text-field
                    v-else-if="
                      p === 'units' ||
                        p === 'inputDim' ||
                        p === 'batchSize' ||
                        p === 'rate' ||
                        p === 'inputShape' ||
                        p === 'batchInputShape' ||
                        p === 'seed' ||
                        p === 'outputDim' ||
                        p === 'inputLength' ||
                        p === 'dims' ||
                        p === 'n' ||
                        p === 'targetShape' ||
                        p === 'input_shape' ||
                        p === 'inputLength' ||
                        p === 'batch_input_shape' ||
                        p === 'batch_size' ||
                        p === 'poolSize' ||
                        p === 'filters' ||
                        p === 'kernelSize' ||
                        p === 'strides' ||
                        p === 'dilationRate' ||
                        p === 'axis' ||
                        p === 'momentum' ||
                        p === 'epsilon'
                    "
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
import paramExplan from "@/data/paramExplanation.json";

export default {
  name: "layerparameter",
  created() {
    eventBus.$on("requiredParameter", (required) => {
      this.required = required;
    });
    eventBus.$on("advancedParameters", (advanced) => {
      this.advanced = advanced;
      if (Object.keys(this.advanced).length === 0) {
        this.show = false;
      } else {
        this.show = true;
      }
    });
    console.log(paramExplan.explanation[1]);
  },
  data() {
    return {
      rules: {
        required: (v) => !!v || "Required Input.",
        numberRules: (v) => /[0-9]/.test(v) || "You can only enter numbers.",
      },
      required: {},
      advanced: {},
      show: false,
      explanation: paramExplan.explanation,
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
        "zeros",
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
        "tanh",
      ],
      bool: [true, false],
    };
  },
  computed: {
    requiredParams() {
      return Object.keys(this.required);
    },
    advancedParams() {
      return Object.keys(this.advanced);
    },
  },
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
