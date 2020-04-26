<template>
  <v-content>
    <v-row align="center">
      <v-col align="center">
        <h1>{{ text }}</h1>
        <img :src="changeImg(dog)" alt=""> 
        <!--v-show는 왜 안써
        v-show 는 true면 보여주고 false면 안보여줌 (display: true, false 이런식으로 구현됨)
        근데 하나의 img tag에는 하나의 그림만 표현되잖아
        그러니까 v-show쓰려면 2개의 img 태그를 써야됨 
        == 코드 길어짐 == 가독성 떨어짐
        그래서 그냥 함수로 렌더링 하는거임? ㅇ응 -->
        <!-- 함수명은 camelcase로 change_img(X) changeImg(O) -->
        <v-btn @click="dog= !dog">change IMG</v-btn>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      text: 'This is Home page.',
      dog: true
    }
  },
  methods: {
    changeImg: function(dog) {
      if (dog) {
        return 'https://media1.tenor.com/images/bcbb279dee67e5a9d6a22238977a1591/tenor.gif?itemid=12759384'
      } else {
        return 'https://i.pinimg.com/originals/06/ff/53/06ff53c749e73112fee56c3cf9d5f606.gif'
      }
    }
  }
}
</script>
