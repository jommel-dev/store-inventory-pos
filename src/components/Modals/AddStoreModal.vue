<template>
    <div class="q-pa-sm">
        <q-dialog persistent v-model="openModal">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">ADD MY STORE</div>
                </q-card-section>

                <q-separator />

                <q-card-section style="max-height: 60vh" class="scroll">
                    <q-form
                        ref="formDetails"
                        class="row"
                    >
                        <q-input
                            class="col-12 col-xs-12 col-md-4 q-pa-sm q-mt-sm"
                            dense
                            v-model="form.storeName"
                            label="Store Name *"
                        />
                        <q-input
                            class="col-12 col-xs-12 col-md-4 q-pa-sm q-mt-sm"
                            dense
                            v-model="form.address"
                            label="Address *"
                        />
                        <q-select
                            class="col-12 col-xs-12 col-md-4 q-pa-md"
                            v-model="form.storeType"
                            :options="typeOption"
                            label="Store Type"
                            dense
                            :options-dense="true"
                        >
                            <template v-slot:prepend>
                                <q-icon name="store" @click.stop />
                            </template>
                        </q-select>
                        
                    </q-form>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="negative" @click="closeModal" />
                    <q-btn flat label="Create" :loading="btnLoading" color="positive" @click="submitForm" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
import { LocalStorage } from 'quasar'
import createDocument from '../../firebase/firebase-create';


export default{
    name: 'AddProductModal',
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
                storeName: "",
                address: "",
                storeType: "small",
                status: "active",
            },
            typeOption: [
                "Small",
                "Sari-Sari Store",
                "Grocery Store",
                "Pharmacy Store",
                "Parts & Accesories Shop",
            ],
        }
    },
    watch:{
        modalStatus: function(newVal){
            this.openModal = newVal
        },
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
                storeName: "",
                address: "",
                storeType: "small",
                status: "active",
            }
            this.$emit('updateModalStatus');
        },
        submitForm(){
            // Confirm
            this.$q.dialog({
                title: 'Create Store',
                message: 'Would you like to create this store?',
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
            this.$q.loading.show({
                message: 'Creating your store. Please wait...'
            });
            this.btnLoading = true;

            let payload = {
                ...this.form,
            }
            try {
                await createDocument(`userInventory/${this.userDetails.uid}/stores`, payload);
                this.$q.notify({
                    message: 'Store successfully created.',
                    color: 'positive',
                });
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
