<template>

    <img
        v-if="imageURL"
        class="image"
        draggable="false"
        @click="addItem"
        :src="imageURL"
        style="cursor: crosshair"
    />
    <div v-else>loading</div>

    <div v-if="edit">

        <select name="categories" id="categories">
            <option disabled selected>category</option>
            <option v-for="category in categories" :value="category">{{ category }}</option>
        </select>

        <input placeholder="info" id="category" type="text">

        <button>save</button>
        <button @click="this.edit = false">close</button>
    
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
            
            this.$store.dispatch('addItem', { item, setupId })
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

.image {
    width: 650px;
    height: 450px;
    object-fit: cover;
    display: block;
}

</style>