<template>

    <div v-for="item, index in $store.getters.setup($route.params.setupId).items">
        <p>{{item.category}}</p>
        <p>{{ item.info }}</p>
        <p>{{ item.x }}, {{ item.y }}</p>

        <button @click="editItem(index)">Edit</button>
        <button @click="deleteItem(index)">delete</button>
    </div>

</template>

<script>
export default {
    methods: {
        editItem(index) {
            console.log('edit', index)
        },
        deleteItem(index) {
            this.$store.dispatch('removeItem', { setupId: this.$route.params.setupId, index })
        }
    }
}


</script>

<style scoped>



</style>
