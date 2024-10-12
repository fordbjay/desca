<template>
  <div class="container">
    <div 
      v-for="(box, index) in boxes" 
      :key="index" 
      :class="['box', box.size]"
    >
      {{ box.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoxList',
  data() {
    return {
      boxes: [
        { label: 'Box 1', size: 'small' },
        { label: 'Box 2', size: 'medium' },
        { label: 'Box 3', size: 'large' },
        { label: 'Box 4', size: 'medium' },
        { label: 'Box 5', size: 'small' },
        { label: 'Box 6', size: 'large' },
        { label: 'Box 7', size: 'medium' },
        { label: 'Box 8', size: 'small' },
      ],
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 90vw;
}

.box {
  background-color: #3498db;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  border-radius: 5px;
  padding: 10px;
}

.small {
  width: 100px;
  height: 100px;
}

.medium {
  width: 150px;
  height: 150px;
}

.large {
  width: 200px;
  height: 200px;
}
</style>