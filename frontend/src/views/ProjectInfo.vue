<template>
  <v-content class="text-left">
    <v-tabs height="48px" background-color="#79a8a9" centered dark icons-and-text>
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="(item, i) in items" :key="i">
        {{ item }}
      </v-tab>

      <v-tab-item>
        <model :pID="projectID" />
      </v-tab-item>
      <v-tab-item>
        <train :pID="projectID" />
      </v-tab-item>
      <v-tab-item>
        <evaluation :pID="projectID" />
      </v-tab-item>
    </v-tabs>
  </v-content>
</template>

<script>
import model from "@/components/board/Model";
import train from "@/components/board/Train";
import evaluation from "@/components/board/Evaluation";

export default {
  name: "ProjectInfo",
  components: {
    model,
    train,
    evaluation,
  },
  data() {
    return {
      projectID: this.$route.query.project_id,
      items: ["model", "train", "evaluation"],
    };
  },
};
</script>

<style lang="sass">
.plustabs
  margin-top: 8px
</style>
