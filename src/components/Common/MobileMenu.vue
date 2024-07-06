<template>
    <!-- Menu Bar -->
    <div class="fixed-bottom absolute-bottom q-pa-sm">
        
      <q-card class="myMenuBar">
        <q-card-section class="fit row wrap justify-center items-center content-start">
            <transition-group
                appear
            >

            <q-icon
                @click="focusMenuIconEnter(0)"
                @mouseleave="focusMenuIconLeave(0)"
                class="q-ml-md q-mr-md"
                :class="focusMenu[0] ? 'animated wobble' : 'text-primary'"
                name="eva-layers" 
                size="sm" 
            />
            <q-icon
                @click="focusMenuIconEnter(1)"
                @mouseleave="focusMenuIconLeave(1)"
                class="q-ml-md q-mr-md"
                :class="focusMenu[1] ? 'animated wobble' : 'text-primary'"
                name="eva-monitor" 
                size="sm" 
            />
            <div class="col-3">
                <q-icon
                    @click="focusMenuIconEnter(2)"
                    @mouseleave="focusMenuIconLeave(2)"
                    class="centerMenu"
                    :class="focusMenu[2] ? 'animated flip' : ''"
                    name="point_of_sale" 
                    size="md" 
                />
                <q-icon class="backDropCenter"  size="md" />
            </div>
            <q-icon
                @click="focusMenuIconEnter(3)"
                @mouseleave="focusMenuIconLeave(3)"
                :class="focusMenu[3] ? 'animated wobble' : 'text-primary'"
                class="q-ml-md q-mr-md" 
                name="eva-cube" 
                size="sm" 
            />
            <q-icon 
                @click="focusMenuIconEnter(4)"
                @mouseleave="focusMenuIconLeave(4)"
                :class="focusMenu[4] ? 'animated wobble' : 'text-primary'"
                class="q-ml-md q-mr-md" 
                name="eva-clipboard" 
                size="sm" 
            />
            </transition-group>
        </q-card-section>
      </q-card>
      
    </div>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { LocalStorage } from 'quasar'

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  data: () => {
    return {
      leftDrawerOpen: false,
      miniState: true,
      focusMenu: [false, false, false, false, false],
    }
  },
  computed: {
    isLoggedIn(){
      const user = LocalStorage.getItem('user')
      return user !== null;
    }
  },
  methods: {
    focusMenuIconEnter(idx){
        this.focusMenu[idx] = true
    },
    focusMenuIconLeave(idx){
        this.focusMenu[idx] = false
    }
  }
}
</script>

<style scoped>
.linkCustom {
  text-decoration: none;
}
.myMenuBar{
  padding: 0% !important;
  border-radius: 20px;
}
.centerMenu {
    z-index: 99;
    position: absolute;
    background: linear-gradient(44deg, #44be65 12%, rgb(37 132 210) 83%);
    color: white;
    padding: 15px;
    top: -35%;
    right: 0;
    margin: auto;
    left: 0;
    clip-path: polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%);
}
.backDropCenter {
    z-index: 1;
    position: absolute;
    /* background: black; */
    background: #f5f5f5;
    padding: 22px;
    top: -47%;
    right: 0;
    margin: auto;
    left: 0;
    clip-path: polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%);
}
.activeMenu {
  border-radius: 50% !important;
  padding: 10%;
  background-color: bisque;
}
</style>