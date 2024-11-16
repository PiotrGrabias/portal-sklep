<template>
  <v-app>
      <v-main>
        <AppBar/>
      <router-view/>
      </v-main>
    <AppFooter/>
  </v-app>
</template>

<script setup>
import AppBar from '@/components/layout/AppBar.vue';
  //
</script>

