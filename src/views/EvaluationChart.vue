<template>
<!-- Evaluation Chart가 보여지는 View File -->
  <v-content>
    <Evaluation />
    <rightnavibar />
    <leftnavibar />
  </v-content>
</template>

<script>
import leftnavibar from "@/components/LeftNavibar";
import rightnavibar from "@/components/RightNavibar";
import Evaluation from "@/components/board/Evaluation";
export default {
  components: {
    leftnavibar,
    rightnavibar,
    Evaluation,
  },
};
</script>

<style lang="sass"></style>