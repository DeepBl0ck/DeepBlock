<template>
  <v-list class="parameter-list">
    <div class="parameter">
      <p class="param-title">Parameter Input</p>
      <v-divider class="line" />
      <p class="required-title">* indicates required field</p>

      <template class="layer-params" v-for="(pa, i) in requiredParams">
        <v-list :key="i">
          <v-row>
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
                    <v-btn v-bind="layerDescription" v-on="on" fab x-small icon>
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
              <!-- TODO: 코드 리팩토링 진행 할 것  -->
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
                :items="DataFormat"
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

          <template class="layer-params" v-for="(p, idx) in advancedParams">
            <v-list-item :key="idx">
              <v-row>
                <v-col cols="12" style="padding: 8px">
                  <!-- TODO: 코드 리팩토링 진행 할 것  -->
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
                    :items="DataFormat"
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
import parameterItem from "@/data/paramsItem.json";

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
      padding: parameterItem.padding,
      dataFormat: parameterItem.dataFormat,
      Constraint: parameterItem.Constraint,
      Initializer: parameterItem.Initializer,
      DType: parameterItem.DType,
      activation: parameterItem.activation,
      bool: parameterItem.bool,
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

<style lang="sass" scoped>
.parameter-list
  height: 700px
  overflow-y: auto

.parameter
  margin: 10px
  color: black

.param-title
  font-size: 20px
  font-weight: bold
  text-align: center

.line
  margin-bottom: 10px

.layer-params p
  font-size: 18px

.required-title
  font-size: 13px
  text-align: center
</style>
