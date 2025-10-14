<template>

    <img src="/desca-logo.png" alt="logo" style="width: 150px; display: block;">

    <button v-if="$route.name != 'Setups'" @click="goToSetups()">setups</button>

    <router-link :to="computedRoute">
        <button v-if="$route.name != 'Setups'">
            {{$route.name === 'Edit' ? 'view' : 'edit'}}
        </button>
    </router-link>

    <div v-if="userDetails">
        <img
        :src="userDetails.photoURL"
        alt="User Photo"
        style="display: block; width: 75px;"
        @click= "$store.state.loggedIn ? editProfile() : logIn()"
        >
        <div>{{ userDetails.profName }}</div>
    </div>
    <div v-else>loading...</div>



    <profileEdit v-if="profileEditOpen" :editProfileDetails="editProfileDetails"/>


    

</template>

<script>
import profileEdit from "./profile-editor.vue"

function copy(value) {
  return JSON.parse(JSON.stringify(value))
}

export default {
    components: {
        profileEdit
    },
    data() {
            return {
                profileEditOpen: false,
                editProfileDetails: null,
            }
        },
    methods: {
        editProfile() {
            this.editProfileDetails = copy(this.userDetails)
            console.log('open profile editor')
            this.profileEditOpen = !this.profileEditOpen
        },


        logOut() {
            this.$store.dispatch('logOut')
        },
        goToSetups() {
            this.$router.push(`/setups/${this.$store.state.user.uid}`)
        }
    },
    computed: {
        userDetails() {
            return this.$store.getters.getUserDetails(this.$route.params.user)
        },
        computedRoute() {
            const uid = this.$store.state.user?.uid;
            const setupId = this.$route.params.setupId;

            if (uid) { // Ensure uid is defined
                if (this.$route.name === 'Edit') {
                    return `/${uid}/${setupId}`;
                } else {
                    return `/edit/${uid}/${setupId}`;
                }
            } else {
                return '/'; // or any fallback route
            }
        }
    }
}

</script>