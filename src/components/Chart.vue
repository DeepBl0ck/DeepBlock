<template>
  <v-container fluid>
    <h2>Chart Page</h2>
    <canvas id="chart" width="500" height="500"/>
  </v-container>
</template>

<script>
import Chart from "chart.js";
import chartScript from "@/script/ChartScript.js";

export default {
  name: 'chart',
  data() {
    return {
      chartScript: chartScript
    };
  },
  methods: {
    createChart: function(chartId, chartScript) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartScript.type,
        data: chartScript.data,
        options: chartScript.options
      });
    },
    // updateChart: function(chartId, chartScript){

    // }
  },
  mounted() {
    this.createChart('chart', this.chartScript);
  }
};
</script>


<style lang="sass">

</style>