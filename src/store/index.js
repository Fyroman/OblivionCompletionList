import Vue from 'vue'
import Vuex from 'vuex'
import group from './group'
import toast from './toast'
// import category from './category'
// import quest from './quest'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    toast,
    group,
    // category,
    // quest
  }
})
