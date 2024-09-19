<template>

    <p>About</p>

    <button @click="changeToHi()">hi!</button>

</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    changeToHi() {
        this.$store.dispatch('changeToHi', {})
    }
  }
}

</script>

<style scoped>

</style>
