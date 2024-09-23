<template>
    <div v-for="(item, index) in setupItems" :key="item.id">
        <b>{{ item.category }}</b>
        {{ item.info }}
        <button @click="$emit('editItem', item, index)">edit</button>
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
    emits: ["editItem"],
};
</script>

<style scoped>
p {
    cursor: pointer;
}
</style>