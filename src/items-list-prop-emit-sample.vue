<template>

    <!-- PUT IN AND REGISTER COMPONENT -->
    <!-- <items :setupItems="$store.getters.setup($route.params.setupId).items" @editItem="editItem" @reorderItem="reorderItem" /> -->


    <div v-for="(item, index) in setupItems" :key="item.id">
        <b>{{ item.category }}</b>
        {{ item.info }}
        <button @click="$emit('editItem', item, index)">edit</button>
        <button v-if="index > 0" @click="$emit('reorderItems', index, 'up')">&#8593;</button>
        <button v-if="index < setupItems.length - 1" @click="$emit('reorderItems', index, 'down')">&#8595;</button>
    </div>

</template>

<script>
export default {
    props: {
        setupItems: {
            type: Array,
            required: true
        }
    },
    emits: ["editItem", "reorderItems"],
};
</script>

<style scoped>
p {
    cursor: pointer;
}
</style>