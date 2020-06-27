<template>
  <v-list nav elevation dense expand>
    <v-list-item>
      <v-list-item-content class="search-bar">
        <v-text-field
          v-model="searchlayer"
          placeholder="search"
          prepend-inner-icon="mdi-magnify"
          @input="search"
        />
      </v-list-item-content>
    </v-list-item>

    <v-list-group
      class="layername"
      v-for="(layername, i) in layersname"
      :key="i"
    >
      <template v-slot:activator>
        <v-list-item-title
          :class="$mq"
          @click="layername.show = !layername.show"
        >
          <v-icon style="margin-right: 8%">mdi-layers</v-icon>
          {{ layername.name }}
        </v-list-item-title>
      </template>

      <div v-show="true">
        <draggable
          class="layers"
          :list="layers"
          :group="{ type: 'layer', pull: 'clone' }"
          :clone="cloneLayer"
        >
          <template v-for="(layer, i) in layers">
            <v-list-item
              v-if="layername.key === layer.key"
              class="layers-list"
              :class="[$mq, layer.key]"
              :key="i"
              :group="{ type: 'key', put: false }"
              dense
              text-center
              >{{ layer.type }}</v-list-item
            >
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
    cloneLayer: function({ key, type, ID, required, advanced }) {
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
    search: function() {
      if (!this.searchlayer) {
        this.layers = this.layerCopy;
      }
      this.layers = this.layers.filter((layer) => {
        return (
          layer.type.toLowerCase().indexOf(this.searchlayer.toLowerCase()) > -1
        );
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
  .sm
    font-size: 6px !important
  .md
    font-size: 8px !important
  .lg
    font-size: 13px !important
  .xl
    font-size: 18px !important

.layers
  .sm
    max-height: 8px !important
  .md
    max-height: 10px !important
  .lg
    max-height: 15px !important
  .xl
    max-height: 20px !important
  .basic
    background: #BDBDBD
    border: 2px solid #5D5D5D
    font-weight: bold
  .convol
    background: #E1BEE7
    border: 2px solid #AB47BC
    font-weight: bold
  .nomalization
    background: #DCE775
    border: 2px solid #827717
    font-weight: bold
  .pooling
    background: #B2DFDB
    border: 2px solid #26A69A
    font-weight: bold
  .inputs
    background: #FFA7A7
    border: 2px solid #980000
    font-weight: bold

.search-bar
  padding: 2%

.block
  width: 50%
  font-size: 100%
  height: auto
  margin-left: 5%
</style>
