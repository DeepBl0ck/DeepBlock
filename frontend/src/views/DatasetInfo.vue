<template>
  <v-content style="text-align: center;">
    <div class="card-area" style="display: inline-block;">
      <template v-for="(c, i) in this.classes">
        <v-card :key="i" width="650" color="#ffffff" class="c">
          <v-card-title class="card-title">
            <input
              v-autowidth="{
                maxWidth: '960px',
                minWidth: '20px',
                comfortZone: 0,
              }"
              v-model="c.title"
              color="#1565C0"
              required
              @change="changeClassName(c, i)"
              onfocus="this.select()"
              :disabled="!c.nowModify"
            />
            <v-btn small fab text color="gray" @click="fixTitle(c)">
              <v-icon v-show="!c.nowModify" color="#BDC1C6">mdi-lock-outline</v-icon>
              <v-icon v-show="c.nowModify" color="#BDC1C6">mdi-lock-open-outline</v-icon>
            </v-btn>
            <v-spacer></v-spacer>

            <v-menu bottom right offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="deleteClass(c)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn icon v-on="on" @click="c.moreAdd = !c.moreAdd">
                  <v-icon>mdi-folder-upload</v-icon>
                </v-btn>
              </template>
            </v-menu>

            <v-btn icon @click="c.show = !c.show">
              <v-icon>{{ c.show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-expand-transition>
            <div v-show="c.show">
              <v-card-subtitle v-if="c.data.length <= 0">
                <div class="drop-area">
                  <div class="sub-title">Add Image Samples:</div>
                  <v-icon color="#1565C0">mdi-cloud-upload</v-icon>
                  <input
                    id="fileInput"
                    class="input-file"
                    type="file"
                    name="myfile"
                    multiple="true"
                    @change="uploadImages($event, $event.target.name, $event.target.files, c)"
                    @drop="uploadImages($event, $event.target.name, $event.target.files, c)"
                  />
                  <v-progress-linear v-show="c.uploading.now" v-model="c.uploading.progress" :active="true" :indeterminate="c.uploading.indeterminate" :query="true"></v-progress-linear>
                </div>
              </v-card-subtitle>

              <v-card-subtitle v-else>
                <div v-show="c.moreAdd" class="drop-area">
                  <div class="sub-title">Add Image Samples:</div>
                  <v-icon color="#1565C0">mdi-cloud-upload</v-icon>
                  <input
                    id="fileInput"
                    class="input-file"
                    type="file"
                    name="myfile"
                    multiple="true"
                    @change="uploadImages($event, $event.target.name, $event.target.files, c)"
                    @drop="uploadImages($event, $event.target.name, $event.target.files, c)"
                  />
                  <v-progress-linear v-show="c.uploading.now" v-model="c.uploading.progress" :active="true" :indeterminate="c.uploading.indeterminate" :query="true"></v-progress-linear>
                </div>
                <v-container class="pa-1" fluid>
                  <v-card flat>
                    <v-row dense>
                      <v-col v-for="(data, i) in c.data" :key="i" :cols="2">
                        <v-container class="container pa-1">
                          <v-img :src="data.src" :key="i" width="80" height="80" class="thumbnail" @click="getOriginal(c, data.id)"></v-img>
                          <v-btn class="btn ml-10" icon @click="deleteImage(c, data.id)">
                            <v-icon right medium drak>mdi-delete</v-icon>
                          </v-btn>
                        </v-container>
                      </v-col>
                      <v-pagination v-model="c.offset" :total-visible="9" :length="c.totalPage" @input="getImages(c)" @next="getImages(c)" @previous="getImages(c)"></v-pagination>
                    </v-row>
                  </v-card>
                </v-container>
              </v-card-subtitle>
            </div>
          </v-expand-transition>
        </v-card>
      </template>

      <v-card-subtitle class="add-class-card">
        <v-btn class="add_classes" color="rgba(0, 0, 0, 0.6)" text style="padding: 30px; height: unset;" @click="addClass">
          <v-icon>mdi-plus-box</v-icon>
          <div class="sub-title" style="margin-left: 5px;">Add a class</div>
        </v-btn>
      </v-card-subtitle>
    </div>
    <v-btn v-scroll="onScroll" v-show="fab" fab dark fixed bottom right color="primary" @click="toTop">
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>

    <v-dialog class="ma-2 pa-0" v-model="dialog" max-width="75%">
      <div>
        <img :src="originalImg" style="width: 100%; height: auto; overflow: hidden;" />
      </div>
    </v-dialog>
  </v-content>
</template>

<script>
import swal from "@/util/swal";
import _class from "@/service/class";
import image from "@/service/image";

export default {
  data() {
    return {
      datasetID: this.$route.query.dataset_id,
      limit: 12,

      page: 1,
      show: true,
      menus: [{ title: "Delete Class" }, { title: "Test" }, { title: "Remove All Samples" }],
      classes: [],
      titleBackup: [],
      fab: false,

      originalImg: "",
      dialog: false,
    };
  },

  created() {
    _class.get(this.datasetID).then((response) => {
      let classList = response.data.class_info;

      window.test = classList;
      if (!this.isEmptyObject(classList)) {
        for (let _ of classList) {
          this.classes.push({
            title: _.name,
            nowModify: false,
            show: true,
            classID: _.id,
            data: [],
            offset: 1,
            imageCount: parseInt(_.count),
            totalPage: Math.ceil(parseInt(_.count) / this.limit),
            uploading: { now: false, progress: 0, indeterminate: false },
            moreAdd: false,
          });
          this.titleBackup.push(_.name);

          this.getImages(this.classes[this.classes.length - 1]);
        }
      }
    });
  },
  methods: {
    isEmptyObject: function (param) {
      return Object.keys(param).length === 0 && param.constructor === Object;
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },

    toTop() {
      this.$vuetify.goTo(0);
    },

    getImages: function (c) {
      image.get(this.datasetID, c.classID, this.limit, c.offset).then((response) => {
        const image_list = response.data.image_list;
        c["data"] = [];
        for (let image of image_list) {
          c["data"].push({ id: image.id, src: image.src });
        }
      });
    },

    getOriginal: function (c, id) {
      image.getOrigin(this.datasetID, c.classID, id).then((response) => {
        this.originalImg = response.data.image_uri;
        this.dialog = true;
      });
    },

    deleteImage: function (c, id) {
      image.delete(this.datasetID, c.classID, id).then((response) => {
        this.getImages(c);
        c["imageCount"] = parseInt(response.data.count);
        const page = Math.ceil(response.data.count / this.limit);
        if (c["totalPage"] !== page) {
          c["totalPage"] = page;
        }
      });
    },

    uploadImages: function (event, name, files, c) {
      if (files.length > 2000) {
        swal.error("You can only upload 2000 images at a time");
      } else if (files.length) {
        c["uploading"].now = true;
        c["uploading"].indeterminate = true;
        const formData = new FormData();
        for (let [i, file] of Object.entries(files)) {
          formData.append(name, file, String(i));
        }
        c["uploading"].indeterminate = false;

        const config = {
          onUploadProgress: (progressEvent) => {
            c["uploading"].progress = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
          },
        };
        image
          .add(this.datasetID, c.classID, formData, config)
          .then(async (response) => {
            c["imageCount"] = parseInt(response.data.count);
            c["totalPage"] = Math.ceil(response.data.count / this.limit);
            c["uploading"].now = false;
            c["uploading"].progress = 0;
            event.target.value = "";
            this.getImages(c);
          })
          .catch((err) => {
            c["uploading"].now = false;
            c["uploading"].indeterminate = false;
            swal.error(err.response.data.message);
          });
      }
    },

    addClass: function () {
      const className = this.getDefaultName();
      _class
        .add(this.datasetID, {
          class_name: className,
        })
        .then((response) => {
          this.classes.push({
            title: className,
            nowModify: false,
            show: true,
            classID: response.data.class_id,
            data: [],
            offset: 1,
            imageCount: parseInt(0),
            totalPage: 0,
            uploading: { now: false, progress: 0, indeterminate: false },
            moreAdd: false,
          });
          this.titleBackup.push(className);
        })
        .catch((err) => {
          swal.error(err.response.data.message);
        });
    },

    changeClassName: function (c, index) {
      _class
        .update(this.datasetID, c.classID, {
          after: c.title,
        })
        .then(() => {
          this.titleBackup[index] = c.title;
        })
        .catch(() => {
          this.classes[index].title = this.titleBackup[index];
        });
    },

    deleteClass: function (c) {
      swal.doubleCheck("You won't be able to revert this!").then((result) => {
        if (result.value) {
          _class
            .delete(this.datasetID, c.classID)
            .then(() => {
              const index = this.classes.indexOf(c);

              this.classes.splice(index, 1);
              this.titleBackup.splice(index, 1);
            })
            .catch((err) => {
              swal.error(err.response.data.message);
            });
        }
      });
    },

    fixTitle: function (c) {
      c.nowModify = !c.nowModify;
    },

    getDefaultName: function () {
      let index = 0;
      let defaultName = null;
      if (!this.classes.length) {
        defaultName = `Class${index}`;
      } else {
        while (!defaultName) {
          for (let c of this.classes) {
            if (c.title.indexOf(`Class${index}`) === -1) {
              defaultName = `Class${index}`;
            }
            if (c.title.indexOf(`Class${index}`) !== -1) {
              defaultName = null;
              break;
            }
          }
          index += 1;
        }
      }

      return defaultName;
    },

    wait: async function (ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-area {
  width: auto;
  .v-card.c {
    border-radius: 12px;
    margin: 20px;
    text-align: center;
  }
  .card-title {
    padding: 8px 16px;
    font-size: 20px;
    font-weight: 500;
  }
}
.sub-title {
  font-size: 16px;
  font-weight: 500;
}
.button-area {
  margin-top: 15px;
  .v-btn__content {
    flex-direction: column;
  }
  .icon-btn {
    margin: 0 3px;
    &:first-of-type {
      margin-left: 0px;
    }
    &:last-of-type {
      margin-right: 0px;
    }
  }
  .text {
    color: #1565c0;
    font-size: 12px;
    text-transform: capitalize;
    margin-top: 5px;
  }
}

.add-class-card {
  width: 690px;
  .add_classes {
    position: relative;
    cursor: pointer;
    width: 100%;
    outline: 0;
    border: 1.5px dashed #bdc1c6;
    border-radius: 12px;
    background: transparent;
    overflow: hidden;
    text-transform: none !important;
  }
}

.thumbnail {
  margin: 5px 5px 5px 5px;
}

.drop-area {
  outline: 2px #aaa;
  width: 100%;
  min-height: 50px;
  position: relative;
  margin: 0 auto;
}
.dropbox > h2 {
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 2;
}
.input-file {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
}

.container {
  position: relative;
  width: 100%;
  .btn {
    position: absolute;
    top: 25%;
    left: 30%;
    transform: translate(-50%, -50%);
  }
}
</style>
