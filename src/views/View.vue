<template>

    <navBar/>

    <img style="width: 650px; display: block;" :src="imageURL" :alt="imageURL">

    <div
        v-if="items"
        v-for="(item, index) in items"
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
        components: { navBar },
        data() {

            return {
                imageURL: null,
            }
        },
        methods: {
            async refreshImageURL() {
                const key = `${this.$route.params.user}/${this.$route.params.setupId}`
                const url = await downloadPic(key)
                this.imageURL = url
            },
        },
        computed: {
            items() {
                return this.$store.state.viewingSetup.items       
            }
        }


    }

</script>

<style scoped>



</style>