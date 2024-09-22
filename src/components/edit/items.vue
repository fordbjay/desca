<template>

    <p v-for="item, index in $store.getters.setup($route.params.setupId).items">
        <b>{{ item.category }}</b>
        {{ item.info }} 
        {{ item.x }},{{ item.y }}
    </p>

</template>

<script>



</script>

<style scoped>



</style>
