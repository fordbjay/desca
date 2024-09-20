<template>

    <profileHeader/>

    <button @click="goToSetups()">go to setups</button>

    <p>edit</p>

</template>

<script>
import profileHeader from '../components/profile-header.vue';

export default {

    components: {
            profileHeader,
        },
    methods: {
        goToSetups() {
            this.$router.push(`/setups/${this.$store.state.user.uid}`)
        }
    }

}
</script>

<style scoped>


</style>