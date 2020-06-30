<template>
    <div class="container">
        <div v-if="user.roles[0].label == 'freelancer'">
            <FreelancerDashboard></FreelancerDashboard>
        </div>
        <div v-else>
            <ClientDashboard></ClientDashboard>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FreelancerDashboard from '@/components/freelancer/dashboard/FreelancerDashboard';
import ClientDashboard from '@/components/client/dashboard/ClientDashboard';

    export default {
        components: {
            FreelancerDashboard,
            ClientDashboard
        },
        computed: {
            ...mapGetters({
                user: 'auth/user'
            })
        },
        methods: {
            
        },
    }
</script>

<style lang="sass" scoped>

</style>