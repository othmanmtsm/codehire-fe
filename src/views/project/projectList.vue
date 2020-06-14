<template>
    <div class="container mt-5">
        <div class="row mt-5">
            <div class="col-12 col-md-3">
                <div class="filters">
                    <div class="fil-grp">
                        <p class="sch-ttl">Category</p>
                        <v-select
                            :items="categories"
                            label="Tous les categories"
                            solo
                            dense
                        ></v-select>
                    </div>
                    <div class="fil-grp mt-2">
                        <p class="sch-ttl">Keywords</p>
                        <v-text-field
                            solo
                            dense
                            label="e.g Titre du projet"
                            append-icon="add"
                        ></v-text-field>
                    </div>
                    <div class="fil-grp mt-2">
                        <p class="sch-ttl">Skills</p>
                        <v-chip-group
                            column
                            active-class="primary--text"
                        >
                        <v-chip v-for="skill in skills" :key="skill.id">
                            {{ skill.text }}
                        </v-chip>
                        </v-chip-group>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-9">
                <div class="search-res">
                    <div class="row">
                        <p class="sch-ttl">Search results</p>
                        <v-card
                            class="col-12 mt-4 job-container"
                            flat
                            v-for="p in projects"
                            :key="p.id"
                        >
                            <div class="row">
                                <div class="col-8">
                                    <v-card-title>
                                        <router-link class="job-title" :to="{name: 'project.single',params: {id: p.id}}">
                                            {{p.titre}}
                                        </router-link>
                                    </v-card-title>
                                    <v-card-subtitle class="job-sub">
                                        <label><v-icon small>dashboard</v-icon> {{p.category}}</label>
                                        <label><v-icon small>schedule</v-icon> {{p.date}}</label>
                                    </v-card-subtitle>
                                    <v-card-text>
                                        {{p.description}}
                                    </v-card-text>
                                    <v-card-text>
                                        <v-chip
                                            class="skill"
                                            v-for="s in p.skills"
                                            :key="s.id"
                                        >{{s.skill_name}}</v-chip>
                                        
                                    </v-card-text>
                                </div>
                                <div class="col-4 job-action">
                                    <v-card-title class="price">1000 DH - 2000 DH</v-card-title>
                                    <v-card-subtitle class="type">Prix fixe</v-card-subtitle>
                                    <v-card-actions>
                                        <v-btn
                                            block
                                            depressed
                                            color="#7d3cff"
                                            class="white--text"
                                        >Bid now</v-btn>    
                                    </v-card-actions>                                   
                                </div>
                            </div>
                        </v-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            categories: ['UI/UX Design', 'Web dev'],
            skills: [
                {text: 'php', id:1}
            ],
            projects: null
        }
    },
    created () {
        axios.get('project')
                .then(res=>{
                    this.projects = res.data;
                })
                .catch(err=>console.log(err));
    },
}
</script>

<style lang="scss" scoped>
.sch-ttl{
    font-size: 20px;
    font-weight: 350;
    margin-bottom: 10px;
}
.search-res{
    padding: 0 20px;
}
.job-container{
    padding: 0;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
    .job-title{
        color: #000;
    }
    .job-title:hover{
        text-decoration: none;
    }
    .job-sub{
        label{
            margin-right: 10px;
        }
    }
    .skill{
        margin-right: 3px;
    }
    .job-action{
        border-left: 1px solid rgba(204,204,204,.5);
        padding-left: 0;
        .price{
            font-size: 18px;
            padding-top: 20%;
            padding-bottom: 10px;
            font-weight: 400;
        }
        .type{
            padding-bottom: 0;
        }
    }
}
</style>