<template>
  <v-container>
    <div class="card-area" style="display:inline-block">
      <template v-for="(c, i) in this.classes">
        <v-card :key="i" width="650" color="#ffffff" class="c">
          <v-card-title class="card-title">
            <input
              v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 0}"
              v-model="c.title"
              color="#1565C0"
              required
              onfocus="this.select()"
              :disabled="!c.nowModify"
            />
            <v-btn small fab text color="gray" @click="fixTitle(c)">
              <v-icon v-show="!c.nowModify" color="#BDC1C6">mdi-lock-open-outline</v-icon>
              <v-icon v-show="c.nowModify" color="#BDC1C6">mdi-lock-outline</v-icon>
            </v-btn>
            <v-spacer></v-spacer>

            <v-menu bottom right offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(menu, i) in menus"
                  :key="i"
                  @click="clickMenu(menu)"
                >{{menu.title}}</v-list-item>
              </v-list>
            </v-menu>

            <v-btn icon @click="c.show=!c.show">
              <v-icon>{{ c.show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-expand-transition>
            <div v-show="c.show">
              <v-card-subtitle v-if="c.data.length<=0">
                <div class="sub-title">Add Image Samples:</div>
                <div class="button-area">
                  <v-btn width="80" height="60" color="#E3F2FD" large depressed claass="icon-btn">
                    <v-icon color="#1565C0">mdi-cloud-upload</v-icon>
                    <div class="text">Upload</div>
                  </v-btn>
                </div>
              </v-card-subtitle>

              <!-- if images -->
              <v-card-subtitle v-else>
                
                <template v-for="(data, i) in c.data">
                  <img :src="data.image" :key="i" width="80" height="60" class="thumbnail" />
                </template>
                <v-pagination v-model="page" :length="5">
                </v-pagination>
              </v-card-subtitle>

              <!-- if csv -->
            </div>
          </v-expand-transition>
        </v-card>
      </template>

      <v-card-subtitle>
        <v-btn
          class="add_classes"
          color="rgba(0, 0, 0, 0.6)"
          text
          style="padding:30px; height:unset"
          @click="addClass"
        >
          <v-icon>mdi-plus-box</v-icon>
          <div class="sub-title" style="margin-left:5px">Add a class</div>
        </v-btn>
      </v-card-subtitle>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      show: true,
      menus: [
        { title: "Delete Class" },
        { title: "Test" },
        { title: "Remove All Samples" }
      ],
      classes: [
        {
          title: "Class 1",
          nowModify: false,
          show: true,
          data: [
            {
              id: 1,
              image:
                "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg"
            },
            {
              id: 2,
              image:
                "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg"
            },
            {
              id: 3,
              image:
                "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg"
            },
            {
              id: 4,
              image:
                "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg"
            },
            {
              id: 5,
              image:
                "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg"
            },
            {
              id: 6,
              image:
                "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg"
            }
          ]
        },
        {
          title: "Class 2",
          nowModify: false,
          show: true,
          data: []
        }
      ]
    };
  },
  methods: {
    movePage: function() {
      // [TODO] server로부터 이미지 idx, src 받아와야함
    },
    addClass: function() {
      this.classes.push({
        title: `Class ${this.classes.length + 1}`,
        nowModify: false,
        show: true,
        data: []
      });
    },
    fixTitle: function(c) {
      c.nowModify = !c.nowModify;
    },
    clickMenu: function(menu) {
      console.log(menu.title);
    },
    deleteItem(data, item) {
      const index = data.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        data.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
.card-area {
  .v-card.c {
    border-radius: 12px;
    margin: 20px;
  }
  .card-title {
    padding: 8px 16px;
    font-size: 20px;
    font-weight: 500;
  }
}
.sub-title {
  font-size: 16px;
  font-weight: 500;
}
.button-area {
  margin-top: 15px;
  .v-btn__content {
    flex-direction: column;
  }
  .icon-btn {
    margin: 0 3px;
    &:first-of-type {
      margin-left: 0px;
    }
    &:last-of-type {
      margin-right: 0px;
    }
  }
  .text {
    color: #1565c0;
    font-size: 12px;
    text-transform: capitalize;
    margin-top: 5px;
  }
}
.add_classes {
  position: relative;
  cursor: pointer;
  width: 100%;
  outline: 0;
  border: 1.5px dashed #bdc1c6;
  border-radius: 12px;
  background: transparent;
  overflow: hidden;
  text-transform: none !important;
}
.thumbnail {
  margin: 5px 5px 5px 5px;
}
</style>