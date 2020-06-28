<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-show="loading">
        <v-progress-linear v-model="percent" :active="show" :indeterminate="query" :query="true" striped color="light-blue" height="5px"></v-progress-linear>
      </v-col>
      <v-col cols="7" align="end">
        <v-card class="train-chart-tabs" flat>
          <v-tabs>
            <v-tab>Train</v-tab>
            <v-tab>Validation</v-tab>

            <v-tab-item>
              <v-card class="top-card-chart" flat>
                <h3 class="title">Loss</h3>
                <chartjs-line :labels="epoch" :data="loss" :bind="true" :height="100"></chartjs-line>
              </v-card>
              <v-card class="under-card-chart" flat>
                <h3 class="title">Accuracy</h3>
                <chartjs-line :labels="epoch" :data="accuracy" :bind="true" :height="100"></chartjs-line>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="top-card-chart" flat>
                <h3 class="title">Validation Loss</h3>
                <chartjs-line :labels="epoch" :data="val_loss" :bind="true" :height="100"></chartjs-line>
              </v-card>
              <v-card class="under-card-chart" flat>
                <h3 class="title">Validation Accuracy</h3>
                <chartjs-line :labels="epoch" :data="val_accuracy" :bind="true" :height="100"></chartjs-line>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="4">
        <v-card class="train-top-card">
          <v-data-table v-model="selected" :headers="dataset_headers" :items="dataset_list" :single-select="true" item-key="name" show-select :items-per-page="5" height="100%">
            <template slot="no-data">
              <v-alert :value="true" color="error" icon="warning">Please, F5 or wait :(</v-alert>
            </template>
          </v-data-table>
        </v-card>
        <v-card class="train-under-card">
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-card class="left-list-card" flat>
                  <p>
                    <b>Optimizer</b>
                  </p>
                  <v-select :items="optimizer_list" v-model="optimizer" outlined dense />
                  <v-list class="list">
                    <p>
                      <b>Learning rate</b>
                      <v-tooltip right color="blue" min-width="20px" max-width="300px">
                        <template v-slot:activator="{ on, learningRateDesc }">
                          <v-btn v-bind="learningRateDesc" v-on="on" fab x-small icon>
                            <v-icon>mdi-exclamation</v-icon>
                          </v-btn>
                        </template>
                        <span>0.0001 ~ 0.1</span>
                      </v-tooltip>
                    </p>
                    <v-text-field v-model="learning_rate"></v-text-field>
                    <p>
                      <b>Batch Size</b>
                      <v-tooltip right color="blue" min-width="20px" max-width="300px">
                        <template v-slot:activator="{ on, batchSizeDesc }">
                          <v-btn v-bind="batchSizeDesc" v-on="on" fab x-small icon>
                            <v-icon>mdi-exclamation</v-icon>
                          </v-btn>
                        </template>
                        <span>16 ~ 512</span>
                      </v-tooltip>
                    </p>
                    <v-text-field v-model="batches"></v-text-field>
                  </v-list>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card class="right-list-card" flat>
                  <p>
                    <b>Loss function</b>
                  </p>
                  <v-select :items="loss_func_list" v-model="loss_func" outlined dense />
                  <v-list class="list">
                    <p>
                      <b>Epoch</b>
                      <v-tooltip right color="blue" min-width="20px" max-width="300px">
                        <template v-slot:activator="{ on, epochDesc }">
                          <v-btn v-bind="epochDesc" v-on="on" fab x-small icon>
                            <v-icon>mdi-exclamation</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ "1 ~ 30" }}</span>
                      </v-tooltip>
                    </p>
                    <v-text-field v-model="epochs"></v-text-field>
                    <p>
                      <b>Validation</b>
                      <v-tooltip right color="blue" min-width="20px" max-width="300px">
                        <template v-slot:activator="{ on, valPerDesc }">
                          <v-btn v-bind="valPerDesc" v-on="on" fab x-small icon>
                            <v-icon>mdi-exclamation</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ "0.01 ~ 0.3" }}</span>
                      </v-tooltip>
                    </p>
                    <v-text-field v-model="validation_per"></v-text-field>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-btn class="train-button" :loading="loading" :disabled="loading" @click="startTrain()" fab x-large dark color="primary">Train</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "chart.js";
import { eventBus } from "../../main";
import swal from "@/util/swal";
import dataset from "@/service/dataset";
import train from "@/service/train";

export default {
  name: "train",
  props: {
    pID: String,
  },
  data() {
    return {
      project_id: parseInt(this.pID),
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
          value: "name",
        },
        { text: "Description", value: "desc" },
      ],
      dataset_list: [],

      train_headers: [
        {
          text: "Epoch",
          align: "start",
          sortable: false,
          value: "tablepoch",
        },
        { text: "Accuracy", value: "accuracy" },
        { text: "Loss", value: "loss" },
      ],
      result_list: [],

      percent: 0,
      loading: false,
      query: false,
      show: true,

      optimizer_list: ["sgd", "momentum", "adagrad", "adadelta", "adam", "adamax", "rmsprop"],
      loss_func_list: ["absoluteDifference", "computeWeightedLoss", "cosineDistance", "hingeLoss", "huberLoss", "logLoss", "meanSquaredError", "sigmoidCrossEntropy", "softmaxCrossEntropy"],
      optimizer: "sgd",
      loss_func: "meanSquaredError",
      epochs: 5,
      batches: 64,
      validation_per: 0,
      learning_rate: 0.001,
    };
  },

  methods: {
    startTrain: function () {
      swal.doubleCheck("All learning results are deleted!").then((result) => {
        if (result.value && this.selected.length) {
          this.loading = true;
          train
            .startTrain(this.project_id, {
              dataset_id: this.selected[0].id,
              optimizer: this.optimizer,
              loss_function: this.loss_func,
              epochs: this.epochs,
              batches: this.batches,
              validation_per: this.validation_per,
              learning_rate: this.learning_rate,
            })
            .then(async (response) => {
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
                let response = await train.getTrainResult(this.project_id);

                let res_data = response.data;
                let success = res_data.success;
                state = res_data.state;

                if (success && (state === "do_training" || res_data.history.length !== 0)) {
                  this.getGraph(res_data);
                  this.query = false;
                  this.percent = epoch_per * this.epoch.length;

                  if (this.epoch.length === res_data.epochs) {
                    break;
                  }
                } else {
                  if (!success) {
                    this.endTrain("error", "Training stopped");
                    break;
                  }
                }
                await this.wait(3000);
              }

              this.endTrain("success", "Training success");
            })
            .catch((err) => {
              this.endTrain("error", err.response.data.message);
            });
        } else {
          if (!this.selected.length) this.endTrain("error", "Please, Select Dataset!!");
        }
      });
    },

    getGraph: function (data) {
      for (let e = this.epoch.length; e < data.history.length; e++) {
        this.epoch.push(e + 1);
        this.loss.push(data.history[e].loss);
        this.accuracy.push(data.history[e].acc * 100);
        if (data.val_per > 0) {
          this.val_loss.push(data.history[e].val_loss);
          this.val_accuracy.push(data.history[e].val_acc * 100);
        }
      }
    },

    endTrain: function (state, msg) {
      this.percent = 0;
      this.loading = false;

      if (state === "success") {
        swal.success(msg);
        eventBus.$emit("refreshResults");
      } else {
        swal.error(msg);
      }
    },

    wait: async function (ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },
  },

  created() {
    train
      .getTrainResult(this.project_id)
      .then((response) => {
        let train_result = response.data;
        this.getGraph(train_result);

        this.state = train_result.state;
      })
      .catch(() => {
        this.epoch = [];
        this.loss = [];
        this.accuracy = [];
      });

    dataset.get().then((response) => {
      for (let dataset of response.data.dataset_info) {
        this.dataset_list.push({
          id: dataset.id,
          name: dataset.name,
          desc: dataset.description,
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.train-chart-tabs {
  height: 80%;
  .top-card-chart {
    width: 95%;
    height: 90%;
  }
  .under-card-chart {
    margin-top: 2%;
    width: 95%;
    height: 90%;
  }
}

.train-top-card {
  margin-top: 10%;
  height: auto;
}
.train-under-card {
  margin-top: 5%;
  height: auto;

  .left-list-card {
    height: auto;
    .list {
      font-size: 14px;
    }
  }

  .right-list-card {
    height: auto;
    .list {
      font-size: 14px;
    }
  }
}
.train-button {
  margin-top: 7.5%;
  left: 80%;
}

.title {
  text-align: center;
}
</style>
