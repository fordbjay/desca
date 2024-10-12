<template>

  <div style="display: flex; justify-content: space-around; align-items: center; height: 100vh">

    <div style="display: flex; flex-direction: column; justify-content: space-around; align-items: center;">

      <img src="/desca-logo.png" alt="logo" style="width: 250px;">
      
      <div style="display: flex; align-items: center;">

        <img src="/item-icons/accessory.svg" alt="accessory" style="height: 25px; margin: 10px;">
        <img src="/item-icons/chair.svg" alt="accessory" style="height: 25px; margin: 10px;">
        <img src="/item-icons/computer.svg" alt="accessory" style="height: 25px; margin: 10px;">
        <img src="/item-icons/desk.svg" alt="accessory" style="height: 25px; margin: 10px;">
        <img src="/item-icons/headset.svg" alt="accessory" style="height: 25px; margin: 10px;">
        <img src="/item-icons/keyboard.svg" alt="accessory" style="height: 25px; margin: 10px;">
        <img src="/item-icons/microphone.svg" alt="accessory" style="height: 25px; margin: 10px;">
        <img src="/item-icons/monitor.svg" alt="accessory" style="height: 25px; margin: 10px;">
        <img src="/item-icons/mouse.svg" alt="accessory" style="height: 25px; margin: 10px;">
        <img src="/item-icons/speaker.svg" alt="accessory" style="height: 25px; margin: 10px;">
        <img src="/item-icons/webcam.svg" alt="accessory" style="height: 25px; margin: 10px;">

      </div>

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
