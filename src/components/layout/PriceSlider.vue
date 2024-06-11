<template>
  <div class="slider-container">
    <input 
      type="range" 
      :min="min" 
      :max="max" 
      v-model="number"
      class="slider"
    />
    <div class="slider-values">
      <span>{{ min }}</span>
      <span>{{ value }}</span>
      <span>{{ max }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const number = ref();
defineProps({
  min: Number,
  max: Number,
})
</script>

<style>
.slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.slider {
  width: 80%;
}
.slider-values {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 10px;
}
</style>