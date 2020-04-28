import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from '@/router';
import axios from 'axios';
import store from '@/store';

require('@/store/subscriber');

axios.defaults.baseURL = process.env.VUE_APP_API_LINK;

Vue.config.productionTip = false;

store.dispatch('auth/attempt',localStorage.getItem('token')).then(()=>{
  new Vue({
    render: h => h(App),
    router,
    store
  }).$mount('#app')
  
});