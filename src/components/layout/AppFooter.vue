<template>
  <v-footer  class="custom-footer">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.name"
        class="mx-2"
        color="white"
        rounded="xl"
        variant="text"
        :to="link.url"
      >
        {{ link.name }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12" style="color:white">
        {{ new Date().getFullYear() }}  <strong>Pc-parts</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
const links = [
  { name: 'Strona główna', url: '/' },
  { name: 'O nas', url: '/about' },
  { name: 'Wsparcie', url: '/support' },
];
</script>

<style scoped>
.custom-footer {
  background-image: url('@/assets/tlo.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>