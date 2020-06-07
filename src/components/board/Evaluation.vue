<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-progress-linear
          v-model="percent"
          :active="show"
          :indeterminate="query"
          :query="true"
          striped
          color="light-blue"
          height="5px"
        ></v-progress-linear>
      </v-col>

      <v-col cols="7" align="end">
        <v-card class="evalChartTabs" flat>
          <v-tabs>
            <v-tab>Train</v-tab>
            <v-tab>Validation</v-tab>

            <v-tab-item>
              <v-card class="topCardChart" flat>
                <h3 class="title">Loss</h3>
                <chartjs-line :labels="epoch" :data="loss" :bind="true" height="100%"></chartjs-line>
              </v-card>
              <v-card class="underCardChart" flat>
                <h3 class="title">Accuracy</h3>
                <chartjs-line :labels="epoch" :data="accuracy" :bind="true" height="100%"></chartjs-line>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="topCardChart" flat>
                <h3 class="title">Validation Loss</h3>
                <chartjs-line :labels="epoch" :data="val_loss" :bind="true" height="100%"></chartjs-line>
              </v-card>
              <v-card class="underCardChart" flat>
                <h3 class="title">Validation Accuracy</h3>
                <chartjs-line :labels="epoch" :data="val_accuracy" :bind="true" height="100%"></chartjs-line>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>

      <v-col cols="5">
        <v-card class="evalTopCard">
          <v-data-table
            v-model="selected"
            :headers="dataset_headers"
            :items="dataset_list"
            :single-select="true"
            item-key="name"
            show-select
            items-per-page="5"
            height="100%"
          >
            <template slot="no-data">
              <v-alert :value="true" color="error" icon="warning">Please, F5 or wait :(</v-alert>
            </template>
          </v-data-table>
        </v-card>
        <v-card class="evalUnderCard">
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-card class="resultCard" flat>
                  <v-data-table
                    class="resultTable"
                    :headers="result_headers"
                    :items="result_list"
                    item-key="name"
                    hide-default-footer="true"
                    height="100%"
                  >
                    <template slot="no-data">
                      <v-alert :value="true" color="error" icon="warning">No test result :(</v-alert>
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-btn
                  class="testButton"
                  :loading="loading"
                  :disabled="loading"
                  @click="startTest()"
                  block
                  dark
                  color="indigo"
                >Start</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "chart.js";
import Swal from "sweetalert2";

export default {
  name: "train",
  data() {
    return {
      loading: false,

      epoch: [],
      loss: [],
      accuracy: [],

      val_loss: [],
      val_accuracy: [],

      project_id: 4, //TODO: props로 상위 component에서 받아야함

      selected: [],
      dataset_headers: [
        {
          text: "Dataset",
          align: "start",
          sortable: true,
          value: "name"
        },
        { text: "Description", value: "desc" }
      ],
      dataset_list: [],
      result_headers: [
        {
          text: "Dataset",
          align: "start",
          sortable: true,
          value: "dataset"
        },
        { text: "Accuracy(%)", value: "accuracy" },
        { text: "Loss", value: "loss" }
      ],
      result_list: [],

      percent: 0,
      query: false,
      show: true,

      save_option: true
    };
  },

  methods: {
    startTest: function() {
      if (this.selected.length) {
        this.loading = true;
        this.query = true;
        this.$axios
          .post(`/u/project/${this.project_id}/model/test`, {
            dataset_id: this.selected[0].id,
            save_option: this.save_option
          })
          .then(response => {
            console.log(response);
            this.query = false;
            this.loading = false;
            const loss = response.data.message.loss.toFixed(3);
            const accuracy = response.data.message.accuracy.toFixed(3);

            Swal.fire({
              icon: "success",
              title: "Success",
              text: `Accuracy: ${accuracy}  loss: ${loss}`
            });
          })
          .catch(err => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data.message
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please, Select Dataset!!"
        });
      }
    },

    wait: async function(ms) {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    }
  },
  created() {
    this.$axios
      .get(`/u/project/${this.project_id}/model/train`)
      .then(response => {
        let train_result = response.data;
        for (var e = this.epoch.length; e < train_result.history.length; e++) {
          this.epoch.push(e + 1);
          this.loss.push(train_result.history[e].loss);
          this.accuracy.push(train_result.history[e].acc * 100);
          if (train_result.val_per > 0) {
            this.val_loss.push(train_result.history[e].val_loss);
            this.val_accuracy.push(train_result.history[e].val_acc * 100);
          }
        }
        this.state = train_result.state;
      })
      .catch(() => {
        this.epoch = [];
        this.loss = [];
        this.accuracy = [];
      });

    this.$axios.get("/u/dataset").then(response => {
      for (var dataset of response.data.dataset_info) {
        this.dataset_list.push({
          id: dataset.id,
          name: dataset.name,
          desc: dataset.description
        });
      }
    });

    this.$axios
      .get(`/u/project/${this.project_id}/model/test`)
      .then(response => {
        let test_results = response.data.message;
        for (var result of test_results) {
          this.result_list.push({
            dataset: result.dataset,
            accuracy: result.accuracy.toFixed(3) * 100,
            loss: result.loss.toFixed(3)
          });
        }
      });
  }
};
</script>

<style lang="scss">
.evalChartTabs {
  height: 90%;
  .topCardChart {
    width: 95%;
    height: 100%;
  }
  .underCardChart {
    margin-top: 2%;
    width: 95%;
    height: 100%;
  }
}

.evalTopCard {
  height: auto;
  min-height: 47.5%;
}
.evalUnderCard {
  margin-top: 5%;
  height: auto;
  min-height: 47.5%;

  .resultCard {
    height: auto;
  }
}

.title {
  text-align: center;
}
</style>
