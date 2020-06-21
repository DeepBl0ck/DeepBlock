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
          :height="9"
        ></v-progress-linear>
      </v-col>

      <v-col cols="7" align="end">
        <v-card class="predictTabs" flat>
          <v-tabs>
            <v-tab v-for="(tab, i) in tab_list" :key="i">{{ tab.type }}</v-tab>
            <v-spacer />
            <v-spacer />
            <v-spacer />
            <v-spacer />

            <v-combobox
              v-model="answer"
              :items="combo_items"
              label="Correct Answer "
              multiple
              chips
            ></v-combobox>
            <v-spacer />
            <v-combobox
              v-model="case1"
              :items="combo_items"
              label="First prediction"
              chips
              multiple
            ></v-combobox>
            <v-spacer />
            <v-combobox
              v-model="case2"
              :items="combo_items"
              label="Second prediction"
              chips
              multiple
            ></v-combobox>
            <v-tab-item v-for="(tab, i) in tab_list" :key="i">
              <v-container fluid>
                <v-card flat>
                  <v-row dense>
                    <v-col v-for="(card, i) in tab.cards" :key="i" :cols="flex">
                      <v-card class="predictTabCard">
                        <v-card-title
                          class="pa-0 ml-2"
                          v-text="card.answer"
                        ></v-card-title>

                        <div
                          @click="(dialog = true), clickImage(card.image_id)"
                        >
                          <v-img
                            :src="card.src"
                            class="white--text align-end"
                            height="200px"
                          ></v-img>
                        </div>

                        <v-card class="predictCard">
                          <v-container class="pa-0 pt-2">
                            <v-row>
                              <v-col cols="3" class="pt-2 pl-1 pr-0 pb-0">
                                <h6
                                  style="font-size=10px;font-weight:bold; color:#6EA2E2;"
                                >
                                  {{ card.predict_0 }}
                                </h6>
                              </v-col>
                              <v-col cols="8" class="pt-2 pl-1 pr-1 pb-2">
                                <v-progress-linear
                                  class="cardProgress"
                                  v-model="card.percent_0"
                                  rounded
                                  color="#8DB7CF"
                                  height="18px"
                                >
                                  <strong>{{ card.percent_0 }}%</strong>
                                </v-progress-linear>
                              </v-col>

                              <v-col cols="3" class="pt-1 pl-1 pr-0 pb-0">
                                <h6 style="font-weight:bold; color:#D06A54;">
                                  {{ card.predict_1 }}
                                </h6>
                              </v-col>
                              <v-col cols="8" class="pt-1 pl-1 pr-1 pb-2">
                                <v-progress-linear
                                  class="cardProgress"
                                  v-model="card.percent_1"
                                  rounded
                                  color="#EC886F"
                                  height="18px"
                                >
                                  <strong>{{ card.percent_1 }}%</strong>
                                </v-progress-linear>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="3"></v-col>
                  <v-col cols="2">
                    <v-btn
                      class="downButton"
                      :loading="false"
                      :disabled="false"
                      @click="pageDown(tab.type)"
                      block
                      small
                      dark
                      color="primary"
                      >&lt;</v-btn
                    >
                  </v-col>
                  <v-col cols="2"></v-col>
                  <v-col cols="2">
                    <v-btn
                      class="upButton"
                      :loading="false"
                      :disabled="false"
                      @click="pageUp(tab.type)"
                      block
                      small
                      dark
                      color="primary"
                      >&gt;</v-btn
                    >
                  </v-col>
                  <v-col cols="3"></v-col>
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
            :items-per-page="5"
            height="100%"
          >
            <template slot="no-data">
              <v-alert :value="true" color="error" icon="warning"
                >Please, F5 or wait :(</v-alert
              >
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
              :hide-default-footer="true"
              height="100%"
            >
              <template slot="no-data">
                <v-alert :value="true" color="error" icon="warning"
                  >No test result :(</v-alert
                >
              </template>
            </v-data-table>
          </v-card>
        </v-card>
        <v-btn
          class="trainButton"
          :loading="loading"
          :disabled="loading"
          @click="startTest()"
          fab
          x-large
          dark
          color="primary"
          >Test</v-btn
        >
      </v-col>

      <!--================================================================= dialog========================================== -->
      <v-dialog class="ma-2 pa-0" v-model="dialog" max-width="1000">
        <v-card height="500px" min-width="1000px">
          <v-container class="ma-0 pa-0 ml-3">
            <v-row>
              <v-col cols="6">
                <v-card-title
                  class="pa-0 ml-2"
                  v-text="dialog_correct"
                ></v-card-title>

                <v-img
                  :src="dialog_src"
                  class="white--text align-end"
                  height="400px"
                ></v-img>
              </v-col>
              <v-col cols="6">
                <v-card-text>
                  <v-row
                    class="cardProgress"
                    v-for="pred in predict_list"
                    :key="pred.class"
                  >
                    <v-col cols="2" class="pt-1 pl-1 pr-0 pb-0 ml-4">
                      <p style="font-weight:bold; color:#6EA2E2;">
                        {{ pred.class }}
                      </p>
                    </v-col>
                    <v-col cols="9" class="pt-2 pl-1 pr-1 pb-1">
                      <v-progress-linear
                        v-model="pred.percent"
                        rounded
                        color="#8DB7CF"
                        height="18px"
                      >
                        <strong>{{ pred.percent }}%</strong>
                      </v-progress-linear>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <!--================================================================= dialog========================================== -->
    </v-row>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
import { eventBus } from "../../main";
export default {
  name: "evaluation",
  props: {
    pID: Number,
  },
  data() {
    return {
      project_id: this.pID, //TODO: props로 상위 component에서 받아야함

      loading: false,
      offset: {
        correct: 0,
        incorrect: 0,
      },
      limit: 10,

      combo_items: [],
      answer: [],
      case1: [],
      case2: [],

      tab_list: [
        { type: "correct", cards: [] },
        { type: "incorrect", cards: [] },
      ],
      flex: 3,

      dialog: false,
      dialog_correct: "",
      dialog_src: "",
      dialog_info: [],
      predict_list: [],

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

      change_selected: false,
      selected_result: [],
      result_headers: [
        {
          text: "Dataset",
          align: "start",
          sortable: true,
          value: "dataset",
        },
        { text: "Accuracy(%)", value: "accuracy" },
        { text: "Correct", value: "correct" },
        { text: "Incorrect", value: "incorrect" },
      ],
      result_list: [],

      percent: 0,
      query: false,
      show: true,

      save_option: true,
      uri_qurey: "",
    };
  },
  watch: {
    selected_result: function() {
      this.change_selected = true;
      this.setCards();
      this.setComboItems();
    },
    answer: function() {
      if (this.answer.length > 1) {
        this.answer.splice(0, 1);
      }
      if (!this.change_selected) {
        this.setCards();
      }
    },
    case1: function() {
      if (this.case1.length > 1) {
        this.case1.splice(0, 1);
      }
      if (!this.change_selected) {
        this.setCards();
      }
    },
    case2: function() {
      if (this.case2.length > 1) {
        this.case2.splice(0, 1);
      }
      if (!this.change_selected) {
        this.setCards();
      }
    },
  },

  methods: {
    setQurey: function(type) {
      this.uri_qurey = `type=${type}&offset=${this.offset[type]}`;

      if (this.answer.length !== 0) {
        this.uri_qurey = this.uri_qurey + `&answer=${this.answer[0]}`;
      }
      if (this.case1.length !== 0) {
        this.uri_qurey = this.uri_qurey + `&case1=${this.case1[0]}`;
      }
      if (this.case2.length !== 0) {
        this.uri_qurey = this.uri_qurey + `&case2=${this.case2[0]}`;
      }
    },

    setComboItems: function() {
      this.combo_items = [];
      this.answer = [];
      this.first = [];
      this.second = [];
      this.$axios
        .get(`/u/dataset/${this.selected_result[0].dataset_id}/class`)
        .then((response) => {
          const res_data = response.data.class_info;
          for (var d of res_data) {
            this.combo_items.push(d.name);
          }
        });
    },
    setCards: function() {
      this.offset.correct = 0;
      this.offset.incorrect = 0;
      this.tab_list[0].cards = [];
      this.tab_list[1].cards = [];

      if (this.change_selected) {
        this.answer = [];
        this.case1 = [];
        this.case2 = [];
      }

      for (let tab = 0; tab < this.tab_list.length; tab++) {
        this.setQurey(this.tab_list[tab].type);
        this.$axios
          .get(
            `/u/project/${this.project_id}/model/test/${this.selected_result[0].id}/prediction?${this.uri_qurey}`
          )
          .then((response) => {
            const res_datas = response.data;
            for (var d of res_datas) {
              this.addPredictionCard(d, tab);
            }
            this.change_selected = false;
          });
      }
    },
    pageDown: function(type) {
      if (this.offset[type] - 1 >= 0) {
        this.offset[type] = this.offset[type] - 1;
        this.getPrediction(type);
      }
    },
    pageUp: function(type) {
      if (
        this.offset[type] + 1 <
        Math.ceil(this.selected_result[0][type] / this.limit)
      ) {
        this.offset[type] = this.offset[type] + 1;
        this.getPrediction(type);
      }
    },
    addPredictionCard: function(d, index) {
      this.tab_list[index].cards.push({
        src: d.src,
        image_id: d.id,
        predict_0: d.predict[0],
        predict_1: d.predict[1],
        percent_0: d.percent[0],
        percent_1: d.percent[1],
        answer: d.answer,
      });
    },

    getPrediction: function(type) {
      this.setQurey(type);
      this.$axios
        .get(
          `/u/project/${this.project_id}/model/test/${this.selected_result[0].id}/prediction?${this.uri_qurey}`
        )
        .then((response) => {
          if (type === "correct") {
            this.tab_list[0].cards = [];
          } else {
            this.tab_list[1].cards = [];
          }

          const res_datas = response.data;
          for (var d of res_datas) {
            if (type === "correct") {
              this.addPredictionCard(d, 0);
            } else {
              this.addPredictionCard(d, 1);
            }
          }
        });
    },

    clickImage: function(image_id) {
      this.predict_list = [];
      this.dialog_correct = "";
      this.dialog_src = "";
      this.$axios
        .get(
          `/u/project/${this.project_id}/model/test/${this.selected_result[0].id}/prediction/${image_id}`
        )
        .then((response) => {
          let res_data = response.data;
          this.dialog_correct = this.combo_items[
            res_data.result.indexOf(Math.max.apply(null, res_data.result))
          ];
          this.dialog_src = res_data.src;

          for (let label of this.combo_items) {
            const percent = (
              res_data.result[this.combo_items.indexOf(label)] * 100
            ).toFixed(3);
            this.predict_list.push({ class: label, percent: percent });
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
            save_option: this.save_option,
          })
          .then((response) => {
            this.query = false;
            this.loading = false;
            const accuracy = response.data.accuracy.toFixed(3);
            const correct = response.data.correct;
            const incorrect = response.data.incorrect;

            this.getResultList();

            Swal.fire({
              icon: "success",
              title: "Success",
              text: `Accuracy: ${accuracy}  Correct: ${correct}  Incorrect: ${incorrect}`,
            });
          })
          .catch((err) => {
            this.query = false;
            this.loading = false;

            if (err.response.data !== null) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.message,
              });
            } else {
              this.getResultList();
              //this.$router.replace("/model");
            }
          });
      } else {
        this.query = false;
        this.loading = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please, Select Dataset!!",
        });
      }
    },

    getResultList: function() {
      this.result_list = [];
      this.$axios
        .get(`/u/project/${this.project_id}/model/test`)
        .then((response) => {
          let test_results = response.data.message;
          for (var result of test_results) {
            this.result_list.push({
              id: result.id,
              dataset_id: result.dataset_id,
              dataset: result.dataset,
              accuracy: result.accuracy.toFixed(3),
              correct: result.correct,
              incorrect: result.incorrect,
            });
          }
        });
    },
    wait: async function(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },
  },
  created() {
    eventBus.$on("refreshResults", () => {
      this.result_list = [];
    });

    this.$axios.get("/u/dataset").then((response) => {
      for (var dataset of response.data.dataset_info) {
        this.dataset_list.push({
          id: dataset.id,
          name: dataset.name,
          desc: dataset.description,
        });
      }

      if (this.dataset_list.length !== 0) {
        this.selected = this.dataset_list[0];
      }
    });

    this.getResultList();
  },
};
</script>

<style lang="scss">
.predictTabs {
  min-height: 500px;

  .predictTabCard {
    height: auto;
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
