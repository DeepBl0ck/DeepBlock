<template>
  <div class="grid-card-area">
    <v-card
      class="mx-auto grid-card"
      max-width="200"
      height="260px"
      :class="withButton? 'icon-delete-btn' : ''"
      @mousedown="handleMousedown"
    >
      <v-img :src="item.src" height="150px" />
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
      type: Boolean
    },
    mousefunction: {
      type: Function
    }
  },
  computed: {},
  methods: {
    handleMousedown() {
      this.$emit('mousefunction', this.item);
    }
  }
};
</script>
<style lang="scss" scoped>
.grid-card-area {
  padding: 12px;
}
</style>