<template>
    <div class="row">
        <div class="col-12 col-sm-4 cat-container">
            <div 
                :class="{'selected-cat': (category == 1)}" 
                class="cat"
                @click="setCat(1)"
            >
                <div class="cat-icon">
                    <v-icon size="60" :color="category==1?'#7d3cff':'#ffffff'">code</v-icon>
                </div>
                <div class="cat-text">
                    Programmation
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-4 cat-container">
            <div 
                :class="{'selected-cat': (category == 2)}" 
                class="cat"
                @click="setCat(2)"                  
            >
                <div class="cat-icon">
                    <v-icon size="60" :color="category==2?'#7d3cff':'#ffffff'">web</v-icon>
                </div>
                <div class="cat-text">
                    UI/UX Design
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-4 cat-container">
            <div 
                :class="{'selected-cat': (category==3)}" 
                class="cat"
                @click="setCat(3)"                  
            >
                <div class="cat-icon">
                    <v-icon size="60" :color="category==3?'#7d3cff':'#ffffff'">stay_current_portrait</v-icon>
                </div>
                <div class="cat-text">
                    Mobile dev
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                category: null
            }
        },
        methods: {
            setCat(cat) {
                if (this.category == null) {
                    this.category = cat;
                }else if(category == cat){
                    this.category = null;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>