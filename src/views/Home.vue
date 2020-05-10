<template>
  <v-content>
    <h1>{{ text }}</h1>
    <img :src="changeImg(dog)" />
    <v-btn @click="dog = !dog">change IMG</v-btn>
  </v-content>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      text: "This is Home page.",
      dog: true
    };
  },
  methods: {
    changeImg: function(dog) {
      if (dog) {
        return "https://media1.tenor.com/images/bcbb279dee67e5a9d6a22238977a1591/tenor.gif?itemid=12759384";
      } else {
        return "https://i.pinimg.com/originals/06/ff/53/06ff53c749e73112fee56c3cf9d5f606.gif";
      }
    }
  }
};
</script>
