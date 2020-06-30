<template>
    <div class="container">
        <div class="row">
            <div class="col-2">
                <v-card>
                    <v-card-title>{{ projects.length }}</v-card-title>
                    <v-card-subtitle>number of projects</v-card-subtitle>
                    <v-btn
                        block
                        depressed
                        color="primary"
                        link
                        :to="{name: 'project.new'}"
                    >add project</v-btn>
                </v-card>
            </div>
        </div>
        <div class="row">
            <div class="col-10 mx-auto">
                <p>My Projects</p>
                <v-card
                    class="mt-3"
                    v-for="project in projects"
                    :key="project.project_id"
                    outlined
                >
                    <div class="row">
                        <div class="col-8">

                            <v-card-title>{{ project.project_name }}</v-card-title>
                            <v-card-subtitle>{{ project.days_left }}</v-card-subtitle>
                            <v-card-actions>
                                <v-chip
                                    color="primary"
                                    text-color="white"
                                    label
                                    data-toggle="modal" 
                                    :data-target="`#exampleModal${project.project_id}`"
                                    link
                                    >
                                    <v-icon small left>group</v-icon>
                                    manage bids
                                    <v-avatar
                                        right
                                        color="#925cff"
                                    >
                                        {{ project.bidders }}
                                    </v-avatar>
                                </v-chip>
                                <v-chip
                                    label
                                    :to="{ name: 'project.edit', params: {id: project.project_id} }"
                                >
                                    <v-icon
                                        small
                                    >
                                        edit
                                    </v-icon>
                                </v-chip>
                                <v-chip
                                    label
                                    color="secondary"
                                    link
                                >
                                    <v-icon
                                        small
                                        color="#fff"
                                        data-toggle="modal" 
                                        :data-target="`#deleteModal${project.project_id}`"
                                    >
                                        delete
                                    </v-icon>
                                </v-chip>
                                <div class="modal modal fade" :id="`deleteModal${project.project_id}`" tabindex="-1" role="dialog" :aria-labelledby="`deleteModal${project.project_id}Label`" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Warning</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            Are you sure you want to delete this project ?
                                        </div>
                                        <div class="modal-footer">
                                            <v-btn depressed color="primary" data-dismiss="modal" @click="deleteProj(project)">yes</v-btn>
                                            <v-btn depressed data-dismiss="modal">cancel</v-btn>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div class="modal modal fade" :id="`exampleModal${project.project_id}`" tabindex="-1" role="dialog" :aria-labelledby="`exampleModal${project.project_id}Label`" aria-hidden="true">
                                <div class="modal-dialog modal-lg" role="document">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">{{project.project_name}}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <v-expansion-panels flat>
                                            <v-expansion-panel
                                            hide-actions
                                            v-for="bidder in project.offres"
                                            :key="bidder.project_id"
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
                                                    <strong>{{ bidder.username }}</strong>
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
                                                    promises to finish in {{ bidder.duration }} days
                                                </v-col>

                                                </v-row>
                                            </v-expansion-panel-header>

                                            <v-expansion-panel-content>
                                                <v-divider></v-divider>
                                                <v-card-text>
                                                    {{ bidder.description }}
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-btn
                                                        color="primary"
                                                        depressed
                                                        @click="accept(bidder.project_id, bidder.freelancer_id)"
                                                        small
                                                        data-dismiss="modal"
                                                    >
                                                        procceed to contract
                                                    </v-btn>
                                                    <v-btn
                                                        color="secondary"
                                                        depressed
                                                        @click="deny(bidder.project_id, bidder.freelancer_id)"
                                                        small
                                                        data-dismiss="modal"
                                                    >
                                                        deny bid
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-expansion-panel-content>
                                            </v-expansion-panel>
                                        </v-expansion-panels>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </v-card-actions>
                        </div>
                        <div class="col-4">
                            
                        </div>
                    </div>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            projects: [],
            dialog: false,
            storage: `${process.env.VUE_APP_API_LINK}storage`
        }
    },
    created () {
        axios.get('settings/projects')
                .then(res=>{
                    this.projects = res.data
                })
                .catch(err=>console.log(err));
    },
    methods: {
        accept(project_id, freelancer_id) {
            axios.post(`project/${project_id}/${freelancer_id}/accept`)
                .then(()=>{
                    this.$router.push({
                        name: 'project.contract',
                        params: {
                            id: project_id,
                            fid: freelancer_id
                        }
                    });
                })
                .catch(err=>console.log(err.response.data))
        },
        deny(project_id, freelancer_id) {
            axios.post(`project/${project_id}/${freelancer_id}/deny`)
                .then(res=>console.log(res))
                .catch(err=>console.log(err))
        },
        deleteProj(project_id) {
            axios.post(`project/${project_id.project_id}`,{_method: 'delete'})
                .then(()=>{
                    this.projects.splice(this.projects.indexOf(project_id),1);
                })
                .catch(err=>console.log(err))
        }
    },
}
</script>

<style lang="scss" scoped>
.project_det{
    width: 100%;
    li{
        display: inline;
    }
}
</style>