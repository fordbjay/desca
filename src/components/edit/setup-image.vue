<template>

<div class="main-container">

    <img
        v-if="imageURL"
        class="main-image"
        draggable="false"
        @click="addItem"
        :src="imageURL"
        style="cursor: crosshair"
    />
    <div v-else>loading</div>

    <div class="edit-container" v-if="edit">
        <div class="edit-box">
            <select name="categories" id="categories">
                <option disabled selected>category</option>
                <option v-for="category in categories" :value="category">{{ category }}</option>
            </select>

            <input placeholder="info" id="category" type="text">

            <button @click="saveItem()">save</button>
            <button @click="this.edit = false">close</button>
        </div>
    </div>

</div>

</template>

<script>
import { downloadPic } from "../../firebase.js"

export default {
    components: {
    },  
    async created() {
        await this.refreshImageURL()
    },
    data() {
        const setup = this.$store.getters.setup(this.$route.params.setupId)
        
        return {
            imageURL: null,
            setup,
            displayedItemIndex: null,
            edit: false,
            item: {},
            categories: ['accessory','chair','computer','desk','headset','keyboard','microphone','monitor','mouse','speaker','camera',]
        }
    },
    methods: {
        async refreshImageURL() {
            const key = `${this.setup.user}/${this.$route.params.setupId}`
            const url = await downloadPic(key)
            this.imageURL = url
        },
        addItem(e) {
            this.edit = true
            // rect compensates for image position on page
            const rect = e.target.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            
            this.displayedItemIndex = this.currentSetup.items.length
            
            const setupId = this.$route.params.setupId
            const item = {
                category: '',
                info: '',
                x,
                y,
            }
            
            this.item = item
            console.log(this.item)

            // this.$store.dispatch('addItem', { item, setupId })
        },

    },
    computed: {
        currentSetup() {
            return this.$store.getters.setup(this.$route.params.setupId)
        },

    }
}
</script>

<style scoped>

.main-container {
    width: 650px;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.main-image {
    width: 100%;
    display: block;
}

.edit-container {
    position: absolute;
    background-color: rgba(255,255,255,0.5);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.edit-box {
    display: flex;
    flex-direction: column;
}

</style>