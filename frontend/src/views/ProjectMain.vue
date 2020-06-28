<template>
  <v-content>
    <v-container>
      <grid :draggable="false" :sortable="true" :items="projects" :cellWidth="280" :cellHeight="272" :gridWidth="1500">
        <template slot="cell" slot-scope="props">
          <template v-if="props.item.type === 'add'">
            <v-row class="add-button">
              <v-btn fab color="#274555" @click="addDialog=true">
                <v-icon color="white">mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </template>
          <template v-else>
            <gridcard :item="props.item" :withButton="true" :width="280" @route="$router.push(`/model?project_id=${props.item.id}`)" @remove="deleteProject(props)" />
          </template>
        </template>
      </grid>

      <v-dialog v-model="addDialog" :persistent="false" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline darkblue-color">Add Project</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Project Name *" v-model="name" required @keyup.enter="addProject" />
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Project Description" v-model="desc" @keyup.enter="addProject" />
                </v-col>
              </v-row>
            </v-container>
            <small>* indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="#274555" text @click="addDialog=false">Close</v-btn>
            <v-btn @click="addProject" color="#274555" text>Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-content>
</template>

<script>
import GridCard from "../components/GridCard.vue";
import swal from "@/util/swal";
import project from "@/service/project";

export default {
  components: {
    gridcard: GridCard,
  },
  data() {
    return {
      name: "",
      desc: "",
      addDialog: false,
      projects: [{ type: "add" }],
    };
  },
  created() {
    project.get().then((res) => {
      for (let _ of res.data.project_info) this.push(_.id, _.src, _.name, _.description);
    });
  },
  methods: {
    addProject() {
      project
        .add({
          project_name: this.name,
          description: this.desc,
        })
        .then((res) => {
          this.push(res.data.project_id, res.data.src, this.name, this.desc);
        })
        .catch((err) => {
          let { message } = err.response ? err.respose.data : "";
          swal.error(message);
        });
      this.addDialog = false;
    },
    async deleteProject(props) {
      const { value: isConfirm } = await swal.deleteConfirm();
      if (isConfirm === "remove") {
        project
          .delete(props.item.id)
          .then((res) => {
            swal.success(res.data.message);
            this.projects.splice(this.projects.indexOf(props.item), 1);
            this.initData();
          })
          .catch((err) => {
            this.initData();
            let { message } = err.response ? err.response.data : "Project delete error";
            swal.error(message);
          });
      }
    },
    initData() {
      this.name = "";
      this.desc = "";
    },
    push(id, src, title, subtitle) {
      this.projects.push({
        id: id,
        src: src,
        title: title,
        subtitle: subtitle,
      });
    },
  },
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
