<template>

<router-link to="/">Home</router-link>
<br>
<router-link to="/about">About</router-link>

<router-view></router-view>

<p>{{ $store.state.test }}</p>

</template>

<script setup>

</script>

<style scoped>

</style>
