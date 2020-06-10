<template>
  <v-content>
    <h1>{{ text }}</h1>
  </v-content>
</template>


<script>

import Swal from "sweetalert2";
export default {
  name: "VerifyEmail",
  components: {},
  data() {
    return {
      text: "Email authentication success",
      key: this.$route.query.key
    };
  },
  created() {
    this.$axios
      .get(`/verifyemail?key=${this.key}`)
      .then(res => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Welcome!!",
            text: res.data.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push('./login');
        }
      })
      .catch(err => {
        let msg = "";
        if (err.res.data.message) {
          msg = err.res.data.message;
        }
        Swal.fire({
          icon: "error",
          text: msg
        });
      });
  }
};
</script>
