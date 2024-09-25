<template>

    <button @click="logOut()">log out</button>
    <button v-if="this.$route.name != 'Setups'" @click="goToSetups()">setups</button>

    <router-link
        v-if="this.$route.name === 'Edit'"
        :to="`/${$store.state.user.uid}/${$route.params.setupId}`"
    >
    <button v-if="this.$route.name != 'View'">view</button>
    </router-link>

    <div v-if="userDetails">
        <img
        :src="userDetails.photoURL"
        :alt="userDetails.photoURL"
        style="display: block;"
        >
        <div>{{ userDetails.profName }}</div>
    </div>
    <div v-else>loading</div>

</template>

<script>

export default {
    methods: {
        logOut() {
            this.$store.dispatch('logOut')
        },
        goToSetups() {
            this.$router.push(`/setups/${this.$store.state.user.uid}`)
        }
    },
    computed: {
        userDetails() {
            return this.$store.getters.getuserDetails(this.$route.params.user)
        },
        test() {
            console.log('test')
        }
    }
}

</script>