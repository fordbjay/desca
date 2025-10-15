<template>

<div v-if="userDetails">
    <img
    :src="userDetails.photoURL"
    alt="User Photo"
    style="display: block; width: 75px;"
    @click= "$store.state.loggedIn ? editProfile() : logIn()"
    >
    <div>{{ userDetails.profName }}</div>
    <div>{{  }}</div>
</div>
<div v-else>loading...</div>

<profileEdit 
    @close="profileEditOpen = false"
    v-if="profileEditOpen" 
    :editProfileDetails="editProfileDetails"
/>


</template>

<script>
import profileEdit from "./profile-edit.vue"


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
            this.profileEditOpen = true
        },

    },
    computed: {
        userDetails() {
            return this.$store.getters.getUserDetails(this.$route.params.user)
        },
    }
}

</script>