<template>
    <div class="q-pa-sm">
        <q-dialog persistent v-model="openModal">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="scroll">
                    <q-input
                        class="col-12 col-xs-12 col-md-4 q-pa-sm q-mt-sm"
                        dense
                        v-model="qty"
                        label="QUANTITY/SET OF "
                    />
                    <BarcodeScanner 
                        @setResult="onDecode" 
                    />
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
    name: 'POSModal',
    components: {
        BarcodeScanner,
    },
    props: {
        modalStatus: {
            type: Boolean
        },
    },
    data(){
        return {
            openModal: false,
            qty: 1,
        }
    },
    watch:{
        modalStatus: function(newVal){
            this.openModal = newVal
        },
        
    },
    methods: {
        async closeModal(){
            this.$emit('updateModalStatus');
        },
        async onDecode(result){
            this.$emit('searchScanProduct', {
                quantity: this.qty,
                itemCode: result
            })
            this.closeModal();
        },
        // ending method
    },

}
</script>
