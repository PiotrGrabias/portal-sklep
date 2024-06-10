<template>
  <v-navigation-drawer
    image="https://wallpaper.dog/large/20420792.jpg"
    color="grey darken-3"
    dark
    width="300"
    expand-on-hover
    rail
    app
  >
    <v-list dense flat>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">pc-parts</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-group value="RAM">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            title="RAM"
            prepend-avatar="../../assets/ram.png"
          ></v-list-item>
        </template>
        <v-list-item v-for="(title, i) in ram" :key="i">
          <v-row no-gutters align="center">
    <v-col cols="auto">
      <label class="checkbox-label">{{ title }}</label>
    </v-col>
    <v-col cols="auto">
      <v-checkbox
        class="white-checkbox"
        color="warning"
        v-model="selectedRam"
        :value="title"
        hide-details
      ></v-checkbox>
    </v-col>
  </v-row>
        </v-list-item>
      </v-list-group>

      <v-list-group value="procesor">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            title="Procesory"
            prepend-avatar="../../assets/procesor.png"
          ></v-list-item>
        </template>
        <v-list-item v-for="(title, i) in procesory" :key="i">
          <v-row no-gutters align="center">
            <v-col cols="auto">
              <label class="checkbox-label">{{ title }}</label>
            </v-col>
            <v-col cols="auto">
              <v-checkbox
                class="white-checkbox"
                color="warning"
                v-model="selectedProcessors"
                :value="title"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list-group>

      <v-list-group value="karta">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            title="Karty Graficzne"
            prepend-avatar="../../assets/karta.png"
          ></v-list-item>
        </template>
        <v-list-item v-for="(title, i) in karty" :key="i">
          <v-row no-gutters align="center">
            <v-col cols="auto">
              <label class="checkbox-label">{{ title }}</label>
            </v-col>
            <v-col cols="auto">
              <v-checkbox
                class="white-checkbox"
                color="warning"
                v-model="selectedCards"
                :value="title"
                hide-details
              ></v-checkbox>
              
            </v-col>
          </v-row>
        </v-list-item>
      </v-list-group>
      <v-list-item prepend-icon="mdi-magnify">
      <v-btn @click="FilterSearch()" variant="elevated" color="teal">Filtruj</v-btn>
    </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useProductStore } from "@/stores/product";
const selectedRam = ref([]);
const selectedCards = ref([]);
const selectedProcessors = ref([]);
const productStore = useProductStore();
const producer = ref('');
const { FilterSearch } = productStore;

const ram = ["GOODRAM"];

const procesory = ["Intel", "Ryzen"];
const karty = ["Nvidia"];
</script>

<style scoped>
.white-checkbox .v-label {
  background-color: white;
  font-size: 18px;
}
</style>
