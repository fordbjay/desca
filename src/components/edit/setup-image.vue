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
                    top: (item.y-8) + 'px',
                    left: (item.x-7) + 'px'
                }"
            >
            &#10005;
            </div>

            <div style="z-index: 1000">
                <select v-model="item.category" name="categories" id="categories">
                    <option disabled value="">category</option>
                    <option v-for="category in categories" :value="category">{{ category }}</option>
                </select>

                <input v-model="item.info" placeholder="info" id="category" type="text">

                <button @click="saveItem()">save</button>
                <button @click="closeEdit()">close</button>
            </div>
        </div>

        <!-- item markers -->
        <div v-for="item in $store.getters.setup($route.params.setupId).items" :key="item.id">
            <div class="item-markers" :style="{ top: item.y + 'px', left: item.x + 'px' }">
            &#10005;
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
            edit: false,
            item: {
                category: '',
                info: '',
                x: null,
                y: null,
            },
            categories: ['accessory','chair','computer','desk','headset','keyboard','microphone','monitor','mouse','speaker','camera',]
        }
    },
    methods: {
        async refreshImageURL() {
            const key = `${this.setup.user}/${this.$route.params.setupId}`;
            const url = await downloadPic(key);
            this.imageURL = url;
        },
        addItem(e) {
            this.edit = true;

            // rect compensates for image position on page
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.item = {
                category: this.item.category || '',
                info: this.item.info || '',
                x,
                y,
            };
        },
        resetItem() {
            this.item = {
                category: '',
                info: '',
                x: null,
                y: null,
            };
        },
        closeEdit() {
            this.edit = false;
            this.resetItem()
        },
        saveItem() {
            this.$store.dispatch('saveItem', { index: this.setup.items.length, setupId: this.setup.setupId, item: this.item });
            this.edit = false;
            this.resetItem()
        }
    },
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

.item-markers {
    position: absolute;
    color: white;
    transform: translate(-7px, -8px);
}

</style>