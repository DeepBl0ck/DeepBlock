<template>
  <v-container>
    <v-row>
      <v-col cols="12">
          <canvas id="chart" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "chart.js";
import chartScript from "@/script/ChartScript.js";

export default {
  name: "chart",
  data() {
    return {
      chartScript: chartScript,
    };
  },
  methods: {
    createChart: function(chartId, chartScript) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartScript.type,
        data: chartScript.data,
        options: chartScript.options,
      });
    },
  },
  mounted() {
    this.createChart("chart", this.chartScript);
  },
};
</script>

<style lang="sass">

</style>
