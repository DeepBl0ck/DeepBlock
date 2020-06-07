<template>
  <v-list>
    <div class="parameter">
      <h2>Parameter Input</h2>
      <v-divider class="line" />
      <v-list>
        <template class="layerParams" v-for="(p, i) in getParameters">
          <v-list-item :key="i">
            <v-row class="paramsName">
              <v-col cols="6">
                <p>{{ p }}</p>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="params[p]" dense solo />
              </v-col>
            </v-row>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </v-list>
</template>

<script>
import { eventBus } from "../../main";

export default {
  name: "layerparameter",
  created() {
    eventBus.$on("inputParameter", (params) => {
      this.params = params;
    });
  },
  data() {
    return {
      params: {},
    };
  },
  computed: {
    getParameters() {
      return Object.keys(this.params);
    },
  },
};
</script>

<style lang="sass">
.apply_button
  text-align: center

.parameter
  margin: 10px

.parameter h2
  text-align: center
  margin: 10px
  color: black

.layerParams p
  font-size: 18px

.paramsName
  text-align: center

.line
  margin-bottom: 10px
</style>
