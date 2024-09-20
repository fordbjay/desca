<template>

    <button @click="logOut()">log out</button>

    <div v-if="profileDetails">
        <div>{{ profileDetails.profName }}</div>
        <img class="prof-pic" :src="profileDetails.photoURL" :alt="profileDetails.photoURL">
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
        profileDetails() {
            return this.$store.getters.getProfileDetails(this.$route.params.user)
        }
    }
}

</script>