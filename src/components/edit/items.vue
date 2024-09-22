<template>

    <div v-for="item in $store.getters.setup($route.params.setupId).items">
        <span><b>category: </b>{{item.category}}</span>
        <span><b> info: </b>{{ item.info }}</span>

    </div>

</template>

<script>



</script>

<style scoped>



</style>
