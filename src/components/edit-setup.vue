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
        <!-- item markers -->
        <div
            v-for="(item, index) in this.itemMarkersToDisplay"
            :key="item.id"
        >
            <p
                class="item-markers"
                :style="{ top: item.y-9.25 + 'px', left: item.x-6.09 + 'px', color: this.editing ? 'red' : 'white' }"
                @click="editItem(item, index)"
            >
            &#10005;
            </p>
        </div>
        <!-- edit box -->
        <div class="edit-container" v-if="editing">
            <div style="z-index: 1000">
                <select v-model="itemToEdit.category" name="categories" id="categories">
                    <option disabled value="">category</option>
                    <option v-for="category in categories" :value="category">{{ category }}</option>
                </select>

                <input v-model="itemToEdit.info" placeholder="info" id="category" type="text">

                <button v-if="this.itemHasChanges" @click="saveItem()">{{ this.editIndex != null ? 'update' : 'save'}}</button>
                <button v-if="this.editIndex != null" @click="deleteItem()">delete</button>
                <button @click="resetItem()">&#10005;</button>
            </div>
        </div>

    </div>
    <div v-else>loading</div>

    <!-- ITEM LIST -->
    <div
        v-if="this.setup.items"
        v-for="(item, index) in this.setup.items"
        :key="item.id"
    >
        <b>{{ item.category }}</b>
        {{ item.info }}
        <button @click="editItem(item, index)">edit</button>
        <button v-if="index > 0" @click="reorderItem(index, 'up')">&#8593;</button>
        <button v-if="index < this.setup.items.length - 1" @click="reorderItem(index, 'down')">&#8595;</button>
    </div>
    <div v-else>loading</div>

</template>

<script>
import { downloadPic } from "../firebase.js"

export default {
    components: { },
    async created() {
        await this.refreshImageURL()
    },
    data() {
        const setup = this.$store.getters.setup(this.$route.params.setupId)
        
        return {
            imageURL: null,
            setup,
            editing: false,
            editIndex: null,
            itemToEdit: {
                category: '',
                info: '',
                x: null,
                y: null,
            },
            categories: ['accessory','camera','chair','computer','desk','headset','keyboard','microphone','monitor','mouse','speaker',]
        }
    },
    methods: {
        async refreshImageURL() {
            const key = `${this.setup.user}/${this.$route.params.setupId}`;
            const url = await downloadPic(key);
            this.imageURL = url;
        },
        addItem(e) {
            this.editing = true;
            this.editIndex = null;
            // rect compensates for image position on page
            const rect = e.target.getBoundingClientRect();

            this.itemToEdit = {
                category: this.itemToEdit.category,
                info: this.itemToEdit.info,
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        },
        resetItem() {
            this.editing = false;
            this.editIndex = null;
            this.itemToEdit = {
                category: '',
                info: '',
                x: null,
                y: null,
            };
        },
        saveItem() {
            const indexToChange = this.editIndex != null ? this.editIndex : this.setup.items.length
            this.$store.dispatch('saveItem', { index: indexToChange, setupId: this.setup.setupId, item: this.itemToEdit });
            this.resetItem()
        },
        editItem(item,index) {
            this.editIndex = index
            this.editing = true

            this.itemToEdit = {
                category: item.category,
                info: item.info,
                x: item.x,
                y: item.y,
            };

        },
        deleteItem() {
            this.$store.dispatch('deleteItem', { setupId: this.$route.params.setupId, index: this.editIndex })
            this.resetItem()
        },
        reorderItem(index, direction) {
            this.resetItem()
            
            const oldItems = [...this.setup.items];

            // in case first item or last item
            if (index < 0 || index >= oldItems.length) return;

            let newIndex = index;

            if (direction === 'up') {
                newIndex = index - 1;
            } else if (direction === 'down') {
                newIndex = index + 1;
            }

            if (newIndex < 0 || newIndex >= oldItems.length) return;

            const reOrderedItems = [...oldItems];

            [reOrderedItems[index], reOrderedItems[newIndex]] = [reOrderedItems[newIndex], reOrderedItems[index]];

            this.$store.dispatch('reorderItem', { setupId: this.$route.params.setupId, reOrderedItems: reOrderedItems });
        },
    },
    computed: {
        itemHasChanges() {
            const fieldsToOmit = ['x', 'y'];
            
            if (this.editIndex === null) {
                return Object.keys(this.itemToEdit)
                    .filter(field => !fieldsToOmit.includes(field))
                    .some(field => this.itemToEdit[field]?.trim() !== '');
            }

            const currentItem = this.setup.items[this.editIndex];

            return Object.keys(currentItem).some(key => currentItem[key] !== this.itemToEdit[key]);
        
        },
        itemMarkersToDisplay() {
            return this.editing ? [this.itemToEdit] : this.setup.items;
        }
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

.item-markers {
    position: absolute;
    color: white;
    cursor: pointer;
}

</style>