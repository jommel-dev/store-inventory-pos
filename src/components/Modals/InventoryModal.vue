<template>
    <div class="q-pa-sm">
        <q-dialog persistent v-model="openModal">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">ADD PRODUCT</div>
                </q-card-section>

                <q-separator />

                <q-card-section style="max-height: 60vh" class="scroll">
                    <q-form
                        ref="formDetails"
                        class="row"
                    >
                        <div class="col-12 col-xs-12 col-sm-12 col-md-12 q-mt-lg">
                            <span class="text-h6">ITEM DETAILS</span>
                        </div>
                        <BarcodeScanner 
                            v-if="showReader"
                            @setResult="onDecode" 
                        />
                        <q-input 
                            class="col-12 col-xs-12 col-md-4 q-pa-sm q-mt-sm"
                            v-model="form.itemNumber" 
                            dense
                            label="Item No *"
                        >
                            <template v-slot:before>
                                <q-btn
                                    @click="showReader = !showReader"
                                    color="primary"
                                    round 
                                    dense 
                                    flat 
                                    icon="qr_code_scanner" />
                            </template>
                        </q-input>
                        <q-input
                            class="col-12 col-xs-12 col-md-4 q-pa-sm q-mt-sm"
                            dense
                            v-model="form.name"
                            label="Product Name *"
                        />
                        <q-select
                            class="col-12 col-xs-12 col-md-4 q-pa-md"
                            v-model="form.unit"
                            :options="unitOption"
                            label="Quantity Measurement"
                            dense
                            :options-dense="true"
                        >
                            <template v-slot:prepend>
                                <q-icon name="scatter_plot" @click.stop />
                            </template>
                        </q-select>
                        <q-input
                            class="col-12 col-xs-12 col-md-3 q-pa-sm q-mt-sm"
                            dense
                            v-model="form.qty_unit"
                            label="Quantity Per Unit"
                        />
                        <q-input
                            class="col-12 col-xs-12 col-md-3 q-pa-sm q-mt-sm"
                            dense
                            v-model="form.unitPrice"
                            label="Unit Price"
                        />
                        


                        <q-input
                            class="col-12 col-xs-12 col-md-3 q-pa-sm q-mt-sm"
                            dense
                            disable
                            v-model="form.basePrice"
                            label="Base Price"
                        />
                        <q-input
                            class="col-12 col-xs-12 col-md-3 q-pa-sm q-mt-sm"
                            dense
                            v-model="form.vatPrice"
                            label="VAT Price"
                        />
                        
                    </q-form>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="negative" @click="closeModal" />
                    <q-btn flat label="Submit" :loading="btnLoading" color="positive" @click="submitForm" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
import moment from 'moment';
import { LocalStorage } from 'quasar'
import BarcodeScanner from '../Common/BarcodeScan.vue'
import createDocument from '../../firebase/firebase-create';

const dateNow = moment().format('MM/DD/YYYY');

export default{
    name: 'AddProductModal',
    components: {
        BarcodeScanner,
    },
    props: {
        appId: {
            type: Number
        },
        modalStatus: {
            type: Boolean
        },
        modalTitle: {
            type: String
        }
    },
    data(){
        return {
            showReader: false,
            btnLoading: false,
            openModal: false,
            maximizedToggle: true,
            form: {
                itemNumber: "",
                name: "",
                unit: "PC", //Box, Pair, Peice, 
                qty_unit: 0,
                unitPrice: 0,
                basePrice: 0,
                vatPrice: 0,
            },
            unitOption: [
                "Box",
                "PC",
                "Pair",
                "Pack",
                "KG",
                "Liters",
                "M",
                "G",
            ],
        }
    },
    watch:{
        modalStatus: function(newVal){
            this.openModal = newVal
        },
        'form.unitPrice'(newVal){
            this.form.basePrice = Number(newVal) / Number(this.form.qty_unit) 
        },
        'form.qty_unit'(newVal){
            this.form.basePrice = Number(this.form.unitPrice) / Number(newVal) 
        }
    },
    computed: {
        userDetails(){
            const details = LocalStorage.getItem('user')
            return details;
        }
    },
    methods: {
        async closeModal(){
            this.form =  {
                itemNumber: "",
                name: "",
                unit: "PC", //Box, Pair, Peice, 
                qty_unit: 0,
                unitPrice: 0,
                basePrice: 0,
                vatPrice: 0,
            }
            this.$emit('updateModalStatus');
        },
        async onDecode(result){
            this.form.itemNumber = result
            this.showReader = false;
        },
        submitForm(){
            // Confirm
            this.$q.dialog({
                title: 'Save Data',
                message: 'Would you like to save your data?',
                ok: {
                    label: 'Yes'
                },
                cancel: {
                    label: 'No',
                    color: 'negative'
                },
                persistent: true
            }).onOk(() => {
                this.saveProductData();
            })
        },

        async saveProductData(){

            let vm = this;
            // this.$q.loading.show({
            //     message: 'Your data is submitting. Please wait...'
            // });
            this.btnLoading = true;

            let payload = {
                ...this.form,
            }
            console.log(this.userDetails)

            try {
                await createDocument(`userInventory/${this.userDetails.uid}/products`, payload);
                this.closeModal()
            } catch (error) {
                console.log(error)
                this.$q.notify({
                    message: 'Error saving data',
                    color: 'negative',
                });
            }
            

            this.btnLoading = false;
        },

        // ending method
    },

}
</script>
