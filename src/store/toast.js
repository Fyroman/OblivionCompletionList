const state = () => ({
  toastList: [],
})

const mutations = {
  setToast(state, config) {
    if (state.toastList.length > 5) {
      state.toastList.shift()
    }
    let id = parseInt(Math.random() * 1000)
    state.toastList.push({
      text: config.text,
      id,
    })
    setTimeout(() => {
      let index = state.toastList.findIndex(t => {
        return t.id === id
      })
      state.toastList.splice(index, 1)
    }, 3000)
  },
  closeToast(state, id) {
    let index = state.toastList.findIndex(t => {
      return t.id === id
    })
    state.toastList.splice(index, 1)
  }
}

const actions = {
  setToast({commit}, config) {
    commit('setToast', config)
  },
  closeToast({commit}, id) {
    commit('closeToast', id)
  }
}

export default {
  state,
  mutations,
  actions,
}