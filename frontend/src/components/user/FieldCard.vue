<template>
  <v-content>
    <v-container>
      <div class="d-flex flex-wrap justify-center">
          <v-card class="centeralize" min-width="400" max-width="400" outlined>
            <v-list-item-title class="project-title">DEEPBLOCK
            </v-list-item-title>
            <v-divider color="#1e5f8d"></v-divider>
            <slot></slot>
          </v-card>
          </div>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "FieldCard",
  props: {
    width: {
      type: String
    }
  },
  data() {
    return {};
  },
};
</script>

<style lang="sass" scoped>
.project-title
    font-size: 1.5em
    color: #1e5f8d
    padding-top: 10px
    padding-bottom: 10px
</style>
