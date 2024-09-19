<template>

    <button @click="logIn()">log in</button>

</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    logIn() {
        this.$store.dispatch('logIn')
    }
  }
}

</script>

<style scoped>

</style>
