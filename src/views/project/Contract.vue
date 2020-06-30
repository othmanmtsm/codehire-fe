<template>
    <div class="container">
        <div v-if="contract.pivot.isHired" class="row mt-5" ref="printable">
            <div class="col-8 mx-auto">
                <v-card
                    outlined
                >
                    <v-card-title>{{ contract.project_name }}</v-card-title>
                    <v-card-subtitle>
                        price range :
                        {{ contract.payment_min }} DH
                        -
                        {{ contract.payment_max }} DH
                    </v-card-subtitle>
                    <v-card-text>
                        <div class="row">
                            <div class="col-12 col-lg-6">
                                <p>Client : {{ contract.client_name }}</p>
                                <p>Freelancer : {{ contract.freelancer_name }}</p>
                                <p>Date posted : {{ contract.created_at }}</p>
                                <p>Estimated duration : {{ contract.pivot.duration }} Days</p>
                            </div>
                            <div class="col-12 col-lg-6">
                                <p>Payment type : {{ contract.payment_type }}</p>
                                <p>Amount : {{ contract.pivot.amount }} DH</p>
                            </div>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            @click="generatePDF"
                            depressed
                            color="primary"
                            block
                        >
                            download pdf
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import jspdf from 'jspdf';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            contract: {}
        }
    },
    methods: {
        generatePDF() {
            const doc = new jspdf();
            doc.fromHTML(this.$refs.printable,15,15);
            doc.save('contract.pdf');
        }
    },
     computed:{
        ...mapGetters({
            user: 'auth/user'
        })
    },
    created () {
        axios.get(`project/${this.$route.params.id}/${this.$route.params.fid}/contract`)
                .then(res=>{
                    if (this.user.id == res.data.client_id || this.user.id == res.data.freelancer_id) {
                        this.contract = res.data;
                    }else{
                        this.$router.push({
                            name: 'home'
                        });
                    }
                })
                .catch(err=>{
                    console.log(err.response.data);
                })
    },
}
</script>

<style lang="scss" scoped>

</style>