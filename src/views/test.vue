<template>
    <div>
        <div v-for="cat in categories" :key="cat.id" class="col-12 col-sm-4 cat-container">
            <div
                :class="{ 'selected-cat': category == cat }"
                class="cat"
                @click="setCat(cat)"
            >
            <div class="cat-icon">
                <v-icon
                    size="60"
                    :color="category == cat ? '#7d3cff' : '#ffffff'"
                    >{{cat.icon}}</v-icon
                >
            </div>
                <div class="cat-text">{{cat.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data() {
            return {
                categories: [],
                category: {}
            }
        },
        created () {
            axios.get('categories')
                    .then(res=>{
                        this.categories = res.data;
                    });
        },
        methods: {
            setCat(cat) {
                this.category = cat;
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>