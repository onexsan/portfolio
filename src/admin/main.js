import Vue from 'vue';
import '@babel/polyfill';
import router from './router';
import App from './App.vue';
import store from './store/index.js';
import $axios from './requests.js';

store.$axios = $axios;

new Vue({
  el: '#app-root',
  router,
  store,
  render: h => h(App)
});