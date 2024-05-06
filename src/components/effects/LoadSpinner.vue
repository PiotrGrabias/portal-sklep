<template>
    <v-overlay :model-value="loading" class="align-center justify-center">
      <v-progress-circular
        style="align-items: center"
        indeterminate
        :size="128"
        color="teal-lighten-1"
      ></v-progress-circular>
    </v-overlay>
  </template>
  
  <script setup>
  </script>