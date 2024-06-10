<template>
  <SideBar :category="currCategory"/>
  <v-container>
    <div v-if="isCategory">
    <v-row no-gutters align="center" justify="center">
  <v-col cols="auto"  class="mx-2">
    <v-btn @click="getCategoryItems('procesor')"  class="display-1 text-center">Procesory</v-btn>
  </v-col>
  <v-col cols="auto"  class="mx-2">
    <v-btn @click="getCategoryItems('ram')" class="display-1 text-center">RAM</v-btn>
  </v-col>
  <v-col cols="auto"  class="mx-2">
    <h1 class="display-1 text-center">Bestsellery</h1>
  </v-col>
  <v-col cols="auto"  class="mx-2">
    <v-btn @click="getCategoryItems('karta')" class="display-1 text-center">Karty Graficzne</v-btn>
  </v-col>
  <v-col cols="auto"  class="mx-2">
    <v-btn @click="getCategoryItems('dysk')" class="display-1 text-center">Dyski ssd</v-btn>
  </v-col>
</v-row>
</div>

    <v-row no-gutters>
      <v-col v-for="prod in products" :key="prod.id" cols="12" sm="6" md="3">
        <a :href="'/products/' + prod.id" class="no-underline" >
            <v-card
              class="ma-2 pa-2"
              hover
              rounded="xs"
            >
              <v-img
                :height="150"
                aspect-ratio="16/9"
                :src="prod.image_path"
              ></v-img>
              <v-card-title class="headline text-center">
                <div v-text="prod.product_name"></div>
              </v-card-title>
              <v-card-subtitle class="text-center">
                {{ prod.price }} zł
              </v-card-subtitle>
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  variant="elevated"
                  color="teal"
                  @click.prevent="
                    addToCart(
                      prod.id,
                      prod.product_name,
                      prod.price,
                      prod.image_path
                    )
                  "
                >
                  Dodaj do koszyka
                </v-btn>
              </v-card-actions>
            </v-card>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useProductStore } from '../stores/product.js';
import { useCartStore } from '@/stores/cart.js';

const cartStore = useCartStore();
const isCategory = ref(true);
const currCategory = ref('');
const { addToCart } = cartStore;
const productStore = useProductStore();
onMounted(async () => {
  await productStore.getItems();
  console.log("Fetched products:", productStore.products);
});
const getCategoryItems = async(category) => {
  await productStore.getItemsByCategory(category);
  isCategory.value = false;
  currCategory.value = category;
  console.log(currCategory.value)
}
const products = computed(() => {
  if (Array.isArray(productStore.products.data)) {
    return productStore.products.data.map((product) => ({
      id: product.id,
      ...product.attributes,
    }));
  } else {
    console.error("products.data is not an array:", productStore.products.data);
    return [];
  }
});


</script>

<style>
  .no-underline {
    text-decoration: none;
    color: white
  }
</style>