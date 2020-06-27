<template>
  <v-content>
    <fieldcard class="max auto">
      <v-card-text class="signup-text" style="color: #274555">CREATE YOUR ACCOUNT</v-card-text>
      <p style="color:red" v-show="this.message">{{message}}</p>
      <v-form class="signup-form">
        <v-text-field
          v-model="user.username"
          label="Username"
          :rules="usernameRules"
          outlined
          dense
        ></v-text-field>
        <v-text-field v-model="user.email" label="Email" :rules="emailRules" outlined dense></v-text-field>
        <v-text-field
          v-model="user.password"
          label="Password"
          outlined
          dense
          :rules="passwordRules"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-btn @click="onSubmit(this)" block dark color="#274555">Sign Up</v-btn>
        <div class="signup-link-text darkblue-color">
          Already have an account?
          <a class="underline-hover" @click="$router.push('/login')" style="color:#f9a11b">Login!</a>
        </div>
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
      user: {
        username: "",
        password: "",
        email: ""
      },
      message: "",
      showPassword: false,
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
        v => (v && v.length < 40) || "Email should be less than 40 characters",
        v => /.+@.+\..+/.test(v) || "E-mail should be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          (v && v.length >= 8) || "Password should be more than 8 characters",
        v =>
          (v && v.length <= 20) || "Password should be less than 20 characters"
      ]
    };
  },
  methods: {
    onSubmit() {
      auth
        .register(this.user)
        .then(res => {
          swal.success(res.data.message);
          this.$router.push("./login");
        })
        .catch(err => {
          const { message } = err.response
            ? err.response.data
            : "register error";
          // swal.error(message)
          this.message = message;
        });
    }
  }
};
</script>

<style lang="sass" >
.signup-text
  font-size: 1.2em
  padding: 50px 0px 40px 0px

.signup-form
  padding: 20px 50px 10px 50px

.signup-link-text
  padding: 10px 0px 10px 0px
</style>
