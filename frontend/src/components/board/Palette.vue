<template>
  <v-list nav elevation dense expand>
    <v-list-item>
      <v-list-item-content class="search-bar">
        <v-text-field v-model="searchlayer" placeholder="search" prepend-inner-icon="mdi-magnify" @input="search" />
      </v-list-item-content>
    </v-list-item>

    <v-list-group class="layername" v-for="(layername, i) in layersname" :key="i">
      <template v-slot:activator>
        <v-list-item-title :class="$mq" @click="layername.show = !layername.show">
          <v-icon style="margin-right: 8%;">mdi-layers</v-icon>
          {{ layername.name }}
        </v-list-item-title>
      </template>

      <div v-show="true">
        <draggable class="layers" :list="layers" :group="{ type: 'layer', pull: 'clone' }" :clone="cloneLayer">
          <template v-for="(layer, i) in layers">
            <v-list-item v-if="layername.key === layer.key" class="layers-list" :class="[$mq, layer.key]" :key="i" :group="{ type: 'key', put: false }" dense text-center>{{ layer.type }}</v-list-item>
          </template>
        </draggable>
      </div>
    </v-list-group>
  </v-list>
</template>

<script>
import draggable from "vuedraggable";
import layer from "@/data/Layer.json";

export default {
  name: "palette",
  components: {
    draggable,
  },
  data() {
    return {
      show: "false",
      searchlayer: "",
      layers: layer.layers,
      layersname: layer.layersname,
      layerCopy: [],
    };
  },
  mounted() {
    this.layerCopy = [...this.layers];
  },
  methods: {
    cloneLayer: function ({ key, type, ID, required, advanced }) {
      for (let layer of this.layers) {
        if (key === layer.key) {
          return {
            key: key,
            type: type,
            ID: ID,
            required: { ...required },
            advanced: { ...advanced },
          };
        }
      }
    },
    search: function () {
      if (!this.searchlayer) {
        this.layers = this.layerCopy;
      }
      this.layers = this.layers.filter((layer) => {
        return layer.type.toLowerCase().indexOf(this.searchlayer.toLowerCase()) > -1;
      });
    },
  },
};
</script>

<style lang="sass" scoped>
#searchbtn
  margin-top: 5%
  align: end

.layername
  padding-top: 20px
  .xs
    font-size: 8px !important
  .sm
    font-size: 10px !important
  .md
    font-size: 13px !important
  .lg
    font-size: 15px !important
  .xl
    font-size: 20px !important

.layers
  .xs
    max-height: 8 !important
  .sm
    max-height: 10px !important
  .md
    max-height: 13px !important
  .lg
    max-height: 15px !important
  .xl
    max-height: 20px !important
  .basic
    background: #324b73
    border: 2px solid #F0E5DE
    font-weight: bold
    font-color: #F0E5DE
  .convol
    background: #6d819c
    border: 2px solid #F0E5DE
    font-weight: bold
  .nomalization
    background: #e4e7ec
    border: 2px solid #F0E5DE
    font-weight: bold
  .pooling
    background: #55967e
    border: 2px solid #F0E5DE
    font-weight: bold
  .inputs
    background: #C5E99B
    border: 2px solid #F0E5DE
    font-weight: bold


.search-bar
  padding: 2%

.block
  width: 50%
  font-size: 100%
  height: auto
  margin-left: 5%
</style>
