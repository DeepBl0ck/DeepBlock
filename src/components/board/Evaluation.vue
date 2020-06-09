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
        <v-card class="predictTabs" flat>
          <v-tabs>
            <v-tab>Correct</v-tab>
            <v-tab>Incorrect</v-tab>

            <v-tab-item>
              <v-container fluid>
                <v-card class="predictTab" flat>
                  <v-row dense>
                    <v-col v-for="card in correct_cards" :key="card.title" :cols="flex">
                      <v-card>
                        <v-img :src="card.src" class="white--text align-end" height="150px"></v-img>

                        <v-card-text class="text--primary">
                          <div>Prediction : {{ card.predict }}</div>

                          <div>Percent : {{ card.percent }}%</div>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="4"></v-col>
                  <v-col cols="2">
                    <v-btn
                      class="downButton"
                      :loading="false"
                      :disabled="false"
                      @click="pageDown('correct')"
                      block
                      small
                      dark
                      color="primary"
                    >&lt;</v-btn>
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      class="upButton"
                      :loading="false"
                      :disabled="false"
                      @click="pageUp('correct')"
                      block
                      small
                      dark
                      color="primary"
                    >&gt;</v-btn>
                  </v-col>
                  <v-col cols="4"></v-col>
                </v-row>
              </v-container>
            </v-tab-item>

            <v-tab-item>
              <v-container fluid>
                <v-card class="predictTab" flat>
                  <v-row dense>
                    <v-col v-for="card in incorrect_cards" :key="card.title" :cols="flex">
                      <v-card>
                        <v-img :src="card.src" class="white--text align-end" height="150px"></v-img>

                        <v-card-text class="text--primary">
                          <div>Prediction: {{ card.predict }}</div>

                          <div>Percent: {{ card.percent }}%</div>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="4"></v-col>
                  <v-col cols="2">
                    <v-btn
                      class="downButton"
                      :loading="false"
                      :disabled="false"
                      @click="pageDown('incorrect')"
                      block
                      small
                      dark
                      color="primary"
                    >&lt;</v-btn>
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      class="upButton"
                      :loading="false"
                      :disabled="false"
                      @click="pageUp('incorrect')"
                      block
                      small
                      dark
                      color="primary"
                    >&gt;</v-btn>
                  </v-col>
                  <v-col cols="4"></v-col>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="3">
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
          <v-card class="resultCard" flat>
            <v-data-table
              v-model="selected_result"
              :headers="result_headers"
              :items="result_list"
              :single-select="true"
              item-key="id"
              show-select
              hide-default-footer="true"
              height="100%"
            >
              <template slot="no-data">
                <v-alert :value="true" color="error" icon="warning">No test result :(</v-alert>
              </template>
            </v-data-table>
          </v-card>
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
        >Test</v-btn>
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
      project_id: 1, //TODO: props로 상위 component에서 받아야함

      loading: false,
      page: {
        correct: 0,
        incorrect: 0
      },
      limit: 10,

      correct_cards: [],
      incorrect_cards: [],
      flex: 2,
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

      selected_result: [],
      result_headers: [
        {
          text: "Dataset",
          align: "start",
          sortable: true,
          value: "dataset"
        },
        { text: "Accuracy(%)", value: "accuracy" },
        { text: "Correct", value: "correct" },
        { text: "Incorrect", value: "incorrect" }
      ],
      result_list: [],

      percent: 0,
      query: false,
      show: true,

      save_option: true
    };
  },
  watch: {
    selected_result: function() {
      this.page.correct = 0;
      this.page.incorrect = 0;
      this.correct_cards = [];
      this.incorrect_cards = [];
      this.$axios
        .get(
          `/u/project/${this.project_id}/model/test/${this.selected_result[0].id}/prediction?type=correct&page=${this.page.correct}&limit=${this.limit}`
        )
        .then(response => {
          this.cards = [];
          const res_datas = response.data;
          for (var d of res_datas) {
            this.correct_cards.push({
              src: d.src,
              predict: d.predict,
              percent: d.percent
            });
          }
        });

      this.$axios
        .get(
          `/u/project/${this.project_id}/model/test/${this.selected_result[0].id}/prediction?type=incorrect&page=${this.page.incorrect}&limit=${this.limit}`
        )
        .then(response => {
          this.cards = [];
          const res_datas = response.data;
          for (var d of res_datas) {
            this.incorrect_cards.push({
              src: d.src,
              predict: d.predict,
              percent: d.percent
            });
          }
        });
    }
  },

  methods: {
    pageDown: function(type) {
      if (this.page[type] - 1 >= 0) {
        this.page[type] = this.page[type] - 1;
        this.getPrediction(type);
      }
    },
    pageUp: function(type) {
      if (
        this.page[type] + 1 <
        Math.ceil(this.selected_result[0][type] / this.limit)
      ) {
        this.page[type] = this.page[type] + 1;
        this.getPrediction(type);
      }
    },
    getPrediction: function(type) {
      this.$axios
        .get(
          `/u/project/${this.project_id}/model/test/${this.selected_result[0].id}/prediction?type=${type}&page=${this.page[type]}&limit=${this.limit}`
        )
        .then(response => {
          if (type === "correct") {
            this.correct_cards = [];
          } else {
            this.incorrect_cards = [];
          }

          const res_datas = response.data;
          for (var d of res_datas) {
            if (type === "correct") {
              this.correct_cards.push({
                src: d.src,
                predict: d.predict,
                percent: d.percent
              });
            } else {
              this.incorrect_cards.push({
                src: d.src,
                predict: d.predict,
                percent: d.percent
              });
            }
          }
        });
    },
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
            this.query = false;
            this.loading = false;
            const accuracy = response.data.message.accuracy.toFixed(3);

            Swal.fire({
              icon: "success",
              title: "Success",
              text: `Accuracy: ${accuracy}`
            });
          })
          .catch(err => {
            this.query = false;
            this.loading = false;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data.message
            });
          });
      } else {
        this.query = false;
        this.loading = false;
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
    this.$axios.get("/u/dataset").then(response => {
      for (var dataset of response.data.dataset_info) {
        this.dataset_list.push({
          id: dataset.id,
          name: dataset.name,
          desc: dataset.description
        });
      }

      if (this.dataset_list.length !== 0) {
        this.selected = this.dataset_list[0];
      }
    });

    this.$axios
      .get(`/u/project/${this.project_id}/model/test`)
      .then(response => {
        let test_results = response.data.message;
        for (var result of test_results) {
          this.result_list.push({
            id: result.id,
            dataset: result.dataset,
            accuracy: result.accuracy.toFixed(3),
            correct: result.correct,
            incorrect: result.incorrect
          });
        }
      });
  }
};
</script>

<style lang="scss">
.predictTabs {
  .predictTab {
    min-height: 500px;
  }
}

.evalTopCard {
  height: auto;
  min-height: 47.5%;
}
.evalUnderCard {
  margin-top: 5%;
  height: auto;

  .resultCard {
    height: auto;
  }
}

.title {
  text-align: center;
}
</style>
