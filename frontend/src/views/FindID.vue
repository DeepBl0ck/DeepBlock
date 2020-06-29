<template>
  <v-content>
    <fieldcard>
      <v-card-text class="find-id-text" style="color: #274555">Find ID</v-card-text>
      <v-text class="find-text darkblue-color">Enter your email to send your ID</v-text>

      <v-form class="find-id-form">
        <v-text-field v-model="email" label="Email" :rules="emailRules" outlined dense></v-text-field>
        <v-btn @click="onSubmit()" block dark color="#274555">Send email</v-btn>

        <v-layout justify-space-between class="username-link-layout">
          <span
            class="return-route-font darkblue-color underline-hover cursor-pointer"
            @click="$router.push('/login')"
          >Return to login</span>
          <span
            class="return-route-font darkblue-color underline-hover cursor-pointer"
            @click="$router.push('/signup')"
          >Sign Up</span>
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
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail should be valid"
      ]
    };
  },
  methods: {
    onSubmit() {
      auth
        .findID({
          email: this.email
        })
        .then(() => {
          swal.success("Please check your email");
          this.$router.push("/login");
        })
        .catch(err => {
          let { message } = err.response ? err.response.data : "Find ID Error";
          swal.error(message);
        });
    }
  }
};
</script>

<style lang="sass" scoped>
.find-id-text
  font-size: 1.3em
  padding: 50px 0px 40px 0px

.find-tex
  font-size: 0.97em

.find-id-form
  padding: 20px 50px 20px 50px

.username-link-layout
  padding: 10px 0px 0px 0px

.return-route-font
  font-size: 14px
</style>
