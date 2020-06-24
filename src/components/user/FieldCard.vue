<template>
  <v-content>
    <v-container>
      <div class="d-flex flex-wrap justify-center">
          <v-card class="centeralize" max-width="400" outlined>
            <v-list-item-title class="project-title">
              <div class="headline">
                <v-icon large>mdi-view-headline</v-icon>DeepBlock
              </div>
            </v-list-item-title>
            <v-divider color="#3949AB"></v-divider>
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
.headline
    padding-top: 10px
    padding-bottom: 10px

.project-title
    font-size: 1.5em
    color: #3949AB
</style>
