<template>
  <div class="text-center">
    <v-menu left v-model="menu" offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <v-avatar size="27" v-on="on">
          <v-img src="../assets/lucy.jpg" style="cursor:pointer"></v-img>
        </v-avatar>
      </template>

      <v-card class="useravatar" outlined>
        <div align="center">
          <v-avatar size="70" @click="editProfile = !editProfile">
            <v-img src="../assets/lucy.jpg" style="cursor:pointer"></v-img>
          </v-avatar>

          <div class="userdata">
            <div class="username">{{ username }}</div>
            <p class="email">{{ email }}</p>
          </div>

          <v-layout row>
            <v-flex>
              <div class="datacount">
                <h3>6</h3>
                <p class>Projects</p>
              </div>
            </v-flex>
            <v-flex>
              <div class="datacount">
                <h3>26</h3>
                <p>Datasets</p>
              </div>
            </v-flex>
          </v-layout>
        </div>

        <v-divider></v-divider>
        <v-list>
          <v-list-item v-for="menu in menus" :key="menu" :href="menu.route" class="pointerClick">
            <v-list-item-action>
              <v-icon small>{{menu.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title @click="menu.action()">{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <input
      type="file"
      accept="image/jpeg, image/png"
      style="display:none"
      ref="fileInput"
      id="file"
      @change="onFilePicked"
    />

    <v-dialog v-model="editProfile" max-width="300px">
      <v-card class="mx-auto" max-width="300" tile>
        <v-list dense>
          <v-list-item v-for="profile in profiles" :key="profile" :inactive="true">
            <v-list-item-content>
              <v-list-item-title class="pointerClick" @click="profile.action()">
                {{
                profile.title
                }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: {
    menu: {
      type: Boolean
    }
  },
  data() {
    return {
      fav: true,
      username: "LucyHorang",
      email: "kimchi0090@gmail.com",
      editProfile: false,
      menus: [
        {
          title: "비밀번호 변경",
          icon: "mdi-lock",
          route: "/checkPassword"
        },
        {
          title: "로그아웃",
          icon: "mdi-logout",
          action: this.logout
        }
      ],
      profiles: [
        {
          title: "프로필 업로드",
          action: this.openDialog
        },
        {
          title: "프로필 삭제"
        }
      ]
    };
  },
  methods: {
    
    openDialog() {
      //TODO: pick profile and upload to server
      return new Promise(() => {
        this.$refs.fileInput.click();
      });
    },
    onFilePicked() {
      let data = new FormData();
      let file = this.$refs.fileInput.files[0];

      data.append("name", "filename");
      data.append("avatar", file);
      let config = {
        header: {
          ContentType: "multipart/form-data"
        }
      };
      this.$axios
        .put("/u/avatar", data, config)
        .then(response => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Congratulation",
              text: response.data.message
            });
            location.href = "./profile";
          }
        })
        .catch(err => {
          if (err.response.status === 401)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data.message
            });
        })
        .catch(err => {
          if (err.response.status === 500)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data.message
            });
        });
    }
  }
}
</script>

<style lang="sass">
.useravatar
  padding: 30px 10px 10px 10px

.userinfo
  padding-top: 100px

.username
  margin-top: 10px
  font-weight: bold 

.email
  font-size: 13px

.userdata
  padding-top: 5px

.datacount
  width: 120px
  height: 100%

</style>