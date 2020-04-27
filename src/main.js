import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from '@/router';
import axios from 'axios';
import store from '@/store';

axios.defaults.baseURL = 'https://codehireapi.herokuapp.com/api';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
