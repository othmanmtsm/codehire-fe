<template>
    <div>
        <Profile :freelancerID="user.id"></Profile> 
    </div>
</template>

<script>
import Profile from '@/components/freelancer/profile/Profile';
import {mapGetters} from 'vuex';

export default {
    components: {
        Profile,
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    },
}
</script>

<style lang="scss" scoped>

</style>