import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      test: 'hello'
    }
  },
  getters: {
  },
  mutations: {
    changeToHi(state) {
        state.test = 'hi'
    }
  },
  actions: {
    async changeToHi(context) {
        context.commit('changeToHi')
    }
  }
})

export default store
