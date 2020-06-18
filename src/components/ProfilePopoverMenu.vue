<template>
  <div class="text-center">
    <v-menu left v-model="menu" offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <v-avatar size="27" v-on="on">
          <v-img :src="avatar" style="cursor:pointer"></v-img>
        </v-avatar>
      </template>

      <v-card class="useravatar" outlined>
        <div align="center">
          <v-avatar size="70" @click="editProfile = !editProfile">
            <v-img :src="avatar" style="cursor:pointer"></v-img>
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
          <v-list-item v-for="(menu, i) in menus" :key="i" :href="menu.route" class="pointerClick">
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
          <v-list-item v-for="(profile,i) in profiles" :key="i" :inactive="true">
            <v-list-item-content>
              <v-list-item-title class="pointerClick" @click="profile.action()">{{profile.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { GET_AVATAR, DELETE_AVATAR, UPDATE_AVATAR } from "@/store/avatar";
import { LOGOUT } from "@/store/auth";

export default {
  props: {
    menu: {
      type: Boolean
    }
  },
  created() {
    this[GET_AVATAR]().catch(err => {
      console.log(`profilepopovermenu :: ${err}`);
    });
  },
  data() {
    return {
      fav: true,
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
        },
        {
          title: "회원탈퇴",
          icon: "mdi-logout",
          route: "/deleteAccount"
        }
      ],
      profiles: [
        {
          title: "프로필 업로드",
          action: this.openDialog
        },
        {
          title: "프로필 삭제",
          action: this.deleteProfile
        }
      ]
    };
  },
  methods: {
    ...mapActions("auth", [LOGOUT]),
    ...mapActions("avatar", [GET_AVATAR, DELETE_AVATAR, UPDATE_AVATAR]),
    logout() {
      this[LOGOUT];
    },
    openDialog() {
      //TODO: pick profile and upload to server
      return new Promise(() => {
        this.$refs.fileInput.click();
      });
    },
    onFilePicked() {
      let formdata = new FormData();
      formdata.append("name", "filename");
      formdata.append("avatar", this.$refs.fileInput.files[0]);

      let config = {
        header: {
          ContentType: "multipart/form-data"
        }
      };

      console.log("profilepopovermenu:: " + formdata);
      this[UPDATE_AVATAR](formdata, config).then(() => {
        this[GET_AVATAR]();
      });
    },
    deleteProfile() {
      this[DELETE_AVATAR]().then(() => {
        this[GET_AVATAR]();
      });
    }
  },
  computed: {
    ...mapGetters("auth", ["isLoggedin", "username", "email"]),
    ...mapGetters("avatar", ["avatar"])
  }
};
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