<template>
  <q-page>
    <div class="row">
      <div v-show="!showStores" class="col col-xs-12 col-sm-12 col-md-12 q-mb-sm">
        <div class="row">
          <div
            v-for="(item, idx) in overviewList"
            :key="idx"
            class="col-12 col-xs-12 col-sm-12 col-md-3 q-pa-xs"
          >
            <q-card
              flat
              class="my-card-item"
              :class="item.color"
              @click="item.action"
            >
              <q-card-section :class="`bg-${item.icon}`" @click="item.action">
                <span class="text-bold">{{item.label}} 
                  <span v-if="item.limit && item.limit !== 'unlimited'">({{`${item.count}/${item.limit}`}})</span>
                  <span v-if="item.limit && item.limit === 'unlimited'">(Unlimited)</span>
                </span><br/>
                <span class="text-caption">{{item.captions}}</span>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div v-show="showStores" class="col col-xs-12 col-sm-12 col-md-12 q-mb-sm">
        <div class="row wrap justify-start items-center content-center">
          <q-btn
            round
            outline
            color="red"
            icon="arrow_back"
            class="q-mr-md"
            dense
            @click="() => { this.showStores = !this.showStores }"
          />
          <div class="text-h6">My Store List</div>
        </div>
       
        <q-card
          v-for="(item, key) in myStores"
          class="shadow-5 q-mt-md bg-yellow-1 my-card-item"
          :key="key"
        >
          <q-card-section>
            <q-icon 
              name="store" 
              size="md" 
              color="green" 
            />
            <label class="text-h6 q-ml-sm">{{item.storeName}}</label><br/><br/>
            
            <span class="text-caption" >
              <q-icon name="place" size="xs" color="red" /> <strong> Address:</strong> {{item.address}} <br/>
              <q-icon name="storefront" size="xs" color="primary" /> <strong>Store Type:</strong> {{item.storeType}}
            </span>
          </q-card-section>
          
        </q-card>
      </div>
    </div>

    <MenuBottom />
    <StoreModal
      :modalStatus="addStoreModal"  
      @updateModalStatus="addStoreModal = !addStoreModal"
    />
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
import MenuBottom from '../components/Common/MobileMenu.vue'
import StoreModal from "../components/Modals/AddStoreModal.vue"
import listDocuments from '../firebase/firebase-list'

export default {
  name:"HomePage",
  components: {
    MenuBottom,
    StoreModal
  },
  data(){
    return {
      showStores: false,
      addStoreModal: false,
      enableCreateStore: false,
      myStores: [],
      overviewList: [
        {
          color: 'bg-yellow-2',
          icon: 'add',
          iconBg: 'red-5',
          count: 0,
          label: 'Create Store',
          captions: 'Register you store and branches',
          captionColor: 'text-blue-14',
          disable: false,
          action: () => { this.addStoreModal = true }
        },
        {
          color: 'bg-green-2',
          icon: 'store',
          iconBg: 'green-5',
          count: 0,
          limit: 1,
          label: 'View Store',
          captions: 'All of the Store registered',
          captionColor: 'text-blue-14',
          disable: false,
          action: () => { this.showStores = true }
        },
        {
          color: 'bg-blue-2',
          icon: 'product',
          iconBg: 'blue-5',
          count: '$ 0.00',
          label: 'My Shared Products',
          captions: 'All Items and Product records',
          captionColor: 'text-blue-14',
          disable: false,
          action: () => { return false }
        },
      ]
    }
  },
  computed:{
    userData(){
      const details = LocalStorage.getItem('user')
      return details;
    },
    userDetails(){
      const details = LocalStorage.getItem('userDetails')
      return details;
    },
  },
  created(){
    this.fetchStoreList();
  },
  methods:{
    async fetchStoreList(){
      this.$q.loading.show()
      this.overviewList[1].limit = this.userDetails.maxStoreLimit
      try {
        const res = await listDocuments(`userInventory/${this.userData.uid}/stores`)
        this.checkCreateStatus(Number(this.overviewList[1].limit), res.length)
        this.overviewList[1].count = res.length
        this.myStores = res
        this.$q.loading.hide()
      } catch (error) {
        console.log(error)
        this.$q.notify({
          message: 'Error on fetching product list',
          color: 'negative',
        });
      }
    },
    fetchStoreLimit(){
      if(this.userDetails.maxStoreLimit === "unlimited"){
        this.overviewList[1].limit = 100
      } else {
        this.overviewList[1].limit = this.userDetails.maxStoreLimit
      }
    },
    checkCreateStatus(limit, count){
      if(limit === count){
        this.overviewList[0].color = "bg-grey-4"
        this.overviewList[0].disable = true
        this.overviewList[0].action = () => { return false }
      } else {
        this.overviewList[0].color = "bg-yellow-2"
        this.overviewList[0].disable = false
        this.overviewList[0].action = () => { this.addStoreModal = true }
      }
    }
  }
}
</script>

<style scoped>
.my-card{
    border-radius: 10px;
    box-shadow: 0px 0px 3px -2px !important;
}
.singleImgOpcity{
  opacity: 0.4;
}
.my-card-item{
  border-radius: 15px;
}
.bg-add{
  background: url(/imgs/add-store.png) no-repeat;
  background-position: 106% 12%;
  background-size: 25%;
  background-repeat: no-repeat;
}
.bg-store{
  background: url(/imgs/shops.png) no-repeat;
  background-position: 106% 12%;
  background-size: 25%;
  background-repeat: no-repeat;
}
.bg-product{
  background: url(/imgs/trolley.png) no-repeat;
  background-position: 99% 11px;
  background-size: 20%;
  background-repeat: no-repeat;
}
</style>