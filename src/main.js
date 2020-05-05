import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from '@/router';
import axios from 'axios';
import store from '@/store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './assets/sass/style.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

require('@/store/subscriber');

axios.defaults.baseURL = `${process.env.VUE_APP_API_LINK}api`;

Vue.config.productionTip = false;

store.dispatch('auth/attempt',localStorage.getItem('token')).then(()=>{
  new Vue({
    render: h => h(App),
    router,
    vuetify,
    store
  }).$mount('#app')
  
});