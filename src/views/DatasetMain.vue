<template>
  <v-content>
    <v-container>
      <grid
        :draggable="false"
        :sortable="true"
        :items="datasets"
        :cellWidth="212"
        :cellHeight="272"
        :gridWidth="1500"
      >
        <template slot="cell" slot-scope="props">
          <template v-if="props.item.type === 'add'">
            <v-row class="add-button">
              <v-btn fab color="black" @click="addDatasetDialog=true">
                <v-icon color="white">mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </template>
          <template v-else>
            <gridcard :item="props.item" :withButton="true" @remove="props.remove()" :api="api" />
          </template>
        </template>
      </grid>

      <v-dialog v-model="addDatasetDialog" :persistent="false" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Add Dataset</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Dataset Name *" v-model="datasetName" required />
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Dataset Description" v-model="datasetDesc" />
                </v-col>
              </v-row>
            </v-container>
            <small>* indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="indigo" text @click="addDatasetDialog=false">Close</v-btn>
            <v-btn @click="addDataset" color="indigo darken-1" text>Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-content>
</template>


<script>
import GridCard from "../components/GridCard.vue";
import Swal from "sweetalert2";

export default {
  components: {
    gridcard: GridCard
  },
  data() {
    return {
      datasetName: "",
      datasetDesc: "",
      addDatasetDialog: false,
      api: "/u/dataset/",
      datasets: [{ type: "add" }]
    };
  },
  created() {
    this.$axios.get("/u/dataset").then(res => {
      console.log(res.data); // FOR DEBUG
      for (let _ of res.data.dataset_info) {
        this.add(_.id, _.src, _.name, _.description);
      }
    });
  },
  methods: {
    addDataset() {
      this.$axios
        .post("/u/dataset", {
          dataset_name: this.datasetName,
          description: this.datasetDesc
        })
        .then(res => {
          this.add(res.data.dataset_id, "", this.datasetName, this.datasetDesc);
        })
        .catch(err => {
          console.log(err);
          if (err.response.status === 409) msg = "project name is conflicted";

          let msg = "";
          if (err.response.message) {
            msg = err.response.message;
          }
          Swal.fire({
            icon: "error",
            title: "fail to add :(",
            text: msg
          });
        });
      this.addDatasetDialog = false;
    },
    add(id, src, title, subtitle) {
      this.datasets.push({
        id: id,
        src: src,
        title: title,
        subtitle: subtitle
      });
    }
  }
};
</script>

<style lang="scss">
.add-button {
  justify-content: center;
  align-content: center;
  height: 100%;
  padding: 12px;
}
.add_dataset {
  position: relative;
  cursor: pointer;
  width: 100%;
  outline: 0;
  border: 1.5px dashed #bdc1c6;
  border-radius: 4px;
  background: transparent;
  overflow: hidden;
  text-transform: none !important;
}
</style>