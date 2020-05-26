<template>
  <v-content>
    <div class="userAvatar" align="center">
      <v-avatar size="130">
        <img src="../assets/lucy.jpg" alt />
      </v-avatar>
      <div class="userInformation">
        <div class="user_title">
          {{ userName }}
          <v-btn
            class="settingIcon"
            icon
            @click="settingAccount = !settingAccount"
          >
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

    <v-dialog v-model="settingAccount" max-width="300px">
      <v-card class="mx-auto" max-width="400" tile>
        <v-list dense>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :inactive="inactive"
              :href="item.route"
            >
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>

    <!-- <v-dialog>
      <v-card>
        <v-list>

        </v-list>
      </v-card>
    </v-dialog> -->
  </v-content>
</template>
<script>
export default {
  name: "profile",
  bodyClass: "profile-page",
  data() {
    return {
      userName: "LucyHorang",
      email: "khmin09015@gmail.com",
      settingAccount: false,
      item: 5,
      items: [
        {
          title: "비밀번호 변경",
          route: "/checkPassword",
        },
        {
          title: "프로필 편집",
          route: "/changeProfile",
        },
        {
          title: "로그아웃",
          route: "/completeDeleteAccount",
        },
        {
          title: "취소",
          route: "/profile",
        },
      ],
    };
  },
};
</script>

<style lang="sass">
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
