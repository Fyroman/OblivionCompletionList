import Vue from 'vue'

const state = () => ({
  groups: []
})

const mutations = {
  setGroups(state, groups) {
    state.groups = groups
  }
}

const actions = {
  async getGroups({commit}) {
    Vue.http.get(
      'https://oblivioncompletionlist.firebaseio.com/groups.json'
    ).then(
      function (data) {
        return data.json()
      }
    ).then(
      function (data) {
        let groups = []
        for (let key in data) {
          data[key].id = key
          groups.push(data[key])
        }
        commit('setGroups', groups)
      }
    )
  }
}

export default {
  state,
  mutations,
  actions,
}
