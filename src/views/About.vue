<template>
    <br>
    <button @click="changeToHi()">Hello</button>

    <p>{{ $store.state.hello }}</p>

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
