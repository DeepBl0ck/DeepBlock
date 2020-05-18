<template>
  <v-navigation-drawer v-model="parameter" clipped right app color="#ECEFF1">
    <div class="parameter">
      <h2>Parameter Input</h2>
      <v-divider class="line"/>
      <div class="inputParameter">
        <p><b>KernelSize</b></p>
        <v-text-field placeholder="ex) 5" />
        <p><b>Filter</b></p>
        <v-text-field placeholder="ex) 16" />
        <p><b>Stride</b></p>
        <v-text-field placeholder="ex) 1" />
        <p><b>Activation</b></p>
        <v-text-field placeholder="ex) Relu"/>

      </div>
    </div>
    <v-col class="buttons" cols="12" align="center">
      <v-btn class="apply" rounded color="#81C784" @click="apply()" >Apply</v-btn>
      <v-btn class="reset" rounded color="#EF9A9A" @click="reset()">Reset</v-btn>
    </v-col>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "layerparameter",
  methods: {
    apply: function() {
      //apply input layer value
    },
    reset: function() {
      //reset input layer value
    }
  }
};
</script>

<style lang="sass">
.parameter
  margin: 10px

.parameter h2
  text-align: center
  margin: 10px
  color: black

.inputParameter
  font-size: 15px

.line
  margin-bottom: 10px

.reset
  margin-left: 20px


</style>
