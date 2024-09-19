import { createStore } from 'vuex'
import { doc, getDocs, deleteDoc, updateDoc, collection, query, where, setDoc, getFirestore, startAfter } from "firebase/firestore"; 
import { login, logOut } from '../firebase/firebase.js'
import {  getAuth, onAuthStateChanged } from "firebase/auth";
import router from '../router/index.js';

const db = getFirestore();

// Create a new store instance.
const store = createStore({
  state () {
    return {
      loaded: false,
      setups: [],
      profileDetails: {},
    }
  },
  getters: {
  },
  mutations: {
    setLoggedInUser(state, user) {
      state.user = user;
      state.loggedIn = true;
    },
    setLoaded(state) {
      state.loaded = true
    },
    initializeSetups(state, setups) {
      state.setups = setups
    },
    setProfDetails(state, { details, user }) {
      state.profileDetails[user] = details
    },
  },
  actions: {
    logIn(context) {
      login(async user => {
        context.commit('setLoggedInUser', user);
        await context.dispatch('fetchUserDetails', user.uid)
        await context.dispatch('fetchUserSetups', user)
        // SETUP PAGE OPENS AFTER LOG IN
        await router.push(`/setups/${context.state.user.uid}`)
        context.commit('setLoaded')
        console.log(user.uid)
      })
    },
    async fetchUserDetails(context, user) {
      const q = query(collection(db, "profileDetails"), where("user", "==", user));
      const querySnapshot = await getDocs(q);
      const profileDetailsDoc = querySnapshot.docs[0]

      if (profileDetailsDoc) {
          // IF USER EXISTS, LOAD DETAILS
          context.commit('setProfDetails', { details: profileDetailsDoc.data(), user })
      } else {
          // ELSE CREATE A NEW USER
        const {uid, displayName, photoURL} = context.state.user
        const profileDetails = {
          user: uid,
          profName: displayName,
          profPic: {
            photoURL: photoURL,
            profPicId: null
          },
          socialLinks: {
            twitch: '',
            twitter: '',
            youtube: '',
            discord: '',
            facebook: '',
            website: '',
          },
        }

        context.dispatch('changeDetails', { details: profileDetails, user } )
      }
    },
    async fetchUserSetups(context, user) {
      const setups = []
      const q = query(collection(db, "setups"), where("user", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => setups.push(doc.data()))
      context.commit('initializeSetups', setups)
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
    
    // SETUP PAGE OPENS AFTER LOG IN
    await router.push(`/setups/${uid}`)
  
    store.commit('setLoaded')
  
  } else {
      if (router.currentRoute.name !== 'View') {
        await router.push('/')
      }
      store.commit('logOut')

  }
});

export default store
