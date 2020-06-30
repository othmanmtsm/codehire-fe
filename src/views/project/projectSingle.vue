<template>
    <div>
        <div class="pheader">
            <div class="container">
                <div class="row">
                <v-card
                    flat
                    color="transparent"
                    class="col-12 col-md-9 mt-5"
                >
                    <v-card-title
                        id="ptitle"
                    >
                        {{ project.titre }}
                    </v-card-title>
                    <v-card-subtitle>
                        <router-link id="psub" :to="{name: 'usr'}">
                            {{ project.category }}
                        </router-link>
                    </v-card-subtitle>
                </v-card>
                <div
                    class="col-12 col-md-3"
                >
                    <v-card
                        class="pprice"
                    >
                        <v-card-text>
                            <p class="ppricelabel">{{ project.payment_type }}</p>
                            <p class="ppricep">{{ `${project.price_min}DH - ${project.price_max}DH` }}</p>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                block
                                style="color: #fff"
                                color="#7d3cff"
                                depressed
                            >
                                faire une offre
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-8 mainctn">
                    <quill-editor
                    class="borderless"
                    ref="myQuillEditor"
                    :options="editorOption"
                    disabled
                    />
                    <v-card
                        flat
                        color="transparent"
                    >
                        <v-card-title>
                            Compétences requises
                        </v-card-title>
                        <v-card-text>
                            <v-chip-group
                                active-class="primary--text"
                            >
                                <v-chip 
                                    v-for="skill in project.skills" 
                                    :key="skill.id"
                                >
                                    {{ skill.skill_name }}
                                </v-chip>
                            </v-chip-group>
                        </v-card-text>
                    </v-card>
                    <v-divider></v-divider>
                    <div id="bids">
                        <v-expansion-panels popout>
                            <v-expansion-panel
                            hide-actions
                            v-for="bidder in project.bidders"
                            :key="bidder.freelancer"
                            >
                            <v-expansion-panel-header>
                                <v-row
                                align="center"
                                class="spacer"
                                no-gutters
                                >
                                <v-col
                                    cols="4"
                                    sm="2"
                                    md="1"
                                >
                                    <v-avatar
                                    size="36px"
                                    >
                                    <img
                                        alt="Avatar"
                                        :src="storage+'/'+bidder.avatar"
                                    >
                                    </v-avatar>
                                </v-col>
                                <v-col
                                    class="hidden-xs-only"
                                    sm="5"
                                    md="3"
                                >
                                    <strong>{{ bidder.freelancer }}</strong>
                                </v-col>
                                <v-col
                                    class="text-no-wrap"
                                    cols="5"
                                    sm="3"
                                >
                                    <strong>{{ bidder.amount }} DH</strong>
                                </v-col>
                                <v-col
                                    class="grey--text text-truncate hidden-sm-and-down"
                                >
                                    &mdash;
                                    {{ bidder.duration }} jours
                                </v-col>

                                </v-row>
                            </v-expansion-panel-header>

                            <v-expansion-panel-content>
                                <v-divider></v-divider>
                                <v-card-text>
                                    {{ bidder.description }}
                                </v-card-text>
                            </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <v-card
                        flat
                    >
                        <v-card-title>
                            Faire une offre
                        </v-card-title>
                        <v-card-text>
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-subtitle>Fixez votre tarif minimal</v-list-item-subtitle>
                                    <v-list-item-title>
                                        <v-text-field
                                        type="number"
                                         v-model="bid.amount"
                                        ></v-text-field>
                                    </v-list-item-title>
                                    <v-slider
                                        v-model="bid.amount"
                                        class="align-center"
                                        :max="project.price_max"
                                        :min="project.price_min"
                                        hide-details
                                    >
                                    </v-slider>
                                    <v-list-item-title>Définissez votre délai de livraison</v-list-item-title>
                                    <v-list-item>
                                        <v-date-picker
                                            no-title
                                            v-model="bid.delay"
                                            range
                                            :min="project.date_min"
                                            :max="project.date_max"
                                            @click:date="setDelay"
                                            light
                                            class="mt-2"
                                        ></v-date-picker>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-textarea
                                            v-model="bid.description"
                                            label="Ecrire une description"
                                            rows="3"
                                            full-width
                                        >
                                        </v-textarea>
                                    </v-list-item>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                depressed
                                block
                                style="color: #fff"
                                color="#7d3cff"
                                @click="placeBid"
                            >
                                placer une offre
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-divider></v-divider>
                    <v-dialog v-model="bidModel" width="500">
                    <v-card>
                        <v-card-title class="headline grey lighten-2" primary-title>Project posted</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            Your bid is placed, wait for the client to reach you, you can manage your projects and see if a client wants to hire you in your projects settings
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                        <v-btn link :to="{name: 'myprojects'}">Continue to projects settings</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";

export default {
    components: {
        quillEditor,
    },
    data() {
        return {
            editorOption: {
                readOnly: true,
                modules: {
                    toolbar: false
                },
                theme: "snow"
            },
            project: {},
            bid: {
                amount: null,
                delay: [],
                description: ""
            },
            storage: `${process.env.VUE_APP_API_LINK}storage`,
            bidModel: false
        }
    },
    created () {
        axios.get(`project/${this.$route.params.id}`)
                .then(res=>{
                    this.project = res.data;
                    this.bid.amount = res.data.price_min;
                    this.bid.delay = [res.data.date_min];
                    this.$refs.myQuillEditor.quill.setContents(JSON.parse(res.data.description));
                })
                .catch(err=>console.log(err));
    },
    methods: {
        setDelay() {
            this.bid.delay[0] = this.project.date_min;
        },
        placeBid() {
            let request = {
                'amount': this.bid.amount,
                'delay' : (Date.parse(this.bid.delay[1]) - Date.parse(this.bid.delay[0])) / (1000 * 3600 * 24),
                'description' : this.bid.description
            };
            console.log(request);
            
            axios.post(`project/${this.$route.params.id}/bid`, request)
                    .then(()=>{
                        this.bidModel = true;
                    })
                    .catch(err=>console.log(err.response.data));
        }
    },
}
</script>

<style lang="scss" >
.pheader{
    background: rgb(251,251,251);
    background: linear-gradient(90deg, rgba(251,251,251,1) 44%, rgba(236,97,91,0.4937325271905637) 100%);
    #ptitle{
        font-size: 40px;
        font-weight: 500;
        margin-top: 2rem;
        margin-bottom: 5px;
    }
    #psub{
        color: #888;
    }
    #psub:hover{
        text-decoration: none;
    }
}
.pprice{
    padding: 10px;
    .ppricelabel{
        font-size: 18px;
        color: #888;
        margin-bottom: 5px;
    }
    .ppricep{
        font-weight: 300;
        font-size: 20px;
        margin-bottom: 0;
    }
}
</style>