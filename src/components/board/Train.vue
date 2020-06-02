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
            height="100"
          ></chartjs-line>
        </v-card>

        <v-card class="accCard" style="margin-top: 20px">
          <h3>Accuracy</h3>
          <chartjs-line
            class="accChart"
            :labels="epoch"
            :data="accuracy"
            :bind="true"
            height="100"
          ></chartjs-line>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="dataset_list"
            :single-select="true"
            item-key="name"
            show-select
            class="datasetTable"
          >
            <template slot="no-data">
              <v-alert :value="true" color="error" icon="warning">
                Sorry, nothing to display here :(
              </v-alert>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="1">
        <v-btn @click="startTrain()" block dark color="indigo">Start</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import chart from "@/components/chart/Chart.vue";
import Swal from "sweetalert2";
import "chart.js";

export default {
  name: "train",
  data() {
    return {
      epoch: [],
      loss: [],
      accuracy: [],
      project_id: 1, //TODO: props로 상위 component에서 받아야함
      selected: [],
      headers: [
        {
          text: "Dataset",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Description", value: "desc" },
      ],
      dataset_list: [],
    };
  },
  components: {
    // chart,
  },
  methods: {
    startTrain: function() {
      if (this.selected.length) {
        this.$axios
          .post(
            `http://localhost:8000/api/u/project/${this.project_id}/model/train`,
            {
              dataset_id: this.selected[0].id,
            }
          )
          .then(async () => {
            let state = "do_training";
            this.epoch = [];
            this.loss = [];
            this.accuracy = [];

            await this.wait(3000);

            while (state !== "end_training") {
              let response = await this.$axios.get(
                `http://localhost:8000/api/u/project/${this.project_id}/model/train`
              );

              let res_data = response.data;
              let success = res_data.success;
              state = res_data.state;

              if (success) {
                for (
                  var e = this.epoch.length;
                  e < res_data.history.length;
                  e++
                ) {
                  this.epoch.push(e + 1);
                  this.loss.push(res_data.history[e].loss);
                  this.accuracy.push(res_data.history[e].acc * 100);
                }
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Training stopped",
                });
                break;
              }
              await this.wait(3000);
            }

            Swal.fire({
              icon: "success",
              title: "GOOD!",
              text: "Training success",
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data.message,
            });
          });
      }
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
          this.epoch.push(e + 1);
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
