<template>

    <navBar/>

    <div style="width: 650px; height: 100%; position: relative;">

        <!-- IMAGE -->
        <img style="width: 100%; display: block;" :src="imageURL" :alt="imageURL">

        <!-- ITEMS -->
        <div
            v-for="(item, index) in items"
            :key="item.id"
        >
            <div
                class="item-markers"
                :style="{ 
                    top: item.y-9.25 + 'px',
                    left: item.x-6.09 + 'px',
                    color:'white',
                }"
                @click="selectItem(item, index)"
            >
            &#10005;
            </div>
        </div>

    </div>

    <!-- ITEM LIST -->
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
            await this.$store.dispatch('fetchViewingSetup', routerAddress)

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
            selectItem(item, index) {
                console.log(item, index)

            }
        },
        computed: {
            items() {
                return this.$store.state.viewingSetup.items       
            }
        }


    }

</script>

<style scoped>

    .item-markers {
        position: absolute;
        cursor: pointer;
    }

</style>