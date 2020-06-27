<template>
  <v-content>
    <fieldcard>
      <v-card-text class="password-text" style="color: #274555">PASSWORD RECOVER</v-card-text>
      <v-text class="find-password-text darkblue-color">Enter your email to reset your password</v-text>

      <v-form class="find-password-form">
        <v-text-field
          v-model="username"
          id="username"
          label="Username"
          :rules="usernameRules"
          outlined
          dense
        ></v-text-field>
        <v-text-field v-model="email" id="email" label="Email" :rules="emailRules" outlined dense></v-text-field>
        <v-btn @click="onSubmit()" block dark color="#274555">Send email</v-btn>
        <v-layout justify-space-between class="password-link-layout">
          <span
            class="return-link-font underline-hover cursor-pointer"
            @click="$router.push('/login')"
          >Return to login</span>
          <span class="return-link-font underline-hover cursor-pointer" @click="$router.push('/signup')">Sign Up</span>
        </v-layout>
      </v-form>
    </fieldcard>
  </v-content>
</template>

<script>
import FieldCard from "../components/user/FieldCard.vue";
import swal from "@/util/swal";
import auth from "@/service/auth";

export default {
  components: {
    fieldcard: FieldCard
  },
  data() {
    return {
      email: "",
      username: "",
      usernameRules: [
        v => !!v || "UserName is required",
        v =>
          (v && v.length >= 6) || "UserName should be more than 6 characters",
        v =>
          (v && v.length <= 12) || "UserName should be less than 12 characters",
        v => /^[a-z0-9_.]/.test(v) || "only lowercase, _, . can be used"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail should be valid"
      ]
    };
  },
  methods: {
    onSubmit: function() {
      auth
        .findPassword({
          username: this.username,
          email: this.email
        })
        .then(() => {
          swal.success("Please check your email");
          this.$router.push("/login");
        })
        .catch(err => {
          const { message } = err.response
            ? err.response.data
            : "Find Password Error";
          swal.error(message);
        });
    }
  }
};
</script>

<style lang="sass" scoped>
.password-text
  font-size: 1.3em
  padding: 50px 0px 40px 0px

.find-password-text
  font-size: 0.97em

.find-password-form
  padding: 20px 50px 20px 50px

.password-link-layout
  padding: 10px 0px 0px 0px

.return-link-font
  font-size: 14px
</style>
