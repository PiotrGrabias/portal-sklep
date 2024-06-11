<template>
  <v-navigation-drawer
    image="https://wallpaper.dog/large/20420792.jpg"
    color="grey darken-3"
    dark
    width="300"
    expand-on-hover
    rail
    app
    v-if="category !== ''"
  >
    <v-list dense flat>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">pc-parts</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-group value="RAM" v-if="category === 'ram'">
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
                v-model="selectedItems"
                :value="title"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list-group>

      <v-list-group value="procesor" v-if="category === 'procesor'">
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
                v-model="selectedItems"
                :value="title"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list-group>

      <v-list-group value="karta" v-if="category === 'karta'">
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
                v-model="selectedItems"
                :value="title"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list-group>
      <v-list-group value="dysk" v-if="category === 'dysk'">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            title="Dyski"
            prepend-avatar="../../assets/dysk.png"
          ></v-list-item>
        </template>
        <v-list-item v-for="(title, i) in dyski" :key="i">
          <v-row no-gutters align="center">
            <v-col cols="auto">
              <label class="checkbox-label">{{ title }}</label>
            </v-col>
            <v-col cols="auto">
              <v-checkbox
                class="white-checkbox"
                color="warning"
                v-model="selectedItems"
                :value="title"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list-group>
      <v-divider></v-divider>
      <v-row align="center">
      <v-col cols="5">
        <v-text-field
          v-model="lowPrice"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="2" class="text-center">
        <p>-</p>
      </v-col>
      <v-col cols="5">
        <v-text-field
          v-model="highPrice"
          type="number"
        ></v-text-field>
      </v-col>
      <v-list-item>
      <p>Cena</p>
    </v-list-item>
    </v-row>
      <v-list-item prepend-icon="mdi-magnify">
        <v-btn
          @click="FilterSearch(selectedItems, category), $emit('price', lowPrice, highPrice, selectedItems)"
          variant="elevated"
          color="teal"
          >Filtruj</v-btn
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useProductStore } from "@/stores/product";

defineProps({
  category: String,
});
const lowPrice = ref(1);
const highPrice = ref(Infinity);
const selectedItems = ref([]);
const productStore = useProductStore();
const { FilterSearch } = productStore;
const ram = ["GOODRAM"];
const procesory = ["Intel", "Ryzen"];
const karty = ["MSI", "PNY", "GeForce"];
const dyski = ["Samsung"];
</script>

<style scoped>
.white-checkbox .v-label {
  background-color: white;
  font-size: 18px;
}
</style>
