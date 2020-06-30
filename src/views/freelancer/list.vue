<template>
    <div class="container mt-5">
        <div class="row mt-5">
            <div class="col-12 col-md-3">
                <div class="filters">
                    <v-text-field
                        v-model="search"
                        outlined
                        flat
                        label="search..."
                        @keypress.enter="filter"
                    ></v-text-field>
                </div>
            </div>
            <div class="col-12 col-md-9">
                <div class="search-res">
                    <div class="row">
                        <div class="col-3" v-for="freelancer in freelancers" :key="freelancer.id">
                            <v-card class="freelancer">
                                <center>
                                    <v-avatar
                                        size="100"
                                    >
                                        <img :src="`${storage}/${freelancer.avatar}`">
                                    </v-avatar>
                                </center>
                                <v-card-title>{{ freelancer.username }}</v-card-title>
                                <v-card-subtitle>{{ freelancer.title }}</v-card-subtitle>
                                <v-chip-group>
                                    <v-chip
                                        v-for="skill in freelancer.skills"
                                        :key="skill.id"
                                    >
                                        {{ skill.skill_name }}
                                    </v-chip>
                                </v-chip-group>
                                <v-btn
                                    color="primary"
                                    link
                                    :to="{name: 'freelancer.profile', params: {id: freelancer.id}}"
                                    block
                                >
                                    profile
                                </v-btn>
                            </v-card>
                        </div>
                        
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
            storage: `${process.env.VUE_APP_API_LINK}storage`,
            freelancers: [],
            search: ''
        }
    },
    created () {
        axios.get('freelancer')
                .then(res=>{
                    this.freelancers = res.data;
                })
    },
    methods: {
        filter() {
            axios.post('freelancer/filter', {search: this.search})
                .then(res=>{
                    this.freelancers = res.data;
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