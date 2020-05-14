<template>
    <div>
        <v-app-bar short hide-on-scroll color="white">
            <v-app-bar-nav-icon v-if="authenticated" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <img src="@/assets/images/logo.png" alt="logo" width="40">
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <template v-if="authenticated">
                <v-text-field
                    solo
                    hide-details
                    append-icon="search"
                    single-line
                    label="Search..."
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-avatar size="40">
                    <img :src="avatar+'/'+user.avatar">
                </v-avatar>
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item-group>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click.prevent="logout">log out</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-menu>
            </template>
            <template v-else>
                <v-btn to="login" text>login</v-btn>
                <v-btn to="register" text>S'inscrire</v-btn>
                <button class="btn btn-p">Publier un projet</button>
            </template>
        </v-app-bar>
        <v-navigation-drawer v-if="authenticated" v-model="drawer" app>
            <v-btn @click="drawer = !drawer" icon>
                <v-icon>clear</v-icon>
            </v-btn>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      avatar: `${process.env.VUE_APP_API_LINK}storage`,
      drawer: false
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
.btn-p{
    background-color: #ec615b;
    color: #ffffff;
    margin-left: 20px;
  }

</style>