<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <v-stepper
                    v-model="currentStep"
                >
                    <v-stepper-header>
                        <v-stepper-step :complete="currentStep > 1" step="1">Donnez un titre</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="currentStep > 2" step="2">Decrire votre projet</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="currentStep > 3" step="3">Category / skills</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="4">Payment</v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card>
                                <h1>step 1</h1>
                            </v-card>
                            <v-btn>next</v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                first: null,
                currentStep: 0
            }
        },
        created () {
            this.first = this.$route.params.first;
        },
    }
</script>

<style lang="scss" scoped>

</style>