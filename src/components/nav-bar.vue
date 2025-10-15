<template>
    
    <img src="/desca-logo.png" alt="logo" style="width: 150px; display: block;">

    <button v-if="$route.name != 'Setups'" @click="goToSetups()">setups</button>

    <router-link :to="computedRoute">
        <button v-if="$route.name != 'Setups'">
            {{$route.name === 'Edit' ? 'view' : 'edit'}}
        </button>
    </router-link>


    <profileHeader/>


    

</template>

<script>
import profileHeader from "./profile-header/profile-header.vue"

export default {
    components: {
       profileHeader
    },
    data() {
            return {

            }
        },
    methods: {
        goToSetups() {
            this.$router.push(`/setups/${this.$store.state.user.uid}`)
        }
    },
    computed: {
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