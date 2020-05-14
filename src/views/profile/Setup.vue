<template>
  <div>
      <div v-if="user_role==1">
          <FreelancerSetup></FreelancerSetup>
      </div>
      <div v-else>
          <ClientSetup></ClientSetup>
      </div>
  </div>
</template>

<script>
import FreelancerSetup from '@/components/freelancer/profile/FreelancerSetup'
import ClientSetup from '@/components/client/profile/ClientSetup'

export default {
    components:{
        FreelancerSetup,
        ClientSetup
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