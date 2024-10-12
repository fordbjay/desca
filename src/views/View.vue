<template>

    <navBar/>

    <div 
        class="main-image"
        v-if="imageURL"
    >

        <!-- IMAGE -->
        <img style="width: 100%; display: block;" :src="imageURL" :alt="imageURL">

        <!-- ITEM BOX -->
        <div v-if="viewing" class="view-item-container">
            <div style="">
                <p>{{ selectedItem.category }}</p>
                <p>{{ selectedItem.info }}</p>
                <button @click="viewing=false;">&#10005;</button>

            </div>
        </div>

        <!-- ITEM MARKERS -->
        <div
            v-for="(item) in itemMarkersToDisplay"
            :key="item.id"
        >
            <div
                class="item-markers"
                :style="{ 
                    top: item.y * 100 + '%',
                    left: item.x * 100 + '%',
                    color: this.viewing ? 'red' : 'white',
                }"
                @click="selectItem(item)"
            >
            &#10005;
            </div>
        </div>

    </div>
    <div v-else>loading...</div>

    <!-- ITEM LIST -->
    <div
        v-if="items"
        v-for="(item) in items"
        :key="item.id"
        style="cursor: pointer;"
    >
        <div @click="selectItem(item)">
            <b>{{ item.category }}</b>
            {{ item.info }}

        </div>
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
                viewing: false,
                selectedItem: {},
            }
        },
        methods: {
            selectItem(item) {
                this.viewing = true;
                this.selectedItem = item;
            }
        },
        computed: {
            items() {
                return this.$store.state.viewingSetup.items       
            },
            itemMarkersToDisplay() {
                return this.viewing ? [this.selectedItem] : this.items;
            }
        }


    }

</script>

<style scoped>

    .main-image {
        width: 100%;
        max-width: 750px;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .view-item-container {
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: white;
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