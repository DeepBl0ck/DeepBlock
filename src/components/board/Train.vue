<template>
  <v-container>
    <v-row class="chart">
      <v-col cols="6" align="end">
          <v-card class="chartCard">
            <chartjs-line
              :labels="labels1"
              :data="dataset1"
              :bind="true"
            ></chartjs-line>
          </v-card>
      
          <v-card class="chartCard">
            <chartjs-line
              :labels="labels2"
              :data="dataset2"
              :bind="true"
            ></chartjs-line>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import chart from "@/components/chart/Chart.vue";

export default {
  name: "chartView",
  data() {
    return {
      labels1: ["January", "February", "March", "April", "May", "June", "July"],
      dataset1: [65, 59, 80, 81, 56, 55, 40],
      labels2: ["1", "2", "3", "4", "5", "6", "7"],
      dataset2: [44, 12, 23, 62, 12, 55, 52],
    };
  },
  components: {
    // chart,
  },
  methods: {},
};
</script>

<style lang="scss">
.chart{
  height: 80%;
}
.chartCard{
  height: 100%;
  width:  100%;
  margin-bottom: 10px;
}
