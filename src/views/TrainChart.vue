<template>
<!-- Train Chart가 보여지는 View File -->
  <v-content>
    <Train />
    <rightnavibar />
    <leftnavibar />
  </v-content>
</template>

<script>
import leftnavibar from "@/components/LeftNavibar";
import rightnavibar from "@/components/RightNavibar";
import Train from "@/components/board/Train";
export default {
  components: {
    leftnavibar,
    rightnavibar,
    Train,
  },
};
</script>

<style lang="sass"></style>
