<template>
  <v-content>
    <v-container grid-list-lg>
      <v-layout row justify-center >
        <v-flex md6 xs12 >
          <div style="text-align:center">
            <h1 class="darkblue-color home-title" style="text-transform: none;">We are DEEPBLOCK </h1>
            <br />
            <p class="darkblue-color deepblock-info-subtitle">
              Make deep learning easier 😎
            </p>
          </div>
        </v-flex>
        <v-flex md12 xs12 justify-center style="text-align:center">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/r7U7hjXC6hM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<style lang="sass" scoped>
.align-right
  width: 85%
  float: right

.deepblock-info-subtitle
  font-size: 1.8em

.home-title
  padding-top: 100px
  font-size: 60px
</style>
