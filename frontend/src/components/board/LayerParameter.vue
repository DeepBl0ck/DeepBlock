<template>
  <v-list class="parameter-list">
    <div class="parameter">
      <p class="param-title">Parameter Input</p>
      <v-divider class="line" />
      <p class="required-title">* indicates required field</p>

      <template class="layer-params" v-for="(pa, i) in requiredParams">
        <v-list :key="i">
          <v-row>
            <v-col cols="12" style="padding: 8px;">
              <p style="margin-bottom: 0px;">
                {{ pa }} *
                <v-tooltip right color="blue" min-width="20px" max-width="300px">
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
              <v-text-field v-if="checkType(pa) === 'number'" v-model.number="required[pa]" :rules="[rules.required, rules.numberRules]" dense solo />
              <v-select v-else-if="checkType(pa) === 'select'" :items="params[state[pa]]" v-model="required[pa]" outlined dense />
              <v-text-field v-else v-model="required[pa]" dense solo />
              <v-divider />
            </v-col>
          </v-row>
        </v-list>
      </template>

      <v-list v-show="show">
        <v-list-group>
          <template v-slot:activator>
            <v-icon style="margin-right: 8%;">mdi-selection</v-icon>
            <v-list-item-title>Advanced</v-list-item-title>
          </template>

          <template class="layer-params" v-for="(p, idx) in advancedParams">
            <v-list-item :key="idx">
              <v-row>
                <v-col cols="12" style="padding: 8px;">
                  <p style="margin-bottom: 0px;">
                    {{ p }}
                    <v-tooltip right color="blue" min-width="20px" max-width="300px">
                      <template v-slot:activator="{ on, layerDescription }">
                        <v-btn v-bind="layerDescription" v-on="on" fab x-small icon>
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
                  <v-text-field v-if="checkType(p) === 'number'" v-model.number="advanced[p]" :rules="rules.numberRules" dense solo />
                  <v-select v-else-if="checkType(p) === 'select'" :items="params[state[p]]" v-model="advanced[p]" outlined dense />
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
import parameterList from "@/data/parameter.json";

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

      params: parameterItem.params,

      state: {
        activation: "activation",
        padding: "padding",
        kernelInitializer: "Initializer",
        biasInitializer: "Initializer",
        embeddingsInitializer: "Initializer",
        kernelConstraint: "Constraint",
        biasConstraint: "Constraint",
        embeddingsConstraint: "Constraint",
        inputDType: "DType",
        dtype: "DType",
        dataFormat: "DataFormat",
        trainable: "bool",
        useBias: "bool",
        maskZero: "bool",
        normalize: "bool",
        center: "bool",
      },

      seletList: parameterList.inputSelect,
      numberList: parameterList.inputNumber,
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
  methods: {
    checkType: function (p) {
      if (this.seletList.indexOf(p) !== -1) return "select";
      else if (this.numberList.indexOf(p) !== -1) return "number";
      else return "str";
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
