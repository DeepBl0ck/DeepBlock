<template>
  <div class="board-page">
    <v-row>
      <v-col cols="2">
        <palette />
      </v-col>
      <v-col dense cols="8">
        <board :pID="pID"></board>
      </v-col>
      <v-col cols="2">
        <parameter />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import board from "@/components/board/Board";
import palette from "@/components/board/Palette";
import parameter from "@/components/board/LayerParameter";

export default {
  name: "Model",
  components: {
    board,
    palette,
    parameter,
  },
  props: {
    pID: Number,
  },
  data() {
    return {
      draggable: false,

      mousefunction: {
        type: Function,
      },
    };
  },
  methods: {},
};
</script>

<style lang="sass" scoped>
.board-page
  margin-left: 4%
  margin-right: 4%
</style>
