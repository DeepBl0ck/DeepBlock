<template>
  <v-content>
    <v-container>
      <grid
        :draggable="false"
        :sortable="true"
        :items="datasets"
        :cellWidth="212"
        :cellHeight="272"
        :gridWidth="1100"
        @remove="remove"
      >
        <template slot="cell" slot-scope="props">
          <template v-if="props.item.type === 'add'">
            <v-row
              justify="center"
              align-content="center"
              id="add-button"
              class="add-button"
              style="height: 100%; padding: 12px;"
            >
              <v-btn fab color="#42b983" @click="addDataset">
                <v-icon color="white">mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </template>
          <template v-else>
            <gridcard :item="props.item" :withButton="true" @remove="props.remove()" />
          </template>
        </template>
      </grid>
      <v-btn @click="getDataset()">test</v-btn>
    </v-container>
  </v-content>
</template>

<script>
import GridCard from "../components/GridCard.vue";

export default {
  components: {
    gridcard: GridCard
  },
  data() {
    return {
      datasets: [
        {
          type: "add"
        },
        {
          src: "https://miro.medium.com/max/245/1*nlfLUgHUEj5vW7WVJpxY-g.png",
          title: "MNIST",
          subtitle: "handwritten digits"
        },
        {
          src:
            "https://storage.googleapis.com/kaggle-competitions/kaggle/3362/media/woof_meow.jpg",
          title: "Cats vs Dogs",
          subtitle: "Ellie Goulding"
        }
      ]
    };
  },
  methods: {
    getDataset() {
      this.$axios
        .get(`/u/dataset`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addDataset: function() {
      this.datasets.push({
        src: `https://storage.googleapis.com/kaggle-competitions/kaggle/3362/media/woof_meow.jpg`,
        title: "Test",
        subtitle: "subtitle Test"
      });
      // #TODO: 서버에서 데이터 가져오기
    },
    remove(event) {
      console.log("remove", event);
    }
  }
};
</script>

<style lang="scss">
.add-button {
  height: 100%;
  padding: 12px;
}
.add_dataset {
  position: relative;
  cursor: pointer;
  width: 100%;
  outline: 0;
  border: 1.5px dashed #bdc1c6;
  border-radius: 4px;
  background: transparent;
  overflow: hidden;
  text-transform: none !important;
}
</style>