<template>
  <div class="text-center">
    <v-menu left v-model="computedMenu" offset-y :close-on-content-click="true">
      <template v-slot:activator="{ on }">
        <v-avatar size="27" v-on="on">
          <v-img :src="avatar" style="cursor:pointer"></v-img>
        </v-avatar>
      </template>

      <v-card class="useravatar" outlined>
        <div align="center">
          <v-avatar size="70" @click="avatarDialog = !avatarDialog">
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
          <v-list-item
            v-for="(m, i) in menus"
            :key="i"
            :to="m.route"
            link
          >
            <v-list-item-action>
              <v-icon small>{{m.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-title @click="m.action()"> 
              {{m.title}}
            </v-list-item-title>
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

    <v-dialog v-model="avatarDialog" max-width="300px">
      <v-card class="mx-auto" tile>
        <v-list dense>
          <v-list-item v-for="(profile, i) in profiles" :key="i" :inactive="true">
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

export default {
  props: {
    menu: {
      type: Boolean
    }
  },
  created() {
    this.getAvatar()
  },
  data() {
    return {
      fav: true,
      avatarDialog: false,
      menus: [
        {
          title: "Change password",
          icon: "mdi-lock",
          route: "/checkPassword"
        },
        {
          title: "Unregister",
          icon: "mdi-logout",
          route: "/deleteAccount"
        },
        {
          title: "Logout",
          icon: "mdi-logout",
          action: this.loggingout
        },
      ],
      profiles: [
        {
          title: "Upload Profile",
          action: this.openDialog
        },
        {
          title: "Delete Profile",
          action: this.deleteProfile
        }
      ]
    };
  },
  methods: {
    ...mapActions("auth", ['logout']),
    ...mapActions("avatar", ['getAvatar', 'deleteAvatar', 'updateAvatar']),

    loggingout() {
      console.log('logging out')
      this.logout() // CLEAR_TOKEN
      this.$router.push("/")
        .catch(err => {
          if (err.name !== 'NavigationDuplicated') throw err
        })
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

      this.updateAvatar(formdata, config).then(() => {
        this.getAvatar();
        this.avatarDialog = false
      })
    },

    deleteProfile() {
      this.deleteAvatar().then(() => {
        this.getAvatar();
        this.avatarDialog = false
      });
    }
  },
  computed: {
    ...mapGetters("auth", ["isLoggedin", "username", "email"]),
    ...mapGetters("avatar", ["avatar"]),
    computedMenu: {
      get: function(){
        return this.menu
      },
      set: function(v){
        this.$emit('emitMenu', v)
      }
    }
  }
};
</script>

<style lang="sass">
.useravatar
  width: 260px
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