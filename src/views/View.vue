<template>

    <navBar/>

    <div 
        class="main-image"
        v-if="imageURL"
    >

        <!-- IMAGE -->
        <img style="width: 100%; display: block;" :src="imageURL" :alt="imageURL">

        <!-- ITEM MARKERS -->
        <div
            v-for="(item, index) in items"
            :key="item.id"
        >
            <div
                class="item-markers"
                :style="{ 
                    top: item.y * 100 + '%',
                    left: item.x * 100 + '%',
                    color:'white',
                }"
                @click="selectItem(item, index)"
            >
            &#10005;
            </div>
        </div>

    </div>
    <div v-else>loading...</div>

    <!-- ITEM LIST -->
    <div
        v-if="items"
        v-for="(item, index) in items"
        :key="item.id"
    >
        <b>{{ item.category }}</b>
        {{ item.info }}
    </div>
    <div v-else>loading...</div>

</template>

<script>
    import { downloadPic } from '../firebase.js'
    import navBar from '../components/nav-bar.vue'

    export default {
        
        async created() {
            const routerAddress = this.$route.params.setupId
            await this.$store.dispatch('fetchViewingSetup', routerAddress)

            const key = `${this.$route.params.user}/${routerAddress}`
            this.imageURL = await downloadPic(key)
        },
        components: { navBar },
        data() {
            return {
                imageURL: null,
            }
        },
        methods: {
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

    .main-image {
        width: 80%;
        max-width: 750px;
        height: 100%;
        position: relative;
    }

    .item-markers {
        position: absolute;
        cursor: pointer;
        transform: translate(-50%, -50%)
    }


    @media screen and (max-width: 500px) {

        .main-image {
            width: 100%;
        }
    }

</style>