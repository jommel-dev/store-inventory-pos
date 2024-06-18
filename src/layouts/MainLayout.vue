<template>
  <q-layout view="hHh Lpr lff" class="bg-grey-2">
    <q-header class="bg-secondary q-pa-sm" elevated>
      <q-toolbar>
        <q-btn
          v-if="isLoggedIn"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <a href="/" class="text-white linkCustom">
            <q-img src="/icons/favicon-96x96.png" width="5%" /> 
            <span v-if="!isLoggedIn" class="text-bold">Store POS & Inventory</span>
            <span v-if="isLoggedIn" class="text-bold">{{userDetails.storeName}}</span>
          </a>
        </q-toolbar-title>

        <div v-if="!isLoggedIn">SMPI v1.0.0</div>
        <q-btn v-if="isLoggedIn" flat dense @click="logout" v-close-popup>sign out</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="isLoggedIn"
      v-model="leftDrawerOpen"
      :mini="miniState"
      show-if-above
      mini-to-overlay
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      bordered
      :width="200"
      :breakpoint="500"
    >
      <q-list>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view class="q-pa-md" />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { LocalStorage } from 'quasar'
import signout from 'src/firebase/firebase-signout'

const linksList = [
  {
    title: 'POS',
    caption: 'Point Of Sale',
    icon: 'point_of_sale',
    link: 'homepage'
  },
  {
    title: 'Inventory',
    caption: 'Products',
    icon: 'inventory_2',
    link: 'inventorypage'
  },
  {
    title: 'Reports',
    caption: 'Sales & Inventory',
    icon: 'print',
    link: 'reportpage'
  },
  {
    title: 'Credits',
    caption: 'Unpaid Items',
    icon: 'credit_card',
    link: 'creditpage'
  },
]

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  data: () => {
    return {
      linksList,
      leftDrawerOpen: false,
      miniState: true
    }
  },
  computed: {
    isLoggedIn(){
      const user = LocalStorage.getItem('user')
      return user !== null;
    },
    userDetails(){
      const details = LocalStorage.getItem('userDetails')
      return details;
    }
  },
  mounted(){
    if(this.isLoggedIn){
      this.$router.push('/home')
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    async logout () {
      await signout().then(() => {
        this.$router.go('/')
      })
    },
  }
}
</script>

<style scoped>
.linkCustom {
  text-decoration: none;
}
</style>