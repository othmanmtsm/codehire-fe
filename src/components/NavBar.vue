<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container">
      <router-link :to="{ name: user ? 'home' : 'welcome' }" class="navbar-brand">
        <img src="@/assets/images/logo.png" alt="logo" width="40">
      </router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false">
        <span class="navbar-toggler-icon" />
      </button>

      <div id="navbarToggler" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <!-- Authenticated -->
          <li v-if="authenticated" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-dark"
               href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
            >
              <img :src="avatar+'/'+user.avatar" class="rounded-circle profile-photo mr-1">
              {{ user.name }}
            </a>
            <div class="dropdown-menu">
              <a href="#" class="dropdown-item pl-3" @click.prevent="logout">
                logout
              </a>
            </div>
          </li>
          <!-- Guest -->
          <template v-else>
            <li class="nav-item">
              <router-link :to="{ name: 'login' }" class="nav-link" active-class="active">
                Se connecter
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'register' }" class="nav-link" active-class="active">
                S'inscrire
              </router-link>
            </li>
            <li class="nav-item">
              <button class="btn btn-p">Publier un projet</button>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      avatar: `${process.env.VUE_APP_API_LINK}storage`
    }
  },
  computed:{
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },
  methods:{
    ...mapActions({
      logoutAction: 'auth/signOut'
    }),
    logout(){
      this.logoutAction().then(()=>{
        this.$router.replace({
          name: 'login'
        })
      })
      
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-photo {
  width: 2rem;
  height: 2rem;
  margin: -.375rem 0;
}
.navbar {
  font-weight: 600;
  box-shadow: 0 2px 6px 0 rgba(125, 60, 255, 0.5);
  padding: 0;
}

.nav-item {
  .dropdown-menu {
    border: none;
    margin-top: .5rem;
    border-top: 1px solid #f2f2f2 !important;
    box-shadow: 0 4px 8px 0 rgba(125, 60, 255,0.12), 0 2px 4px 0 rgba(125, 60, 255,0.08);
  }
  .btn-p{
    background-color: #ec615b;
    color: #ffffff;
    margin-left: 20px;
  }
}

.nav-link {
  .svg-inline--fa {
    font-size: 1.4rem;
  }
}
</style>
