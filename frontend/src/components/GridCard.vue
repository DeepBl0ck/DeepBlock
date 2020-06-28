<template>
  <div class="grid-card-area">
    <v-card class="mx-auto grid-card darkblue-color" max-width="width" height="250px" @click="route">
      <div class="image-div">
        <v-img class="grid-card-image" :src="item.src" height="150px" />
      </div>

      <div v-if="withButton" class="grid-card-delete-button" @mousedown="remove">
        <v-icon color="#FFFFFF" dense>mdi-close</v-icon>
      </div>
      <v-card-title>{{item.title}}</v-card-title>
      <v-card-subtitle class="text-left">{{item.subtitle}}</v-card-subtitle>
    </v-card>

      
  </div>
</template>

<script>
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
    route() {
      this.$emit("route")
    },
    remove() {
      this.$emit('remove', {index: this.item.id})
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