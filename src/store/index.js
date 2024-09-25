import { createStore } from 'vuex'
import { doc, getDocs, deleteDoc, updateDoc, collection, query, where, setDoc, getFirestore, startAfter } from "firebase/firestore"; 
import { login, logOut } from '../firebase.js'
import {  getAuth, onAuthStateChanged } from "firebase/auth";
import router from '../router/index.js';
import { downloadPic, deletePic, uploadPic} from '../firebase';


const db = getFirestore();

function copy(value) {
  return JSON.parse(JSON.stringify(value))
}

// Create a new store instance.
const store = createStore({
  state () {
    return {
      loaded: false,
      user: null,
      setups: [],
      userDetails: {},
      uploadProgress: null,
      viewingSetup: [],
    }
  },
  getters: {
    setup: state => setupId => {
      return state.setups.find(s => s.setupId === setupId)
    },
    getuserDetails: state => user => {
      return state.userDetails[user]
    },
  },
  mutations: {
    // LOG IN / OUT MUTATIONS
    setLoggedInUser(state, user) {
      state.user = user;
      state.loggedIn = true;
    },
    setLoaded(state) {
      state.loaded = true
    },
    setUserDetails(state, { details, user }) {
      state.userDetails[user] = details
    },
    initializeSetups(state, setups) {
      state.setups = setups
    },
    setUserDetails(state, { details, user }) {
      state.userDetails[user] = details
    },
    logOut(state) {
      state.loggedIn = false
    },

    // SETUP MUTATIONS
    addSetup(state, setup) {
      state.setups.push(setup)
    },
    deleteSetup(state, setupId) {
      state.setups = state.setups.filter(setup => setup.setupId !== setupId)
    },
    uploadProgress(state, progress) {
      state.uploadProgress = progress
    },
    resetUploadProgress(state) {
      state.uploadProgress = null
    },
    
    // ITEM MUTATIONS
    saveItem(state, {index, setupId, item}) {
      state.setups.find(s => s.setupId === setupId).items[index] = copy(item)
    },
    deleteItem(state, {setupId, index}) {
      state.setups.find(s => s.setupId === setupId).items.splice(index, 1)
    },
    reorderItem(state, {setupId, reorderItems}) {
      state.setups.find(s => s.setupId === setupId).items = copy(reorderItems)
    },

    // VIEWING MUTATIONS
    fetchViewingSetup(state, viewingSetup) {
      state.viewingSetup = viewingSetup
    },

  },
  actions: {
    // LOG IN / LOG OUT ACTIONS
    logIn(context) {
      login(async user => {
        context.commit('setLoggedInUser', user);
        await context.dispatch('fetchUserDetails', user.uid)
        await context.dispatch('fetchUserSetups', user)
        // SETUP PAGE OPENS AFTER LOG IN
        await router.push(`/setups/${context.state.user.uid}`)
        context.commit('setLoaded')
      })
    },
    setUserDetails(context, { details, user }) {
      context.commit('setUserDetails', { details, user })
      setDoc(doc(db, "userDetails", user), details);
    },
    logOut(context) {
      router.push('/')
      logOut()
    },
    async fetchUserDetails(context, user) {
      const q = query(collection(db, "userDetails"), where("user", "==", user));
      const querySnapshot = await getDocs(q);
      const userDetailsDoc = querySnapshot.docs[0]

      if (userDetailsDoc) {
          // IF USER EXISTS, LOAD DETAILS
          context.commit('setUserDetails', { details: userDetailsDoc.data(), user })
      } else {
          // ELSE CREATE A NEW USER
        const {uid, displayName, photoURL} = context.state.user
        const userDetails = {
          user: uid,
          profName: displayName,
          photoURL: photoURL
        }

        context.dispatch('setUserDetails', { details: userDetails, user } )
      }
    },
    async fetchUserSetups(context, user) {
      const setups = []
      const q = query(collection(db, "setups"), where("user", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => setups.push(doc.data()))
      context.commit('initializeSetups', setups)
    },

    // SETUP ACTIONS
    addSetup(context, setup) {
      context.commit('addSetup', setup)
      setDoc(doc(db, "setups", setup.setupId), setup);
      context.commit('resetUploadProgress')
    },
    deleteSetup(context, { user, setupId } ) {
      const key = `${user.uid}/${setupId}`
      deletePic(key)
      context.commit('deleteSetup', setupId)
      deleteDoc(doc(db, "setups", setupId))
    },
    uploadProgress(context, progress) {
      context.commit('uploadProgress', progress)
    },

    // ITEM ACTIONS
    async saveItem(context, {index, item, setupId }) {
      context.commit('saveItem', {index, setupId, item})
      await updateDoc(doc(db, "setups", setupId), {items: context.getters.setup(setupId).items });
    },
    async deleteItem(context, {item, setupId, index }) {
      context.commit('deleteItem', {item, setupId, index });
      await updateDoc(doc(db, "setups", setupId), {items: context.getters.setup(setupId).items})
    },
    async reorderItem(context, {setupId, reorderItems}) {
      context.commit('reorderItem', {setupId, reorderItems})
      await updateDoc(doc(db, "setups", setupId), {items: context.getters.setup(setupId).items})
    },

    // VIEWING ACTIONS
    async fetchViewingSetup(context, routerAddress) {
      const q = query(collection(db, "setups"), where("setupId", "==", routerAddress));
      const querySnapshot = await getDocs(q);
      const viewingSetup = querySnapshot.docs[0]
      context.commit('fetchViewingSetup', viewingSetup.data())
    },

  }

})

const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;

    store.commit('setLoggedInUser', user);
    await store.dispatch('fetchUserDetails', uid)
    await store.dispatch('fetchUserSetups', user)
    
    store.commit('setLoaded')
  
  } else {
      store.commit('logOut')
  }
});

export default store