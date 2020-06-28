<template>
  <v-content> </v-content>
</template>

<script>
import swal from "@/util/swal";
import auth from "@/service/auth";

export default {
  name: "VerifyEmail",
  data() {
    return {
      key: this.$route.query.key,
    };
  },
  created() {
    auth
      .verifyEmail(this.key)
      .then(() => {
        swal.success("Welcome!");
        this.$router.push("./login");
      })
      .catch((err) => {
        let { message } = err.response ? err.response.data : "verify error";
        swal.error(message);
      });
  },
};
</script>
