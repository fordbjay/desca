<template>

  <div class="main-container">

    <div class="action-wrapper">

      <div class="top-logo-motto">
        <!-- LOGO -->
        <img class="logo" src="/desca-logo.png" alt="logo" style="width: 250px;">
        <!-- MOTTO -->
        <h1>The #1 destination to share YOUR ultimate gaming, streaming or working setup</h1>
      </div>  

      <button @click="logIn()">Start Sharing Your Setup Today! &#8594;</button>

    </div>

  <div class="scrolling-columns-wrapper">

      <!-- ITEMS SCROLLING -->
      <div class="items-list-container">
        <div class="scrolling-items">
          <!-- Repeat the icons twice for smooth loop -->
          <template v-for="i in 2" :key="i">
            <img class="item" src="/item-icons/accessory.svg" alt="accessory">
            <img class="item" src="/item-icons/chair.svg" alt="chair">
            <img class="item" src="/item-icons/computer.svg" alt="computer">
            <img class="item" src="/item-icons/desk.svg" alt="desk">
            <img class="item" src="/item-icons/headset.svg" alt="headset">
            <img class="item" src="/item-icons/keyboard.svg" alt="keyboard">
            <img class="item" src="/item-icons/lighting.svg" alt="lighting">
            <img class="item" src="/item-icons/microphone.svg" alt="microphone">
            <img class="item" src="/item-icons/monitor.svg" alt="monitor">
            <img class="item" src="/item-icons/mouse.svg" alt="mouse">
            <img class="item" src="/item-icons/speaker.svg" alt="speaker">
            <img class="item" src="/item-icons/laptop.svg" alt="laptop">
            <img class="item" src="/item-icons/webcam.svg" alt="webcam">
          </template>
        </div>
      </div>

      <div class="items-list-container">
        <div class="scrolling-setups">
          <!-- Repeat the icons twice for smooth loop -->
          <template v-for="i in 2" :key="i">
            <img class="setup-pic" src="/desk-setups-samples/sample-desk-1.jpg" alt="sample-1">
            <img class="setup-pic" src="/desk-setups-samples/sample-desk-2.jpg" alt="sample-2">
            <img class="setup-pic" src="/desk-setups-samples/sample-desk-3.jpg" alt="sample-3">
            <img class="setup-pic" src="/desk-setups-samples/sample-desk-4.jpg" alt="sample-4">
            <img class="setup-pic" src="/desk-setups-samples/sample-desk-5.jpg" alt="sample-5">
            <img class="setup-pic" src="/desk-setups-samples/sample-desk-6.jpg" alt="sample-6">
            <img class="setup-pic" src="/desk-setups-samples/sample-desk-7.jpg" alt="sample-7">
            <img class="setup-pic" src="/desk-setups-samples/sample-desk-8.jpg" alt="sample-8">
            <img class="setup-pic" src="/desk-setups-samples/sample-desk-9.jpg" alt="sample-9">
            <img class="setup-pic" src="/desk-setups-samples/sample-desk-10.jpg" alt="sample-10">
          </template>
        </div>
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
  /* width: 80%; */
  margin: 0 20px;
  /* height: 100vh; */
  /* border: 1px solid blue; */
  overflow-x: hidden;
  /* background-color: purple; */
}

.action-wrapper {
  /* border: 1px solid; */
  /* width: min-content; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
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
  justify-content: space-between;
  align-items: center;
}

.scrolling-columns-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid; */
  gap: 3rem;
  
}

/* Scrolling content */
.scrolling-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: scroll-up 45s linear infinite;
}

.scrolling-setups {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: scroll-down 60s linear infinite;
}

.item {
  width: 50px;
  margin: 20px 0;
  background: transparent;
}

.setup-pic {
  width: 350px;
  border-radius: 15px;
  margin: 20px 0;
}

.scrolling-items:hover,
.scrolling-setups:hover {
  animation-play-state: paused;
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

@keyframes scroll-down {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0%);
  }  
}

</style>