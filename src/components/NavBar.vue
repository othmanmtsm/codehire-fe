<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container">
      <!-- <router-link :to="{ name: user ? 'home' : 'welcome' }" class="navbar-brand">
        <img src="/dist/images/logo.png" alt="logo" width="40">
      </router-link> -->

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false">
        <span class="navbar-toggler-icon" />
      </button>

      <div id="navbarToggler" class="collapse navbar-collapse">
        <!-- <ul class="navbar-nav">
          <locale-dropdown />
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul> -->

        <ul class="navbar-nav ml-auto">
          <!-- Authenticated -->
          <li v-if="authenticated" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-dark"
               href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
            >
              <!-- <img :src="user.photo_url" class="rounded-circle profile-photo mr-1"> -->
              {{ user.name }}
            </a>
            <div class="dropdown-menu">
              <!-- <router-link :to="{ name: 'settings.profile' }" class="dropdown-item pl-3">
                <fa icon="cog" fixed-width />
                {{ $t('settings') }}
              </router-link> -->

              <div class="dropdown-divider" />
              <a href="#" class="dropdown-item pl-3" @click.prevent="logout">
                logout
              </a>
            </div>
          </li>
          <!-- Guest -->
          <template v-else>
            <li class="nav-item">
              <router-link :to="{ name: 'login' }" class="nav-link" active-class="active">
                login
              </router-link>
            </li>
            <li class="nav-item">
              <!-- <router-link :to="{ name: 'register' }" class="nav-link" active-class="active">
                register
              </router-link> -->
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed:{
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },
  methods:{
    logout(){
      console.log('logged out');
      
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
}

.nav-item {
  .dropdown-menu {
    border: none;
    margin-top: .5rem;
    border-top: 1px solid #f2f2f2 !important;
    box-shadow: 0 4px 8px 0 rgba(125, 60, 255,0.12), 0 2px 4px 0 rgba(125, 60, 255,0.08);
  }
}

.nav-link {
  .svg-inline--fa {
    font-size: 1.4rem;
  }
}
</style>
