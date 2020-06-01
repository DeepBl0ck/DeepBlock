<template>
  <v-content>
    <v-container>
      <grid
        :draggable="false"
        :sortable="true"
        :items="projects"
        :cellWidth="280"
        :cellHeight="272"
        :gridWidth="1100"
      >
        <template slot="cell" slot-scope="props">
          <template v-if="props.item.type === 'add'">
            <v-row class="add-button">
              <v-btn fab color="black" @click="addProjectDialog=true">
                <v-icon color="white">mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </template>
          <template v-else>
            <gridcard :item="props.item" :withButton="true" @remove="props.remove()" :api="api" :width="280"/>
          </template>
        </template>
      </grid>

      <v-dialog v-model="addProjectDialog" :persistent="false" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Add Project</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Project Name *" v-model="projectName" required />
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Project Description" v-model="projectDesc" />
                </v-col>
              </v-row>
            </v-container>
            <small>* indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="indigo" text @click="addProjectDialog=false">Close</v-btn>
            <v-btn @click="addProject" color="indigo darken-1" text>Add</v-btn>
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
      projectName: "",
      projectDesc: "",
      addProjectDialog: false,
      api: "/u/project/",
      projects: [{ type: "add" }]
    };
  },
  beforeMount() {
    this.$axios.get("/u/project").then(res => {
      console.log(res.data); // FOR DEBUG
      for (let _ of res.data.project_list) {
        this.add(_.project_id, "src", _.project_name, _.project_description);
      }
    });
  },
  methods: {
    getProject() {
      this.$axios
        .get(`/u/project`)
        .then(res => {
          console.log(res);
          for (let _ of res.data.project_list) {
            this.add(
              _.project_id,
              "src",
              _.project_name,
              _.project_description
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addProject() {
      this.$axios
        .post("/u/project", {
          project_name: this.projectName,
          project_description: this.projectDesc
        })
        .then(() => {
          //FIXME: 10 => this.id, src => img url
          this.add(
            10,
            "http://about:blank",
            this.projectName,
            'sample'
          );
        })
        .catch(err => {
          console.log(err);
          let msg = "";
          if (err.data.message) {
            msg = err.data.message;
          }
          Swal.fire({
            icon: "error",
            title: "fail to add :(",
            text: msg
          });
        });
      this.addProjectDialog = false;
    },
    add(id, src, title, subtitle) {
      this.projects.push({
        id: id,
        src: `https://3qeqpr26caki16dnhd19sv6by6v-wpengine.netdna-ssl.com/wp-content/uploads/2017/08/shared_input_layer.png`,
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
.add_project {
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