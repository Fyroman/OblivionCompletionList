import Vue from 'vue'
import Vuex from 'vuex'
import group from './group'
// import category from './category'
// import quest from './quest'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    group,
    // category,
    // quest
  }
})
