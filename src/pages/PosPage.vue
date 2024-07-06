<template>
  <q-page>
    <div class="row">
      <div class="col-12 col-md-8 q-pa-xs">
        <div class="row">
          <div class="col col-12 q-mb-sm">
            <q-input dense rounded outlined v-model="text" placeholder="Search Product Name / Item #">
              <template v-slot:append>
                <q-icon name="manage_search" color="primary" />
              </template>
            </q-input>
          </div>
          <!-- <div class="col col-12">
            <q-card
              flat
              class="my-card bg-grey-3"
            >
            <q-tabs
                  v-model="tab"
                  dense
                  align="justify"
                  inline-label
                  active-color="grey-10"
                  active-bg-color="amber-4"
                >
                  <q-tab :ripple="false" no-caps name="grocery" icon="shopping_cart" label="Grocery" />
                  <q-tab :ripple="false" no-caps name="cigarette" icon="smoking_rooms" label="Cigarette" />
                  <q-tab :ripple="false" no-caps name="essentials" icon="soap" label="Essentials" />
                  <q-tab :ripple="false" no-caps name="frozengoods" icon="kitchen" label="Frozens" />
                  <q-tab :ripple="false" no-caps name="medecine" icon="local_pharmacy" label="Medecine" />
                  <q-tab :ripple="false" no-caps name="beverages" icon="liquor" label="Beverages" />
                </q-tabs>
            </q-card>
          </div> -->
          <!-- <div class="col col-12 q-mt-sm">
            <q-card
              flat
              class="my-card bg-white"
            >
              <q-card-section class="text-center">
                
              </q-card-section>
            </q-card>
          </div> -->
        </div>
      </div>
      <div class="col-12 col-md-4 q-pa-xs">
        <q-card
          flat
          class="my-card bg-white"
        >
          <q-card-section>
            <div class=" q-mb-sm">
              <q-btn 
                size="xs"
                class="q-ml-sm q-pt-sm q-pb-sm" 
                no-caps 
                unelevated
                @click="showScanModal = !showScanModal"
                label="Scan"
                color="primary"
                icon="barcode_reader" 
              />
              <q-btn 
                size="xs"
                class="q-ml-sm q-pt-sm q-pb-sm" 
                no-caps 
                unelevated
                label="Check"
                @click="showCheckModal = !showCheckModal"
                color="primary"
                icon="local_offer" 
              />
              <q-btn 
                size="xs"
                class="q-ml-sm q-pt-sm q-pb-sm" 
                no-caps 
                unelevated 
                color="amber-6"
                icon="credit_card" 
              />
              <q-btn 
                size="xs"
                class="q-ml-sm q-pt-sm q-pb-sm" 
                no-caps 
                unelevated 
                color="red-6"
                icon="restart_alt" 
              />
            </div>

            <q-separator />

            <q-list v-if="items.length > 0">
              <q-item v-for="(item) in items" :key="item.product.itemNumber">
                <q-item-section>
                  <q-item-label class="text-bold">{{item.product.name}}</q-item-label>
                  <q-item-label class="text-bold" caption lines="2">QTY: {{item.qty}}</q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-item-label caption>{{
                    Number(item.product.vatPrice).toLocaleString('en-US', {
                      style: 'decimal',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })
                  }}</q-item-label>
                  <q-item-label class="text-bold" caption>{{computePrice(item.qty, item.product.vatPrice)}}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn 
                    size="xs"
                    no-caps 
                    unelevated 
                    color="red-6"
                    icon="close" 
                  />
                </q-item-section>
              </q-item>
            </q-list>

            <div 
              v-if="items.length === 0" 
              class="text-center q-pa-md"
            >
              <q-img
                width="30%"
                class="singleImgOpcity"
                src="/barcode-scanner.png"
              /><br/>
              <span class="text-caption text-grey-8">
                No Items Scanned Yet.
              </span>
            </div>
          </q-card-section>

          
        </q-card>
        <!-- Button Transact -->
        <div class="text-bold">
          <q-list padding dense>
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Subtotal</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label >{{computeSubTotal}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Tax</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label >{{computeVat}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Total</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label class="text-h5 text-bold text-black">{{computeTotal}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-btn class="full-width q-mt-sm" no-caps unelevated rounded color="positive" label="Proceed" icon="receipt_long" />
      </div>
    </div>

    <POSModal 
      :modalStatus="showScanModal"  
      @updateModalStatus="showScanModal = !showScanModal"
      @searchScanProduct="pushToCart"
    />
    <POSCheckModal 
      :modalStatus="showCheckModal"
      :productList="productList"
      @updateModalStatus="showCheckModal = !showCheckModal"
    />
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
import listDocuments from '../firebase/firebase-list';
import POSModal from '../components/Modals/PosModal.vue'
import POSCheckModal from '../components/Modals/PosCheckModal.vue'

export default {
  name:"HomePage",
  components:{
    POSModal,
    POSCheckModal
  },
  data(){
    return {
      showScanModal: false,
      showCheckModal: false,
      productList: [],


      tab: 'grocery',
      items: [],
      subTotal: "--",
      vat: "--",
      total: "--",
    }
  },
  computed:{
    userDetails(){
      const details = LocalStorage.getItem('user')
      return details;
    },
    computeSubTotal(){
      let res = this.items.map((el) => {
        let value = Number(el.product.basePrice) * Number(el.qty)
        return value.toFixed(2);
      })
      return res.length > 0 ? res.reduce((a, b) => {
        let val = Number(a) + Number(b)
        return val.toFixed(2)
      }) : "--"
    },
    computeVat(){
      let res = this.items.map((el) => {
        let value = Number(el.product.vatPrice) - Number(el.product.basePrice) 
        return value.toFixed(2);
      })
      return res.length > 0 ? res.reduce((a, b) => {
        let val = Number(a) + Number(b)
        return val.toFixed(2)
      }) : "--"
    },
    computeTotal(){
      let res = this.items.map((el) => {
        let value = Number(el.product.vatPrice) * Number(el.qty) 
        return value.toFixed(2);
      })
      return res.length > 0 ? res.reduce((a, b) => {
        let val = Number(a) + Number(b)
        return val.toFixed(2)
      }) : "--"
    },
  },
  created(){
    this.fetchSearchList();
  },
  methods:{
    async fetchSearchList(){
      this.$q.loading.show()
      try {
        const res = await listDocuments(`userInventory/${this.userDetails.uid}/products`)
        this.productList = res;
        this.$q.loading.hide()
      } catch (error) {
        console.log(error)
        this.$q.notify({
          message: 'Error on fetching product list',
          color: 'negative',
        });
      }
    },


    async pushToCart(data){
      const filteredProduct = this.productList.filter((el) => {
        return el.itemNumber === data.itemCode
      })
      if(filteredProduct.length > 0){
        // if item is not yet existing on list
        let obj = {
          product: {...filteredProduct[0]},
          qty: data.quantity
        }
        this.items.push(obj)
      } else {
        this.$q.notify({
          position: "top",
          message: 'Item Not Registered',
          color: 'negative',
        });
      }
    },
    computePrice(qty, price){
      let amount = (Number(price) * Number(qty))
      let res = Number(amount).toLocaleString('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })

      return res
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
</style>