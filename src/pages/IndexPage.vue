<template>
  <q-page class="q-pa-sm formBG-dog">
    <div class="row q-mb-xl q-mt-xl">
      <div class="col col-md-12 q-pl-lg">
        <span class="text-bold text-h4 q-mr-xl">Login</span><br/>
          <span class="text-caption text-grey-8">Login your account to check the details of your pets.</span><br/>
          <span class="text-caption text-grey-8">Please keep you credentials secret</span>
      </div>
      <div class="col col-xs-12 col-sm-12 col-md-12 flex items-center q-pa-lg">
        <div class="fit row wrap justify-center items-start content-start">
          <q-card class="bg-transparent q-pa-md q-mb-md shadow-0" style="width: 85vw; max-width: 90vw; border-radius: 20px;">
            <q-form ref="form" class="q-gutter-md q-mt-md" @submit="submitLogin">
              <q-card-section class="scroll">
                  <q-input
                      outlined
                      v-model="email"
                      label="Email"
                      name="Email"
                      class="q-mb-md"
                  >
                    <template v-slot:prepend>
                        <q-icon name="email" />
                    </template>
                  </q-input>

                  <q-input
                    outlined
                    v-model="password"
                    label="Password"
                    name="password"
                    type="password"
                  >
                    <template v-slot:prepend>
                      <q-icon name="password" />
                    </template>
                  </q-input>

                  <!-- <a class="text-primary text-bold cursor-pointer">Register here!</a> -->
              </q-card-section>

              <q-card-actions class="text-center">
                  <q-btn
                      type="submit"
                      label="Login"
                      :loading="btnLoading"
                      class="full-width fredoka q-mb-sm customLoginBtn q-pa-md bg-positive"
                      @click="submitForm"
                  />
                  
                  <q-btn
                    to="/register"
                    label="Register"
                    class="full-width fredoka q-mb-sm customLoginBtn q-pa-md bg-primary"
                    
                  />
              </q-card-actions>
            </q-form>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { LocalStorage } from 'quasar'
import login from '../firebase/firebase-login'
import getDetailsDocument from '../firebase/firebase-get';

export default defineComponent({
  name: 'PageIndex',
  components: {},
  data(){
    return {
      tab: 'login',
      text: '',
      email: null,
      password: null
    }
  },
  
  methods: {
    async submitLogin(){
        let payload = {
            email: this.email,
            password: this.password,
        }
        await login(payload).then(async (res) => {
          let id = res.uid
          const user = await getDetailsDocument(`userProfile`, id)
          LocalStorage.set('userDetails', user)
          this.$router.go('/home')
        })
    }
    // ending method
  },
})
</script>

<style scoped>
.customLoginBtn {
    color: white;
    border-radius: 10px;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 10px;
    padding-bottom: 10px;
}
.headStyle{
    width: 25%;
}
.backgroundHeader{
  position: absolute;
  z-index: -1;
    background: url(/imgs/background.svg) no-repeat;
    height: 60vh;
    width: 70%;
    background-position: 50% 0%;
    background-size: 50%;
    opacity: 0.3;
}
.backgroundMid{
  position: absolute;
  z-index: -1;
  background: url('/imgs/background2.svg') no-repeat;
  height: 80vh;
  width: 100%;
  background-position: 50% 60%;
  background-size: 60%;
  opacity: 0.2;
}
.footerBackground{
  height: 30vh;
}
.formBG-dog{
  background: url(/shopping-bag.png) no-repeat;
  background-position: 126% 100%;
  background-color: white;
  border-radius: 20px;
}
</style>