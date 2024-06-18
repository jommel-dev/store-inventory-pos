<template>
  <q-page>
    <div class="row">
      <div class="col col-8 q-pa-xs">
        <div class="row">
          <div class="col col-12 q-mb-sm">
            <q-input dense rounded outlined v-model="text" placeholder="Search Product">
              <template v-slot:append>
                <q-icon name="manage_search" color="primary" />
              </template>
            </q-input>
          </div>
          <div class="col col-12">
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
          </div>
          <div class="col col-12 q-mt-sm">
            <q-card
              flat
              class="my-card bg-white"
            >
              <q-card-section class="text-center">
                
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col col-4 q-pa-xs">
        <q-card
          flat
          class="my-card bg-white"
        >
          <q-card-section>
            <div class="text-right q-mb-sm">
              <q-btn 
                size="xs"
                class="q-ml-sm q-pt-sm q-pb-sm" 
                no-caps 
                unelevated 
                color="primary"
                icon="add" 
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

            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-bold">Single line item</q-item-label>
                  <q-item-label class="text-bold" caption lines="2">QTY: 2</q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-item-label caption>10.00</q-item-label>
                  <q-item-label class="text-bold" caption>20.00</q-item-label>
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
                <q-item-label >18.00</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Tax</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label >2.00</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Total</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label >20.00</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-btn class="full-width q-mt-sm" no-caps unelevated rounded color="positive" label="Proceed" icon="receipt_long" />
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name:"HomePage",
  data(){
    return {
      tab: 'grocery',
      cart: [],
      items: [
        {
          itemName: "",
          price: 1

        }
      ]
    }
  },
}
</script>

<style scoped>
.my-card{
    border-radius: 10px;
    box-shadow: 0px 0px 3px -2px !important;
}
</style>