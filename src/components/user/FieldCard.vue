<template>
  <v-content>
    <v-container>
      <div id="card-area" class="d-flex flex-wrap justify-center align-center">
        <v-card class="centeralize" min-width="400" max-width="400" outlined>
          <div style="padding-top: 10px;
    padding-bottom: 10px">
            <span class="lightorange-color deep-font-size">DEEP</span>
            <span class="darkblue-color block-font-size block-font-bold">BLOCK</span>
          </div>
          <v-divider class="darkblue-color"></v-divider>
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
  }
};
</script>

<style lang="sass">
.deep-font-size, .block-font-size
  font-size: 1.5em

.block-font-bold
  font-weight: bold

#card-area
  .theme--light.v-divider 
    border-color: #274555

</style>
