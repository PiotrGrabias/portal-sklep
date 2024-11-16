<template>
  <SideBar :category="currCategory" @price="handlePrice" />
  <v-container>
    <div v-if="isCategory">
      <v-row no-gutters align="center" justify="center">
        <v-col cols="auto" class="mx-2">
          <v-btn
            @click="getCategoryItems('procesor')"
            class="display-1 text-center"
            >Procesory </v-btn
          >
        </v-col>
        <v-col cols="auto" class="mx-2">
          <v-btn @click="getCategoryItems('ram')" class="display-1 text-center"
            >Pamięci RAM</v-btn
          >
        </v-col>
        <v-col cols="auto" class="mx-2">
          <h1 class="display-1 text-center">Bestsellery</h1>
        </v-col>
        <v-col cols="auto" class="mx-2">
          <v-btn
            @click="getCategoryItems('karta')"
            class="display-1 text-center"
            >Karty Graficzne</v-btn
          >
        </v-col>
        <v-col cols="auto" class="mx-2">
          <v-btn @click="getCategoryItems('dysk')" class="display-1 text-center"
            >Dyski ssd</v-btn
          >
        </v-col>
      </v-row>
    </div>

    <v-row no-gutters>
      <v-col v-for="prod in products" :key="prod.id" cols="12" sm="6" md="3">
  <v-card
    class="ma-2 pa-2"
    hover
    rounded="xs"
    min-height="350"
    :class="{ 'opacity-50': prod.attributes.amount <= 0 }"
  >
    <v-row align="start">
      <v-col>
        <div v-if="prod.attributes.sold_amount > 5" class="d-flex align-center">
          <v-icon size="50" color="red" class="wave-effect">mdi-fire</v-icon>
          <p class="display-1">Popularne</p>
        </div>
      </v-col>
    </v-row>
    <v-img
      :height="150"
      aspect-ratio="16/9"
      :src="prod.attributes.image_path"
    ></v-img>
    <v-card-title class="headline text-center">
      <div v-text="prod.attributes.product_name"></div>
    </v-card-title>
    <v-card-subtitle class="text-center">
      {{ prod.attributes.price }} zł
    </v-card-subtitle>
    <v-card-actions class="d-flex justify-center">
      <v-btn
        v-if="prod.attributes.amount > 0"
        variant="elevated"
        color="teal"
        @click.prevent="
          addToCart(
            prod.id,
            prod.attributes.product_name,
            prod.attributes.price,
            prod.attributes.image_path
          )
        "
      >
        Dodaj do koszyka
      </v-btn>
      <v-chip v-else color="red" outlined>Wyprzedane</v-chip>
    </v-card-actions>
  </v-card>
</v-col>

    </v-row>
    <v-col cols="auto" class="mx-2" v-if="isCategory">
      <h1 class="display-1 text-center">Ostatnio dodane</h1>
    </v-col>
    <v-row no-gutters>
      <v-col v-for="prod in products" :key="prod.id" cols="12" sm="6" md="3">
        <a :href="'/products/' + prod.id" class="no-underline">
          <v-card
            class="ma-2 pa-2"
            hover
            rounded="xs"
            min-height="350"
            v-if="prod.attributes.added_last_week"
          >
            <v-icon size="50" color="blue">mdi-new-box</v-icon>
            <v-img
              :height="150"
              aspect-ratio="16/9"
              :src="prod.attributes.image_path"
            ></v-img>
            <v-card-title class="headline text-center">
              <div v-text="prod.attributes.product_name"></div>
            </v-card-title>
            <v-card-subtitle class="text-center">
              {{ prod.attributes.price }} zł
            </v-card-subtitle>
            <v-card-actions class="d-flex justify-center">
              <v-btn
                variant="elevated"
                color="teal"
                @click.prevent="
                  addToCart(
                    prod.id,
                    prod.attributes.product_name,
                    prod.attributes.price,
                    prod.attributes.image_path
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
  <v-alert
    max-height="300"
    density="compact"
    text="Brak produktów spełniających kryteria wyszukiwania."
    title="Ups!"
    type="warning"
    :model-value="noItems"
  ></v-alert>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useProductStore } from "../stores/product.js";
import { useCartStore } from "@/stores/cart.js";

const lowPrice = ref(0);
const highPrice = ref(10000);
const cartStore = useCartStore();
const isCategory = ref(true);
const currCategory = ref("");
const producer = ref("");
const { addToCart } = cartStore;
const productStore = useProductStore();
const products = computed(() => productStore.products);
const noItems = ref(false);

onMounted(async () => {
  await productStore.getItems();
  console.log(isCategory.value);
});

const getCategoryItems = async (category) => {
  await productStore.getItemsByCategory(category);
  isCategory.value = false;
  currCategory.value = category;
};
const getItemsByPrice = async (prod, category, min, max) => {
  await productStore.FilterSearch(prod, category, min, max);
  noItems.value = false;
  if (products.value.length === 0) {
    noItems.value = true;
  }
};

function handlePrice(low, high, prod) {
  lowPrice.value = low;
  highPrice.value = high;
  producer.value = prod;
  getItemsByPrice(prod, currCategory.value, low, high);
}
</script>

<style>
.no-underline {
  text-decoration: none;
  color: white;
}
.wave-effect {
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0% {
    transform: rotate(0deg) translateY(0px);
  }
  25% {
    transform: rotate(5deg) translateY(-2px);
  }
  50% {
    transform: rotate(0deg) translateY(0px);
  }
  75% {
    transform: rotate(-5deg) translateY(2px);
  }
  100% {
    transform: rotate(0deg) translateY(0px);
  }
}
.opacity-50 {
  pointer-events: none;
  cursor: not-allowed;
}

</style>
