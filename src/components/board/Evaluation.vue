<template>
  <v-container>
    <v-row class="chart">
      <v-col cols="6" align="end">
        <v-card class="lossCard">
          <h3>Loss</h3>
          <chartjs-line
            class="lossChart"
            :labels="epoch"
            :data="loss"
            :bind="true"
            height="100px"
          ></chartjs-line>
        </v-card>

        <v-card class="accCard" style="margin-top: 20px">
          <h3>Accuracy</h3>
          <chartjs-line
            class="accChart"
            :labels="epoch"
            :data="accuracy"
            :bind="true"
            height="100px"
          ></chartjs-line>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
import "chart.js";

export default {
  name: "train",
  data() {
    return {
      epoch: [],
      loss: [],
      accuracy: [],
      project_id: 1,
      state: "",
    };
  },
  components: {},
  methods: {
    getTrainResult: async function() {
      this.state = "do_training";
      this.epoch = [];
      this.loss = [];
      this.accuracy = [];

      //await this.wait(5000);

      while (this.state !== "end_training") {
        await this.wait(2000);
        let response = await this.$axios.get(
          `http://localhost:8000/api/u/project/${this.project_id}/model/train`
        );
        let current = response.data;

        if (current.result === "success_do") {
          for (var e = this.epoch.length; e < current.history.length; e++) {
            this.epoch.push(e + 1);
            this.loss.push(current.history[e].loss);
            this.accuracy.push(current.history[e].acc * 100);
          }
          this.state = current.state;
        } else if (current.result === "fail_end") {
          this.state = current.state;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Training stopped",
          });
        } else {
          this.state = "do_training";
        }
      }

      Swal.fire({
        icon: "success",
        title: "GOOD!",
        text: "Training success",
      });
    },
    wait: async function(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },
  },
  created() {
    this.$axios
      .get(`http://localhost:8000/api/u/project/${this.project_id}/model/train`)
      .then((response) => {
        let train_result = response.data;
        for (var e = this.epoch.length; e < train_result.history.length; e++) {
          this.epoch.push(e);
          this.loss.push(train_result.history[e].loss);
          this.accuracy.push(train_result.history[e].acc * 100);
        }
        this.state = train_result.state;
      })
      .catch(() => {
        this.epoch = [];
        this.loss = [];
        this.accuracy = [];
      });

    this.$axios.get("http://localhost:8000/api/u/dataset").then((response) => {
      for (var dataset of response.data.dataset_info) {
        this.dataset_list.push({
          id: dataset.datasetID,
          name: dataset.datasetName,
          desc: dataset.description,
        });
      }
    });
  },
};
</script>
