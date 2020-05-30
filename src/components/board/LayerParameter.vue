<template>
  <v-list>
    <div class="parameter">
      <h2>Parameter Input</h2>
      <!-- TODO: Vuex layserState 변수 사용해서 각각의 레이어에 맞게  파라미터 값 나오게 하기-->
      <v-divider class="line" />
      <div class="inputParameter">
        <v-text>
          <b>KernelSize</b>
        </v-text>
        <v-text-field placeholder="ex) 5" />

        <v-text>
          <b>InputShape</b>
        </v-text>
        <v-text-field placeholder="ex) 28, 28, 1" />

        <v-text>
          <b>PoolingSize</b>
        </v-text>
        <v-text-field placeholder="ex) 28, 28" />

        <v-text>
          <b>Filter</b>
        </v-text>
        <v-text-field placeholder="ex) 16" />

        <v-text>
          <b>Stride</b>
        </v-text>
        <v-text-field placeholder="ex) 1" />

        <v-text>
          <b>Activation</b>
        </v-text>
        <v-text-field placeholder="ex) Relu" />

        <v-text>
          <b>KernelInitializer</b>
        </v-text>
        <v-text-field placeholder="ex) varianceScaling" />

        <v-text>
          <b>Units</b>
        </v-text>
        <v-text-field placeholder="ex) 10" />
      </div>
    </div>
  </v-list>
</template>

<script>
export default {
  name: "layerparameter",
  methods: {
    apply: function() {
      //apply input layer value
      // TODO: 입력된 파라미터값을 model params값에 넣게 하기
    },
    reset: function() {
      //reset input layer value
      // TODO: DOM에 입력된 파라미터값 초기화
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
  font-size: 13px

.line
  margin-bottom: 10px

.reset
  margin-left: 20px


</style>
