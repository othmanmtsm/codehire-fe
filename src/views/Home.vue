<template>
    <div>
        HOME
        <v-btn
            @click="testnode"
        >
            test node
        </v-btn>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        methods: {
            testnode() {
                axios.post('http://localhost:8080/test')
                    .then(res=>{
                        console.log(res);
                        
                    })
            }
        },
    }
</script>

<style lang="sass" scoped>

</style>