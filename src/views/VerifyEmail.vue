<template>
  <v-content>
    <h1>{{ text }}</h1>
  </v-content>
</template>


<script>

import { apiserver } from "./apiserver";
import Swal from "sweetalert2";
export default {
  name: "VerifyEmail",
  components: {},
  data() {
    return {
      text: "Email authentication success",
      key: this.$route.query.key,
    };
  },
<<<<<<< HEAD
  created(){
    this.$axios
      .get(`${apiserver}/verifyemail?key=${this.key}`)
=======
  beforeMount(){
    this.axios
      .get(`/verifyemail?key=${this.key}`)
>>>>>>> connect-server
      .then(response => {
        console.log(this.key);
        if(response.status === 200){
          Swal.fire({
            icon: "success",
            title: 'Welcome!!',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500
          });
          location.href = "./login"
        }
      })
      .catch(err => {
        if(err.response.status === 409){
          Swal.fire({
            icon: "error",
            title: 'Error!!',
            text: err.response.data.message,
          });
          location.href = "./login"
        }
      })
  },
};
</script>
