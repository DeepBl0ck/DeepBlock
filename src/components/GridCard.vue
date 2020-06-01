<template>
  <div class="grid-card-area">
    <v-card class="mx-auto grid-card" max-width="width" height="250px">
      <div class="image-div">
        <v-img class="grid-card-image" :src="item.src" height="150px" />
      </div>

      <div v-if="withButton" class="grid-card-delete-button" @mousedown="remove">
        <v-icon color="#FFFFFF" dense>mdi-close</v-icon>
      </div>
      <v-card-title>{{item.title}}</v-card-title>
      <v-card-subtitle class="text-left">{{item.subtitle}}</v-card-subtitle>
    </v-card>

    <v-dialog v-model="removeDialog" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Are you sure?</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                Please type
                <span style="color:#cb2431">"remove"</span> if you want to remove.
                <v-text-field
                  v-model="isConfirm"
                  solo
                  dense
                  placeholder="remove"
                  width="10px"
                  style="margin-top:30px"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="remove" color="red">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "GridCard",
  props: {
    item: {
      type: Object
    },
    withButton: {
      type: Boolean,
      default: true
    },
    api: {
      type: String
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  computed: {},
  data() {
    return {
      removeDialog: false,
      isConfirm: ""
    };
  },
  methods: {
    remove() {
      this.removeDialog = true;
      if (this.isConfirm !== "remove") return false;
      this.$axios
        .delete(`${this.api}${this.item.id}`)
        .then(res => {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Sccuess",
            text: res.data.message
          });
          this.$emit("remove", {
            index: this.index
          });
          // location.reload()
        })
        .catch(err => {
          console.log(err);
          let msg = ''
          if(err.data.message){
            msg = err.data.message
          }
          Swal.fire({
            icon: "error",
            title: "Oops",
            text: msg
          });
          // location.reload()
        });
      this.removeDialog = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.grid-card-area {
  padding: 12px;
  .grid-card {
    cursor: pointer;
    .image-div {
      overflow: hidden;
    }
    &:hover .grid-card-delete-button {
      height: 8px;
      right: 8px;
      top: 6px;
    }
    &:hover .grid-card-image {
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
      filter: brightness(40%);
    }
    .grid-card-image {
      -webkit-transition: all 0.7s ease;
      transition: all 0.7s ease;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
}
.grid-card-delete-button {
  position: absolute;
  display: hidden;
}
</style>