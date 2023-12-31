import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from 'axios'
import wysiwyg from "vue-wysiwyg"

Vue.config.productionTip = false
Vue.use(wysiwyg, {});

axios.defaults.baseURL = process.env.VUE_APP_REMOTE_API;

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    store.commit("LOGOUT");
    router.push({name: 'login'});
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
