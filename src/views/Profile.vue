<template>
  <v-content>
    <div class="userAvatar" align="center">
      <v-avatar class="pointerClick" size="130" @click="editProfile = !editProfile">
        <img :src="imageUrl" alt />
      </v-avatar>
      <div class="userInformation">
        <div class="user_title">
          {{ userName }}
          <v-btn class="settingIcon" icon @click="settingAccount = !settingAccount">
            <v-icon small>settings</v-icon>
          </v-btn>
        </div>
        <p class="email">{{ email }}</p>
      </div>
      <div class="userFolder" float>
        <div class="projectCount">
          <h2>6</h2>
          <p>Projects</p>
        </div>
        <div class="projectCount">
          <h2>26</h2>
          <p>Datasets</p>
        </div>
      </div>
    </div>

    <v-dialog v-model="editProfile" max-width="300px">
      <v-card class="mx-auto" max-width="400" tile>
        <v-list dense>
          <v-list-item v-for="(profile, i) in profiles" :key="i" :inactive="true">
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

    <input
      type="file"
      accept="image/jpeg, image/png"
      style="display:none"
      ref="fileInput"
      id="file"
      @change="onFilePicked"
    />

    <v-dialog v-model="settingAccount" max-width="300px">
      <v-card class="mx-auto" max-width="400" tile>
        <v-list dense>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i" :href="item.route">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "profile",
  bodyClass: "profile-page",
  data() {
    return {
      userName: "LucyHorang",
      email: "khmin09015@gmail.com",
      settingAccount: false,
      editProfile: false,
      inactive: true,
      imageUrl: "",
      image: null,
      item: 5,
      items: [
        {
          title: "비밀번호 변경",
          route: "/checkPassword"
        },
        {
          title: "로그아웃",
          route: "/completeDeleteAccount"
        },
        {
          title: "취소",
          route: "/profile"
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
};
</script>

<style lang="sass">
.headline
  font-size: 20px
  
.pointerClick
  cursor: pointer

.userAvatar
  padding: 50px 0px 0px 70px

.userInformation
  padding-top: 10px

.settingIcon
  height: 0px
  width: 0px
  margin: 0 auto

.userFolder
  padding-top: 20px

.projectCount
  width: 150px
  height: 100px
  display: inline-block

.profileList
  font-size: 0.8125rem
  font-weight: 500
  line-height: 1rem

.user_title
  display: block
  font-size: 1.17em
  margin-block-start: 1em
  margin-block-end: 1em
  margin-inline-start: 0px
  margin-inline-end: 0px
  margin-bottom: 0px
  font-weight: bold
</style>
