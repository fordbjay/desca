<template>

  <div class="main-container">

    <div class="action-wrapper">

      <div class="top-logo-motto">
        <!-- LOGO -->
        <img class="logo" src="/desca-logo.png" alt="logo" style="width: 250px;">
        <!-- MOTTO -->
        <h1>The #1 destination to share YOUR ultimate gaming, streaming or working setup</h1>
      </div>  

      <button @click="logIn()">log in</button>

    </div>


<!-- ITEMS SCROLLING -->
    <div class="items-list-container">
      <div class="scrolling-content">
        <!-- Repeat the icons twice for smooth loop -->
        <template v-for="i in 2" :key="i">
          <img src="/item-icons/accessory.svg" alt="accessory">
          <img src="/item-icons/chair.svg" alt="chair">
          <img src="/item-icons/computer.svg" alt="computer">
          <img src="/item-icons/desk.svg" alt="desk">
          <img src="/item-icons/headset.svg" alt="headset">
          <img src="/item-icons/keyboard.svg" alt="keyboard">
          <img src="/item-icons/microphone.svg" alt="microphone">
          <img src="/item-icons/monitor.svg" alt="monitor">
          <img src="/item-icons/mouse.svg" alt="mouse">
          <img src="/item-icons/speaker.svg" alt="speaker">
          <img src="/item-icons/webcam.svg" alt="webcam">
        </template>
      </div>
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

.main-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  /* border: 1px solid blue; */
}

.action-wrapper {
  /* border: 1px solid; */
  /* width: min-content; */
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  /* border: 1px solid; */
  margin-top: 10px;
  margin-bottom: 35px;
  width: 450px;
  font-weight: 400;
}

button {
  padding: 0.75rem 2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #0056b3;
}


.items-list-container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/* Scrolling content */
.scrolling-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: scroll-up 30s linear infinite;
}

.scrolling-content img {
  width: 50px;
  margin: 20px 0;
}

/* Keyframes */
@keyframes scroll-up {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-50%);
  }
}

</style>
