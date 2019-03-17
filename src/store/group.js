import firebase from 'firebase/app'
import 'firebase/database'
import {cloneDeep} from 'lodash'

const state = () => ({
  showCompleted: true,
  loadedGroups: [],
  groups: []
})

const getters = {
  getData(state) {
    if (state.showCompleted) {
      return state.groups
    } else {
      for (let g = 0; g < state.groups.length; g++) {
        for (let c = state.groups[g].categories.length - 1; c >= 0; c--) {
          for (let q = state.groups[g].categories[c].quests.length - 1; q >= 0; q--) {
            if (state.groups[g].categories[c].quests[q].questCompleted) {
              state.groups[g].categories[c].quests.splice(q, 1)
            }
          }
          if (!state.groups[g].categories[c].quests.length) {
            state.groups[g].categories.splice(c, 1)
          }
        }
      }
    }
  }
}

const mutations = {
  toggleShowCompleted(state) {
    state.showCompleted = !state.showCompleted
    if (state.showCompleted) {
      state.groups = cloneDeep(state.loadedGroups)
    } else {
      for (let g = 0; g < state.groups.length; g++) {
        for (let c = state.groups[g].categories.length - 1; c >= 0; c--) {
          for (let q = state.groups[g].categories[c].quests.length - 1; q >= 0; q--) {
            if (state.groups[g].categories[c].quests[q].questCompleted) {
              state.groups[g].categories[c].quests.splice(q, 1)
            }
          }
          if (!state.groups[g].categories[c].quests.length) {
            state.groups[g].categories.splice(c, 1)
          }
        }
      }
    }
  },
  setGroups(state, groups) {
    state.loadedGroups = cloneDeep(groups)
    state.groups = groups
  }
}

const actions = {
  async loadData({commit}) {
    let groupsArray = []
    await firebase.database().ref('group').once('value').then(groups => {
      groups.forEach(group => {
        groupsArray.push({
          key: group.key,
          groupName: group.val().groupName,
        })
        let index = groupsArray.findIndex(g => {
          return g.groupName === group.val().groupName
        })
        groupsArray[index].categories = []
        group.forEach(categories => {
          categories.forEach(category => {
            groupsArray[index].categories.push({
              key: category.key,
              categoryName: category.val().categoryName,
            })
            let cIndex = groupsArray[index].categories.findIndex(c => {
              return c.categoryName === category.val().categoryName
            })
            groupsArray[index].categories[cIndex].quests = []
            category.forEach(quests => {
              if (quests.val().questTitle) {
                groupsArray[index].categories[cIndex].quests.push({
                  key: quests.key,
                  questCompleted: quests.val().questCompleted,
                  questDescription: quests.val().questDescription,
                  questTitle: quests.val().questTitle,
                })
              }
            })
          })
        })
      })
    })
    commit('setGroups', groupsArray)
  },
  async initializeEverything({commit}) {
    let groups = []
    await firebase.database().ref('groups').once('value').then(snap => {
      snap.forEach(v => {
        groups.push(v.val())
      })
    })
    await firebase.database().ref('categories').once('value').then(snap => {
      snap.forEach(childSnap => {
        let index = (groups.findIndex(g => {
          return g.groupName === childSnap.key
        }))
        if (!groups[index].categories)
          groups[index].categories = []
        childSnap.forEach(s => {
          groups[index].categories.push(s.val())
        })
      })
    })
    await firebase.database().ref('quests').once('value').then(q => {
      q.forEach(g => {
        let index = (groups.findIndex(group => {
          return group.groupName === g.key
        }))
        g.forEach(c => {
          let cIndex = (groups[index].categories.findIndex(category => {
            return category.categoryName === c.key
          }))
          if (!groups[index].categories[cIndex].quests) {
            groups[index].categories[cIndex].quests = []
          }
          c.forEach(qst => {
            delete qst.val().id
            groups[index].categories[cIndex].quests.push(qst.val())
          })
        })
      })
    })
    console.log(groups)

    async function test() {
      firebase.database().ref('group').remove()
      for (let g = 0; g < groups.length; g++) {
        console.log('Grupa %c%s', 'color: red', groups[g].groupName)
        await firebase.database()
          .ref('group')
          .push({groupName: groups[g].groupName})
        await firebase.database()
          .ref('group')
          .orderByChild('groupName')
          .equalTo(groups[g].groupName)
          .once('value')
          .then(gRes => {
            gRes.forEach(async eh => {
              for (let c = 0; c < groups[g].categories.length; c++) {
                console.log('Kategorija %c%s', 'color: green', groups[g].categories[c].categoryName)
                await firebase.database()
                  .ref('group')
                  .child(eh.key)
                  .child('category')
                  .push({categoryName: groups[g].categories[c].categoryName})
                await firebase.database()
                  .ref('group')
                  .child(eh.key)
                  .child('category')
                  .orderByChild('categoryName')
                  .equalTo(groups[g].categories[c].categoryName)
                  .once('value')
                  .then(cRes => {
                    cRes.forEach(async bleh => {
                      for (let q = 0; q < groups[g].categories[c].quests.length; q++) {
                        console.log('Quest %c%s', 'color: yellow', groups[g].categories[c].quests[q].questTitle)
                        await firebase.database()
                          .ref('group')
                          .child(eh.key)
                          .child('category')
                          .child(bleh.key)
                          .push({
                            questCompleted: groups[g].categories[c].quests[q].questCompleted,
                            questDescription: groups[g].categories[c].quests[q].questDescription,
                            questTitle: groups[g].categories[c].quests[q].questTitle,
                          })
                      }
                    })
                  })
              }
            })
          })
      }
    }

    test()
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}
