<template>
  <q-page>
    <div class="row">
        <div class="col col-9 q-pa-xs">
            <div class="row">
                <div class="col col-12 q-mb-sm">
                    <q-input dense rounded outlined v-model="text" placeholder="Search Product">
                    <template v-slot:append>
                        <q-icon name="manage_search" color="primary" />
                    </template>
                    </q-input>
                </div>
            </div>
        </div>
        <div class="col col-3 q-pa-xs text-right">
            <q-btn 
              size="xs"
              class="q-ml-sm q-pt-sm q-pb-sm"
              unelevated 
              color="positive"
              icon="add_shopping_cart"
              label="Add Product" 
            />
            <q-btn 
              size="xs"
              class="q-ml-sm q-pt-sm q-pb-sm" 
              no-caps 
              unelevated 
              color="primary"
              icon="filter_alt" 
            />
        </div>
        <div class="col col-12 q-mt-sm">
            <q-card
              flat
              class="my-card bg-white"
            >
              <q-card-section>
                table
              </q-card-section>
            </q-card>
        </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name:"InventoryPage",
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