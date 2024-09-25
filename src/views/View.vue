<template>

    <navBar/>

    <img style="width: 650px; display: block;" :src="imageURL" :alt="imageURL">

    <div
        v-if="setup.items"
        v-for="(item, index) in setup.items"
        :key="item.id"
    >
        <b>{{ item.category }}</b>
        {{ item.info }}
    </div>
    <div v-else>loading</div>

</template>

<script>
    import { downloadPic } from '../firebase.js'
    import navBar from '../components/nav-bar.vue'

    export default {
        

        async created() {
            const routerAddress = this.$route.params.setupId
            this.$store.dispatch('fetchViewingSetup', routerAddress)

            this.refreshImageURL()
        },
        component: { navBar },
        data() {
            const setup = this.$store.getters.setup(this.$route.params.setupId)

            return {
                imageURL: null,
                setup
            }
        },
        methods: {
            async refreshImageURL() {
                const key = `${this.$route.params.user}/${this.$route.params.setupId}`
                const url = await downloadPic(key)
                this.imageURL = url
            },
        },


    }

</script>

<style scoped>



</style>