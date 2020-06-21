<template>
  <div class="board-page">
    <v-row>
      <v-col cols="2">
        <palette />
      </v-col>
      <v-col dense cols="8">
        <block :pID="pID"></block>
      </v-col>
      <v-col cols="2">
        <parameter />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import block from "@/components/board/Block";
import palette from "@/components/board/Palette";
import parameter from "@/components/board/LayerParameter";

export default {
  name: "Board",
  components: {
    block,
    palette,
    parameter
  },
  props: {
    pID: Number
  },
  data() {
    return {
      draggable: false,

      mousefunction: {
        type: Function
      }
    };
  },
  methods: {}
};
</script>

<style lang="sass" scoped>
.board-page
  margin-left: 4%
  margin-right: 4%

</style>