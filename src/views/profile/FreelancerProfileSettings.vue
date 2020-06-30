<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <v-card
                    style="padding: 10px"
                >
                    <v-card-title>My Account</v-card-title>
                    <v-divider></v-divider>
                    <div class="row">
                        <div class="col-12 col-md-2">
                            <center>
                                <v-avatar
                                    size="150"
                                >
                                    <img :src="`${storage}/${freelancer.avatar}`">
                                </v-avatar>
                            </center>
                        </div>
                        <div class="col-12 col-md-5">
                            <v-text-field
                                label="nom"
                                v-model="freelancer.nom"
                                outlined
                                :error="AccErrs.nom != null"
                                :error-messages="AccErrs.nom"
                            >
                            </v-text-field>
                            <v-text-field
                                label="prenom"
                                v-model="freelancer.prenom"
                                outlined
                                :error="AccErrs.prenom != null"
                                :error-messages="AccErrs.prenom"
                            ></v-text-field>
                            <v-text-field
                                type="email"
                                label="email"
                                v-model="freelancer.mail"
                                outlined
                                :error="AccErrs.email != null"
                                :error-messages="AccErrs.email"
                            ></v-text-field>
                        </div>
                        <div class="col-12 col-md-5">
                            <v-text-field
                                label="username"
                                v-model="freelancer.username"
                                outlined
                                :error="AccErrs.username != null"
                                :error-messages="AccErrs.username"
                            ></v-text-field>
                            <v-text-field
                                label="hourly rate"
                                v-model="freelancer.hourlyrate"
                                type="number"
                                prefix="DH"
                                outlined
                                :error="AccErrs.hourlyrate != null"
                                :error-messages="AccErrs.hourlyrate"
                            ></v-text-field>
                            <v-btn
                                depressed
                                color="primary"
                                block
                                @click="saveAcc"
                                :loading="submitAcc"
                            >
                                update Account
                            </v-btn>
                        </div>
                    </div>
                </v-card>
                <v-card
                    class="mt-5"
                    style="padding: 10px"
                >
                    <v-card-title>My profile</v-card-title>
                    <v-divider></v-divider>
                    <div class="row">
                        <div class="col-12 col-md-4">
                            <v-text-field
                                label="title"
                                v-model="freelancer.title"
                                outlined
                                error-messages=""
                            ></v-text-field>
                        </div>
                        <div class="col-12 col-md-4">
                            <v-select
                                v-model="freelancer.skills"
                                :items="skills_list"
                                label="Skills"
                                item-text="skill_name"
                                item-value="id"
                                color="rgba(125, 60, 255, 0.5)"
                                item-color="rgba(125, 60, 255, 0.5)"
                                chips
                                multiple
                            ></v-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <v-textarea
                            outlined
                                label="write something about yourself"
                                v-model="freelancer.bio"
                                counter="200"
                            ></v-textarea>
                        </div>
                    </div>
                    <v-btn
                        depressed
                        color="primary"
                        @click="saveProf"
                        :loading="submitProf"
                    >
                        update profile
                    </v-btn>
                </v-card>
                <div class="row">
                    <div class="col-12 col-md-6 mx-auto">
                        <v-card>
                            <v-card-title>
                                Experience
                                <v-btn
                                    icon
                                    depressed
                                    color="primary"
                                    data-toggle="modal" 
                                    data-target="#addModal"
                                >
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </v-card-title>
                            <div class="modal modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">add modal</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <v-text-field
                                            v-model="experience.titre"
                                        ></v-text-field>
                                        <label>Date from :</label>
                                        <br>
                                        <v-date-picker 
                                            v-model="experience.date_from"
                                        ></v-date-picker>
                                        <br>
                                        <label>Date to :</label>
                                        <br>
                                        <v-date-picker 
                                            v-model="experience.date_to"
                                        ></v-date-picker>
                                        <v-textarea label="description" v-model="experience.description"></v-textarea>
                                    </div>
                                    <div class="modal-footer">
                                        <v-btn depressed color="primary" @click="addExp" data-dismiss="modal">add</v-btn>
                                        <v-btn depressed data-dismiss="modal">cancel</v-btn>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <v-card
                                flat
                                v-for="exp in freelancer.experience"
                                :key="exp.id"
                            >
                                <v-card-title>
                                    {{exp.titre}}
                                    <v-btn
                                        icon
                                        data-toggle="modal" 
                                        :data-target="`#editModal${exp.id}`"
                                        @click="setEdit(exp)"
                                    >
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn
                                        icon
                                        color="red"
                                        data-toggle="modal" 
                                        :data-target="`#delModal${exp.id}`"
                                    >
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-card-title>
                                <v-card-subtitle>
                                    {{exp.date_from}} - {{exp.date_to}}
                                </v-card-subtitle>
                                <v-card-text>
                                    {{exp.description}}
                                </v-card-text>
                                <div class="modal modal fade" :id="`delModal${exp.id}`" tabindex="-1" role="dialog" :aria-labelledby="`delModalLabel${exp.id}`" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Delete experience</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            Are you sure you want to delete {{ exp.titre }}
                                        </div>
                                        <div class="modal-footer">
                                            <v-btn depressed color="primary" @click="delExp(exp.id)" data-dismiss="modal">yes</v-btn>
                                            <v-btn depressed data-dismiss="modal">cancel</v-btn>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div class="modal modal fade" :id="`editModal${exp.id}`" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">edit modal</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <v-text-field
                                                v-model="experience.titre"
                                            ></v-text-field>
                                            <label>Date from :</label>
                                            <br>
                                            <v-date-picker 
                                                v-model="experience.date_from"
                                            ></v-date-picker>
                                            <br>
                                            <label>Date to :</label>
                                            <br>
                                            <v-date-picker 
                                                v-model="experience.date_to"
                                            ></v-date-picker>
                                            <v-textarea label="description" v-model="experience.description"></v-textarea>
                                        </div>
                                        <div class="modal-footer">
                                            <v-btn depressed color="primary" @click="editExp(exp.id)" data-dismiss="modal">edit</v-btn>
                                            <v-btn depressed data-dismiss="modal">cancel</v-btn>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </v-card>
                        </v-card>
                    </div>
                    <div class="col-12 col-md-6 mx-auto">
                        <v-card>
                            <v-card-title>
                                Certifications
                                <v-btn
                                    icon
                                    depressed
                                    color="primary"
                                    data-toggle="modal" 
                                    data-target="#addCertModal"
                                >
                                    <v-icon>add</v-icon>
                                </v-btn>    
                            </v-card-title>
                            <div class="modal modal fade" id="addCertModal" tabindex="-1" role="dialog" aria-labelledby="addCertModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Add certificate</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <v-text-field
                                                label="title"
                                                v-model="certification.title"
                                            ></v-text-field>
                                            <v-text-field
                                                label="provider"
                                                v-model="certification.provider"
                                            ></v-text-field>
                                            <v-textarea
                                                label="description"
                                                v-model="certification.description"
                                            ></v-textarea>
                                            <v-date-picker 
                                                no-title 
                                                scrollable
                                                v-model="certification.date"
                                            ></v-date-picker>
                                        </div>
                                        <div class="modal-footer">
                                            <v-btn depressed color="primary" data-dismiss="modal" @click="addCert">add</v-btn>
                                            <v-btn depressed data-dismiss="modal">cancel</v-btn>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            <v-card
                                v-for="cert in freelancer.certifications"
                                :key="cert.id"
                            >
                            <v-card-title>
                                {{cert.nom}}
                                <v-btn
                                        icon
                                        data-toggle="modal"
                                        :data-target="`#editcertModal${cert.id}`"
                                        @click="setCertEdit(cert)"
                                    >
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn
                                        icon
                                        color="red"
                                        data-toggle="modal"
                                        :data-target="`#delcertModal${cert.id}`"
                                    >
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-card-title>
                            <v-card-subtitle>
                                <v-icon size="15">date_range</v-icon>
                                {{cert.date}}
                                <v-icon size="15">card_travel</v-icon> 
                                {{cert.provider}}
                            </v-card-subtitle>
                                <div class="modal modal fade" :id="`delcertModal${cert.id}`" tabindex="-1" role="dialog" :aria-labelledby="`delcertModalLabel${cert.id}`" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Delete certification</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            Are you sure you want to delete {{ cert.nom }}
                                        </div>
                                        <div class="modal-footer">
                                            <v-btn depressed color="primary" @click="delCert(cert)" data-dismiss="modal">yes</v-btn>
                                            <v-btn depressed data-dismiss="modal">cancel</v-btn>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div class="modal modal fade" :id="`editcertModal${cert.id}`" tabindex="-1" role="dialog" aria-labelledby="editcertModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">edit certification</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <v-text-field
                                                label="title"
                                                v-model="certification.title"
                                            ></v-text-field>
                                            <v-text-field
                                                label="provider"
                                                v-model="certification.provider"
                                            ></v-text-field>
                                            <v-textarea
                                                label="description"
                                                v-model="certification.description"
                                            ></v-textarea>
                                            <v-date-picker 
                                                no-title 
                                                scrollable
                                                v-model="certification.date"
                                            ></v-date-picker>
                                        </div>
                                        <div class="modal-footer">
                                            <v-btn depressed color="primary" @click="editCert(cert.id)" data-dismiss="modal">edit</v-btn>
                                            <v-btn depressed data-dismiss="modal">cancel</v-btn>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </v-card>
                        </v-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
    export default {
        data() {
            return {
                freelancer: {},
                storage: `${process.env.VUE_APP_API_LINK}storage`,
                submitAcc: false,
                submitProf: false,
                skills_list: [],
                AccErrs: {},
                ProfErrs: {},
                experience: {
                    titre: '',
                    date_from: null,
                    date_to: null,
                    description: ''
                },
                certification: {
                    title: '',
                    provider: '',
                    description: '',
                    date: null
                }
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user'
            })
        },
        created () {
            axios.get(`freelancer/${this.user.id}/profile`).then((res) => {
                this.freelancer = res.data;
            });
            axios.get('skills')
                    .then(res=>{
                        this.skills_list = res.data;
                    })
        },
        methods: {
            saveAcc() {
                this.submitAcc = true;
                let req = {
                    nom: this.freelancer.nom,
                    prenom: this.freelancer.prenom,
                    email: this.freelancer.mail,
                    username: this.freelancer.username,
                    hourlyrate: this.freelancer.hourlyrate
                }
                axios.post(`freelancer/${this.user.id}?_method=put`,req)
                        .then(res=>{
                            console.log(res.data);
                            this.submitAcc = false;
                        })
                        .catch(err=>{
                            this.AccErrs = err.response.data.errors;
                            this.submitAcc = false;
                        });
            },
            saveProf() {
                this.submitProf = true;
                let req = {
                    title: this.freelancer.title,
                    skills: this.freelancer.skills,
                    bio: this.freelancer.bio
                }
                axios.post(`freelancer/${this.user.id}/profile?_method=put`,req)
                        .then(res=>{
                            console.log(res.data);
                            this.submitProf=false;
                        })
                        .catch(err=>{
                            console.log(err.response.data);
                            
                            this.ProfErrs = err.response.data.errors;
                            this.submitProf = false;
                        })
            },
            addExp () {
                axios.post('freelancer/profile/addexp', this.experience)
                        .then(res=>{
                            console.log(res.data);
                            this.freelancer.experience.push(this.experience);
                        })
                        .catch(err=>{
                            console.log(err.response.data);
                        })
            },
            delExp (id) {
                axios.post('freelancer/profile/delexp', {id: id})
                        .then(res=>{
                            console.log(res.data);
                        })
                        .catch(err=>{
                            console.log(err.response.data);
                        })
            },
            setEdit (exp) {
                this.experience.titre = exp.titre;
                this.experience.date_from = exp.date_from;
                this.experience.date_to = exp.date_to;
                this.experience.description = exp.description;
            },
            editExp (exp) {
                let req = {
                    id: exp,
                    titre: this.experience.titre,
                    date_from: this.experience.date_from,
                    date_to: this.experience.date_to,
                    description: this.experience.description
                };
                axios.post('freelancer/profile/editexp', req)
                        .then(res=>{
                            console.log(res.data);
                        })
                        .catch(err=>{
                            console.log(err.response.data);
                        })
            },
            addCert () {
                axios.post('freelancer/profile/addcert', this.certification)
                        .then(res=>{
                            this.freelancer.certifications.push(res.data[0]);
                        })
                        .catch(err=>{
                            console.log(err.response.data);
                        })
            },
            delCert (cert) {
                axios.post('freelancer/profile/delcert',{id: cert.id})
                        .then(()=>{
                            this.freelancer.certifications.splice(this.freelancer.certifications.indexOf(cert), 1);
                        })
                        .catch(err=>{
                            console.log(err.response.data);
                        })               
            },
            setCertEdit (cert) {
                this.certification.title = cert.nom;
                this.certification.provider = cert.provider;
                this.certification.description = cert.description;
                this.certification.date = cert.date;
            },
            editCert (cert) {
                let req = {
                    id: cert,
                    title: this.certification.title,
                    provider: this.certification.provider,
                    description: this.certification.description,
                    date: this.certification.date
                }
                axios.post('freelancer/profile/editcert',req)
                        .then(res=>{
                            console.log(res.data);
                        })
                        .catch(err=>{
                            console.log(err.response.data);
                        })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>