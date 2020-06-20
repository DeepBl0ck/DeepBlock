<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-show="loading">
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
        <v-card class="trainChartTabs" flat>
          <v-tabs>
            <v-tab>Train</v-tab>
            <v-tab>Validation</v-tab>

            <v-tab-item>
              <v-card class="topCardChart" flat>
                <h3 class="title">Loss</h3>
                <chartjs-line :labels="epoch" :data="loss" :bind="true" :height="100"></chartjs-line>
              </v-card>
              <v-card class="underCardChart" flat>
                <h3 class="title">Accuracy</h3>
                <chartjs-line :labels="epoch" :data="accuracy" :bind="true" :height="100"></chartjs-line>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="topCardChart" flat>
                <h3 class="title">Validation Loss</h3>
                <chartjs-line :labels="epoch" :data="val_loss" :bind="true" :height="100"></chartjs-line>
              </v-card>
              <v-card class="underCardChart" flat>
                <h3 class="title">Validation Accuracy</h3>
                <chartjs-line :labels="epoch" :data="val_accuracy" :bind="true" :height="100"></chartjs-line>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="3">
        <v-card class="trainTopCard">
          <v-data-table
            v-model="selected"
            :headers="dataset_headers"
            :items="dataset_list"
            :single-select="true"
            item-key="name"
            show-select
            :items-per-page="5"
            height="100%"
          >
            <template slot="no-data">
              <v-alert :value="true" color="error" icon="warning">Please, F5 or wait :(</v-alert>
            </template>
          </v-data-table>
        </v-card>
        <v-card class="trainUnderCard">
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-card class="leftListCard" flat>
                  <p>
                    <b>Optimizer</b>
                  </p>
                  <v-select :items="optimizer_list" v-model="optimizer" outlined dense />
                  <v-list class="list">
                    <p>
                      <b>Learning rate (0.0001 ~ 0.1)</b>
                    </p>
                    <v-text-field v-model="learning_rate"></v-text-field>

                    <p>
                      <b>Batch Size (16 ~ 512)</b>
                    </p>
                    <v-text-field v-model="batches"></v-text-field>
                  </v-list>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card class="rightListCard" flat>
                  <p>
                    <b>Loss function</b>
                  </p>
                  <v-select :items="loss_func_list" v-model="loss_func" outlined dense />
                  <v-list class="list">
                    <p>
                      <b>Epoch (1 ~ 30)</b>
                    </p>
                    <v-text-field v-model="epochs"></v-text-field>

                    <p>
                      <b>Validation (0.01 ~ 0.3)</b>
                    </p>
                    <v-text-field v-model="validation_per"></v-text-field>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-btn
          class="trainButton"
          :loading="loading"
          :disabled="loading"
          @click="startTrain()"
          fab
          x-large
          dark
          color="primary"
        >Train</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
import "chart.js";
import { eventBus } from "../../main";

export default {
  name: "train",
  data() {
    return {
      project_id: 2, //TODO: props로 상위 component에서 받아야함

      loading: false,
      epoch: [],
      loss: [],
      accuracy: [],
      val_loss: [],
      val_accuracy: [],
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

      train_headers: [
        {
          text: "Epoch",
          align: "start",
          sortable: false,
          value: "tablepoch"
        },
        { text: "Accuracy", value: "accuracy" },
        { text: "Loss", value: "loss" }
      ],
      result_list: [],

      percent: 0,
      query: false,
      show: true,

      optimizer_list: [
        "sgd",
        "momentum",
        "adagrad",
        "adadelta",
        "adam",
        "adamax",
        "rmsprop"
      ],
      loss_func_list: [
        "absoluteDifference",
        "computeWeightedLoss",
        "cosineDistance",
        "hingeLoss",
        "huberLoss",
        "logLoss",
        "meanSquaredError",
        "sigmoidCrossEntropy",
        "softmaxCrossEntropy"
      ],
      optimizer: "sgd",
      loss_func: "meanSquaredError",
      epochs: 5,
      batches: 64,
      validation_per: 0,
      learning_rate: 0.001
    };
  },

  methods: {
    startTrain: function() {
      Swal.fire({
        title: "Are you sure?",
        text: "All learning results are deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Do this!"
      }).then(result => {
        if (result.value) {
          if (this.selected.length) {
            this.loading = true;
            this.$axios
              .post(`/u/project/${this.project_id}/model/train`, {
                dataset_id: this.selected[0].id,
                optimizer: this.optimizer,
                loss_function: this.loss_func,
                epochs: this.epochs,
                batches: this.batches,
                validation_per: this.validation_per,
                learning_rate: this.learning_rate
              })
              .then(async response => {
                let state = "do_training";
                this.epoch = [];
                this.loss = [];
                this.accuracy = [];
                this.val_loss = [];
                this.val_accuracy = [];

                this.query = true;

                let epoch_per = 100 / this.epochs;
                let warning_time = parseInt(response.data.image_num / 1000);

                await this.wait(warning_time * 1500);

                while (state !== "end_training") {
                  let response = await this.$axios.get(
                    `/u/project/${this.project_id}/model/train`
                  );

                  let res_data = response.data;
                  let success = res_data.success;
                  state = res_data.state;

                  if (success) {
                    if (
                      state === "do_training" ||
                      res_data.history.length !== 0
                    ) {
                      for (
                        var e = this.epoch.length;
                        e < res_data.history.length;
                        e++
                      ) {
                        this.epoch.push(e + 1);
                        this.loss.push(res_data.history[e].loss);
                        this.accuracy.push(res_data.history[e].acc * 100);
                        if (res_data.val_per > 0) {
                          this.val_loss.push(res_data.history[e].val_loss);
                          this.val_accuracy.push(
                            res_data.history[e].val_acc * 100
                          );
                        }
                      }
                      this.query = false;
                      this.percent = epoch_per * this.epoch.length;

                      if (this.epoch.length === res_data.epochs) {
                        break;
                      }
                    }
                  } else {
                    this.endTrain("error", "Training stopped");
                    break;
                  }

                  await this.wait(3000);
                }

                this.endTrain("success", "Training success");
              })
              .catch(err => {
                this.endTrain("error", err.response.data.message);
              });
          } else {
            this.endTrain("error", "Please, Select Dataset!!");
          }
        }
      });
    },

    endTrain: function(state, msg) {
      this.percent = 0;
      this.loading = false;
      Swal.fire({
        icon: state,
        title: state === "success" ? "Good" : "Fail",
        text: msg
      });

      if (state === "success") {
        eventBus.$emit("refreshResults");
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
  }
};
</script>

<style lang="scss">
.trainChartTabs {
  height: 80%;
  .topCardChart {
    width: 95%;
    height: 90%;
  }
  .underCardChart {
    margin-top: 2%;
    width: 95%;
    height: 90%;
  }
}

.trainTopCard {
  margin-top: 10%;
  height: auto;
  min-height: 42.5%;
}
.trainUnderCard {
  margin-top: 5%;
  height: auto;

  .leftListCard {
    height: auto;
    .list {
      font-size: 14px;
    }
  }

  .rightListCard {
    height: auto;
    .list {
      font-size: 14px;
    }
  }
}
.trainButton {
  margin-top: 7.5%;
  left: 80%;
}

.title {
  text-align: center;
}
</style>
