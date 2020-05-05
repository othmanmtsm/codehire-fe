<template>
  <div>
      <div v-if="user_role==1">
          <FreelancerSetup></FreelancerSetup>
      </div>
      <div v-else>
          client
      </div>
  </div>
</template>

<script>
import FreelancerSetup from '@/components/freelancer/profile/FreelancerSetup'

export default {
    components:{
        FreelancerSetup,
    },
    data() {
        return {
            user_role: ''
        }
    },
    mounted (){
        this.$data.user_role = this.$route.params.role;
    }
}
</script>

<style lang="scss" scoped>

</style>