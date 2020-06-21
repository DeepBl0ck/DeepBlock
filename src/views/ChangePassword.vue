<template>
  <v-content>
    <fieldcard>
      <v-card-text class="change-password-title" style="color: #3949AB">CHANGE TO PASSWORD</v-card-text>
      <v-form class="change-form">
        <v-text-field
          class="password-field"
          v-model="afterpw"
          label="Password"
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-text-field
          v-model="afterpw_verify"
          label="Confirm Password"
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-btn class="changeBtn" small dark color="indigo" @click="onSubmit()">Change</v-btn>
      </v-form>
    </fieldcard>
  </v-content>
</template>

<script>
import FieldCard from "../components/user/FieldCard.vue";
import auth from "@/service/auth";
import swal from "@/util/swal"

export default {
  components: {
    fieldcard: FieldCard
  },
  data() {
    return {
      afterpw: "",
      afterpw_verify: "",
      showPassword: false,
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password should be more than 8 characters",
        v => (v && v.length <= 20) || "Password should be less than 20 characters"
      ]
    };
  },
  methods: {
    onSubmit: function () {
      auth.changePassword({
        after_password: this.afterpw,
        after_password_verify: this.afterpw_verify
      })
        .then(res => {
          swal.success(res.data.message)
          this.$router.push("/")
        })
        .catch(err => {
          const { message } = err.response ? err.response.data : err
          swal.error(message)
        })
      
    }
  }
};
</script>

<style lang="sass" scoped>
.change-form
  padding: 0px 50px 20px 50px
  
.change-password-title
  font-size: 1.3em
  padding: 50px 0px 10px 0px

.password-field
  padding-top: 30px

.change-button
  margin-left: 190px
</style>
