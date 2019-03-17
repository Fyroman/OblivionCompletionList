import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import style from '../public/css/style.css'
import {VueMasonryPlugin} from '../node_modules/vue-masonry'
import Vuex from 'vuex'
import store from './store'

Vue.use(VueResource)
Vue.use(style)
Vue.use(VueMasonryPlugin)
Vue.use(Vuex)

Vue.config.productionTip = false

export const bus = new Vue();

new Vue({
  router,
  style,
  store,
  render: h => h(App)
}).$mount('#app')
