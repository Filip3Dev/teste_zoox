import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import formatDate from './filters/date.filter';
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './plugins/sweetalert2';

Vue.filter('formatDate', formatDate);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
