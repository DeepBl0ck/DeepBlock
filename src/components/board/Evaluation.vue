<template>
  <v-container>
    <v-row class="chart">
      <v-col cols="12" align="end">
          <h1>Evaluation Learning Chart</h1>
        <v-btn
          class="goTrain"
          id="goTrain"
          fab
          rounded
          outlined
          color="#1B5E20"
          @click="layerTrain()"
          >Start</v-btn
        >
        <v-btn
          class="goBoard"
          id="goBoard"
          fab
          rounded
          outlined
          color="#B71C1C"
          @click="goBoard()"
          >Board</v-btn
        >
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
    chart,
  },
  methods: {
    goBoard: function() {
      // this.$store.state.status = 
    }
  }
};
</script>

<style lang="sass">
.chart h1
    text-align: center
.goBoard
    margin-left: 20px
</style>>
