<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <palette />
      </v-col>
      <v-col dense cols="7">
        <block :pID="pID"></block>
      </v-col>
      <v-col cols="2">
        <parameter />
      </v-col>
    </v-row>
  </v-container>
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
