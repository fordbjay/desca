<template>

    <div class="main-container" v-if="imageURL">
        <!-- main image -->
        <img
            class="main-image"
            draggable="false"
            @click="addItem"
            :src="imageURL"
            style="cursor: crosshair"
        />

        <!-- edit box -->
        <div class="edit-container" v-if="edit">
            <!-- temp item position -->
            <div
                :style="{
                    position: 'absolute',
                    color: 'red',
                    top: (item.y-10) + 'px',
                    left: (item.x-5) + 'px'
                }"
            >
            &#10005;
            </div>

            <div style="z-index: 1000">
                <select v-model="item.category" name="categories" id="categories">
                    <option disabled>category</option>
                    <option v-for="category in categories" :value="category">{{ category }}</option>
                </select>

                <input v-model="item.info" placeholder="info" id="category" type="text">

                <button @click="saveItem()">save</button>
                <button @click="closeEdit()">close</button>
            </div>
        </div>

    </div>

    <div v-else>loading</div>

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
            itemIndex: null,
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
            
            const setupId = this.$route.params.setupId
            const item = {
                ...this.item,
                index: this.currentSetup.items.length,
                x,
                y,
            }
            
            this.item = item
        },
        closeEdit() {
            this.edit = false;
            this.item = {}
        },
        saveItem() {
            this.$store.dispatch('saveItem', { setupId: this.currentSetup.setupId, item: this.item })
            this.edit = false;
            this.item = {}
        }

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
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

</style>