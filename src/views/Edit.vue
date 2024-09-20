<template>

    <profileHeader/>

    <setupImage/>

    <items/>

</template>

<script>
import profileHeader from '../components/profile-header.vue';
import setupImage from '../components/edit/setup-image.vue';
import items from '../components/edit/items.vue';

export default {
    components: { profileHeader, setupImage, items },
}
</script>

<style scoped>

</style>