import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import style from '../public/css/style.css'
import {VueMasonryPlugin} from '../node_modules/vue-masonry'
import Vuex from 'vuex'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/database'

Vue.use(VueResource)
Vue.use(style)
Vue.use(VueMasonryPlugin)
Vue.use(Vuex)

Vue.config.productionTip = false

let firebaseConfig = {
  apiKey: 'AIzaSyCukOuGUgcWjwrjSxhX0mbxQFL20kuzzqc',
  authDomain: 'oblivioncompletionlist.firebaseapp.com',
  databaseURL: 'https://oblivioncompletionlist.firebaseio.com',
  projectId: 'oblivioncompletionlist',
}

firebase.initializeApp(firebaseConfig);

export const bus = new Vue();

new Vue({
  router,
  style,
  store,
  render: h => h(App)
}).$mount('#app')
