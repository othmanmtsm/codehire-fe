<template>
    <div class="row">
        <div class="col-3">
            <v-card
                flat
                link
                :to="{ name: 'freelancer.settings' }"
            >
                <center>
                    <v-icon
                        size="100"
                    >home</v-icon>
                </center>
                <v-card-title>Personal informations</v-card-title>
                <v-card-subtitle>view and edit your personal infos</v-card-subtitle>
            </v-card>
        </div>
        <div class="col-3">
            <v-card
                flat
                link
                :to="{ name: 'messages' }"
            >
                <center>
                    <v-icon
                        size="100"
                    >mail</v-icon>
                </center>
                <v-card-title>Messages</v-card-title>
                <v-card-subtitle>view and edit your personal infos</v-card-subtitle>
            </v-card>
        </div>
        <div class="col-3">
            <v-card
                flat
                link
                :to="{ name: 'myprojects' }"
            >
                <center>
                    <v-icon
                        size="100"
                    >list</v-icon>
                </center>
                <v-card-title>My projects</v-card-title>
                <v-card-subtitle>view and edit your personal infos</v-card-subtitle>
            </v-card>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>