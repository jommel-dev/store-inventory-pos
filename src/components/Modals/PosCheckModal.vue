<template>
    <div class="q-pa-sm">
        <q-dialog persistent v-model="openModal">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="scroll text-center">
                    <BarcodeScanner 
                        @setResult="onDecode" 
                    />

                    <label class="text-h5">Item Price:<br/></label>
                    <label class="text-h5">{{priceScan}}</label>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="negative" @click="closeModal" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
import BarcodeScanner from '../Common/BarcodeScan.vue'

export default{
    name: 'POSCheckModal',
    components: {
        BarcodeScanner,
    },
    props: {
        modalStatus: {
            type: Boolean
        },
        productList: {
            type: Array,
            default: []
        },
    },
    data(){
        return {
            openModal: false,
            priceScan: "--"
        }
    },
    watch:{
        modalStatus: function(newVal){
            this.openModal = newVal
        },
        
    },
    methods: {
        async closeModal(){
            this.priceScan = 0.00
            this.$emit('updateModalStatus');
        },
        async onDecode(result){
            const filteredProduct = this.productList.filter((el) => {
                return el.itemNumber === result
            })
            
            if(filteredProduct.length > 0){
                let item = {...filteredProduct[0]};

                this.priceScan = Number(item.vatPrice).toLocaleString('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
            } else {
                this.priceScan = "Item Not Registered"
            }
            
        },
        // ending method
    },

}
</script>
