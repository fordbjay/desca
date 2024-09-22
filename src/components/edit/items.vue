<template>

    <div v-for="item in $store.getters.setup($route.params.setupId).items">
        <p>{{item.category}}</p>
        <p>{{ item.info }}</p>
        <p>{{ item.x }}, {{ item.y }}</p>

        <button @click="editItem()">Edit</button>
        <button @click="deleteItem()">delete</button>
    </div>

</template>

<script>
export default {
    methods: {
        editItem() {
            console.log('edit')
        },
        deleteItem() {
            console.log('delete')
        }
    }
}


</script>

<style scoped>



</style>
