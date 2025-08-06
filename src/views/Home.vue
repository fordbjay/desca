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

.logo {
  
}

h1 {
  /* border: 1px solid; */
  width: 450px;
  font-weight: 400;
}

button {
  padding: 0.75rem 2rem;
  margin-top: 50px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}



</style>
