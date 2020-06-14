<template>
    <div>
        <Profile :freelancerID='parseInt($route.params.id)' :isNotMe='true'></Profile>
    </div>
</template>

<script>
import Profile from '@/components/freelancer/profile/Profile';
export default {
    components: {
        Profile,
    },
    data() {
        return {
            id: null
        }
    },
    created () {
        this.id = this.$route.params.id;
    },
}
</script>

<style lang="scss" scoped>

</style>