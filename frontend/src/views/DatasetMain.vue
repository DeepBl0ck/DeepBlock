<template>
  <v-content>
    <v-container>
      <grid :draggable="false" :sortable="true" :items="datasets" :cellWidth="212" :cellHeight="272" :gridWidth="1500">
        <template slot="cell" slot-scope="props">
          <template v-if="props.item.type === 'add'">
            <v-row class="add-button">
              <v-btn fab color="#274555" @click="addDialog=true">
                <v-icon color="white">mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </template>
          <template v-else>
            <gridcard :item="props.item" :withButton="true" @remove="deleteDataset(props)" @route="$router.push(`/datasetinfo?dataset_id=${props.item.id}`)" />
          </template>
        </template>
      </grid>

      <v-dialog v-model="addDialog" :persistent="false" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Add Dataset</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Dataset Name *" v-model="name" required @keyup.enter="addDataset" />
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Dataset Description" v-model="desc" @keyup.enter="addDataset" />
                </v-col>
              </v-row>
            </v-container>
            <small>* indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="indigo" text @click="addDialog = false">Close</v-btn>
            <v-btn @click="addDataset" color="indigo darken-1" text>Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-content>
</template>

<script>
import GridCard from "../components/GridCard.vue";
import swal from "@/util/swal";
import dataset from "@/service/dataset";

export default {
  components: {
    gridcard: GridCard,
  },
  data() {
    return {
      name: "",
      desc: "",
      addDialog: false,
      datasets: [{ type: "add" }],
    };
  },
  created() {
    dataset.get().then((res) => {
      for (let _ of res.data.dataset_info) this.push(_.id, _.src, _.name, _.description);
    });
  },
  methods: {
    addDataset() {
      dataset
        .add({
          dataset_name: this.name,
          description: this.desc,
        })
        .then((res) => {
          this.push(res.data.dataset_id, res.data.src, this.name, this.desc);
        })
        .catch((err) => {
          let { message } = err.response ? err.response.data : "Dataset Add Error";
          if (err.response.status === 409) message = "Project name is conflicted";
          swal.error(message);
        });
      this.addDialog = false;
    },
    async deleteDataset(props) {
      const { value: isConfirm } = await swal.deleteConfirm();
      if (isConfirm === "remove") {
        dataset
          .delete(props.item.id)
          .then((res) => {
            swal.success(res.data.message);
            this.datasets.splice(this.datasets.indexOf(props.item), 1);
            this.initData();
          })
          .catch((err) => {
            this.initData();
            let { message } = err.response ? err.response.data : "Dataset delete error";
            swal.error(message);
          });
      }
    },
    initData() {
      this.name = "";
      this.desc = "";
    },
    push(id, src, title, subtitle) {
      this.datasets.push({
        id: id,
        src: src,
        title: title,
        subtitle: subtitle,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
