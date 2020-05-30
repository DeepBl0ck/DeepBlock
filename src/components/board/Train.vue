<template>
  <v-container>
    <v-row class="chart">
      <v-col cols="12" align="end">
        <!-- TODO: Train 되었을 경우 나오는 view 컴포넌트 -->
        <h1>Train Learning Chart</h1>
        <v-btn
          class="goTest"
          id="resultBtn"
          fab
          rounded
          outlined
          color="#1B5E20"
          @click="layerTrain()"
        >Test</v-btn>
        <!-- <v-btn
          class="goBoard"
          id="goBoard"
          fab
          rounded
          outlined
          color="#B71C1C"
          @click="resetLayer()"
        >Board</v-btn>-->
        <chart />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import chart from "@/components/chart/Chart.vue";
export default {
  name: "chartView",
  components: {
    chart
  },
  methods: {}
};
</script>

<style lang="sass">
.chart h1
  text-align: center
.goBoard
  margin-left: 20px</style
>>
