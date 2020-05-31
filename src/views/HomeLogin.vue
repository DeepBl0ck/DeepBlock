<template>
  <v-content>
    <v-container grid-list-xl>
      <v-layout align-center justify-center row>
        <v-flex md6 xs12>
          <div>
            <h2>Built by Developer</h2>
            <p class="subTitle">Deep Block is a development platform inspired by how to learn deep learning. Build blocks for deep learning and derive results. Blocks can be coded.</p>
          </div>
        </v-flex>
        <v-flex md6  xs12>
          <div class="textcenter">
            <v-card icon max-width="400">
              <v-list-item-title class="mainSignupTitle">
                <div class="mainIconHeadline">
                  <v-icon large>mdi-view-headline</v-icon>DeepBlock
                </div>
              </v-list-item-title>
              <v-divider color="#3949AB"></v-divider>

              <v-card-text class="mainTitle" style="color: #3949AB">CREATE YOUR ACCOUNT</v-card-text>

              <v-form class="mainSinupForm">
                <v-text-field
                  v-model="username"
                  label="Username"
                  :rules="usernameRules"
                  outlined
                  dense
                ></v-text-field>
                <v-text-field v-model="email" label="Email" :rules="emailRules" outlined dense></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  :rules="passwordRules"
                  outlined
                  dense
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-btn @click="signup(this)" block dark color="indigo">Sign Up</v-btn>
              </v-form>
              <div class="mainLoginBtn">
                Already have an account?
                <a href="/login">Login!</a>
              </div>
            </v-card>
          </div>
        </v-flex>
        
      </v-layout>
      <v-layout align-center justify-center row>
          <v-flex md12 xs12>
            <iframe
              width="100%"
              height="700px"
              src="https://www.youtube.com/embed/VqnJwh6E9ak"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </v-flex>
        </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {};
</script>

<style lang="sass">

.subTitle
  font-size: 20px

.textcenter
  text-align: -webkit-center


.mainTitle
  font-size: 1.2em
  padding-top: 50px

.mainIconHeadline
  padding-top: 10px
  padding-bottom: 10px

.mainSignupTitle
  font-size: 1.5em
  color: #3949AB

.mainSinupForm
  padding: 40px 50px 30px 50px

.mainLoginBtn
  padding-bottom: 10px

  
</style>