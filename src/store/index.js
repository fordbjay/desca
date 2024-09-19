import { createStore } from 'vuex'
import { doc, getDocs, deleteDoc, updateDoc, collection, query, where, setDoc, getFirestore, startAfter } from "../firebase/firebase.js"; 
import { login, logOut } from '../firebase/firebase.js'
import {  getAuth, onAuthStateChanged } from "../firebase/firebase.js";

const db = getFirestore();

// Create a new store instance.
const store = createStore({
  state () {
    return {
      hello: 'hello'
    }
  },
  getters: {
  },
  mutations: {
    changeToHi(state) {
        state.hello = 'hi'
    }
  },
  actions: {
    async changeToHi(context) {
        context.commit('changeToHi')
    }
  }
})

export default store
