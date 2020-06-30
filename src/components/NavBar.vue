<template>
    <div>
        <v-app-bar flat short hide-on-scroll color="white">
            <v-app-bar-nav-icon v-if="authenticated" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
              <router-link
                :to="{name: 'home'}"
              >
                <img src="@/assets/images/logo.png" alt="logo" width="40">
              </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <template v-if="authenticated">
                <v-spacer></v-spacer>
                <v-chip
                  label
                  color="primary"
                  style="margin-right: 5px;"
                >
                  {{ user.roles[0].label }}
                </v-chip>
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
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title @click.prevent="settings">Parameters</v-list-item-title>
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
            <v-list>
              <v-list-item
                color="primary"
                :to="{ name: 'home' }"
              >
                <v-icon
                  style="margin-right: 10px;"
                >home</v-icon>
                Home
              </v-list-item>
              <v-list-item
                color="primary"
                :to="{ name: 'profile.me' }"
                v-if="user.roles[0].label=='freelancer'"
              >
                <v-icon
                  style="margin-right: 10px;"
                >account_circle</v-icon>
                Profile
              </v-list-item>
              <v-list-item
                color="primary"
                :to="{ name: 'project.list' }"
                v-if="user.roles[0].label=='freelancer'"
              >
              <v-icon
                  style="margin-right: 10px;"
              >
                view_stream
              </v-icon>
                Projects
              </v-list-item>
              <v-list-item
                color="primary"
                :to="{ name: 'freelancer.list' }"
                v-if="user.roles[0].label=='client'"
              >
                <v-icon style="margin-right: 10px;">group</v-icon>
                Freelancers
              </v-list-item>
              <v-list-item
                color="primary"
                :to="{ name: 'messages' }"
              >
                <v-icon style="margin-right: 10px;">inbox</v-icon>
                Messages
              </v-list-item>
              <v-list-group
                prepend-icon="settings"
              >
                <template v-slot:activator>
                  <v-list-item-title>Settings</v-list-item-title>
                </template>
                <v-list-item
                  link
                  :to="{name: 'settings.projects'}"
                  v-if="user.roles[0].label=='client'"
                >
                    <v-list-item-content>
                        <v-list-item-title>Projects</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
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
    },
    settings(){
      this.$router.replace({
        name: 'settings'
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