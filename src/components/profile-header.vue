<template>

    <button @click="logOut()">log out</button>

    <div v-if="userDetails">
        <div>{{ userDetails.profName }}</div>
        <img
            :src="userDetails.photoURL"
            :alt="userDetails.photoURL"
            style="display: block;"
        >
    </div>
    <div v-else>loading</div>

</template>

<script>

export default {
    methods: {
        logOut() {
            this.$store.dispatch('logOut')
        }
    },
    computed: {
        userDetails() {
            return this.$store.getters.getuserDetails(this.$route.params.user)
        }
    }
}

</script>