<template>

  <div style="display: flex; justify-content: space-around; align-items: center; height: 100vh">

    <div style="display: flex; flex-direction: column; justify-content: space-around; align-items: center; height: 100px">

      <img src="/desca-logo.png" alt="logo" style="width: 250px;">
      <button @click="logIn()">log in</button>
    
    </div>

  </div>


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
