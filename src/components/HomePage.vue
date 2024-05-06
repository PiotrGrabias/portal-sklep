<template>
  <v-container>
    <v-row no-gutters>
      <v-col v-for="prod in products" :key="prod.id" cols="12" sm="6" md="3">
        <router-link :to="'/products/' + prod.id" custom>
          <template #default="{ navigate }">
            <v-card class="ma-2 pa-2" hover rounded="xs" @click="navigate">
              <v-img
                :height="100"
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
                  @click.stop="addToCart(prod.id, prod.product_name, prod.price, prod.image_path)"
                >
                  Dodaj do koszyka
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useProductStore } from '../stores/product.js';
import { useCartStore } from '@/stores/cart.js';

const cartStore = useCartStore();
const productStore = useProductStore();
const { addToCart } = cartStore;

onMounted(async () => {
  await productStore.getItems();
  cartStore.loadCart();
  console.log("Fetched products:", productStore.products);
});

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