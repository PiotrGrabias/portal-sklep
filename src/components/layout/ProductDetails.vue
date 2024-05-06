<template>
  <v-container>
    <v-row no-gutters>
      <v-col v-for="prod in products" :key="prod.id" cols="12" sm="6" md="3">
        <router-link :to="'/products/' + prod.id" custom>
          <template #default="{ navigate }">
            <v-card class="ma-2 pa-2" hover rounded="xs" @click="navigate">
              <v-img aspect-ratio="16/9" :src="prod.image_path"></v-img>
              <v-card-title class="headline text-center">
                <div v-text="prod.product_name"></div>
              </v-card-title>
              <hr class="custom-hr" />
              <v-text style="font-size: 16px">
                {{ prod.description }}
              </v-text>
            </v-card>
          </template>
        </router-link>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-row no-gutters class="justify-center align-center my-2">
          <v-card
            v-for="prod in products"
            :key="prod.id"
            class="ma-2 pa-2"
            hover
            rounded="xs"
          >
            <v-card-title>Cena {{ prod.price }} zł</v-card-title>
            <v-card-title>Metody dostawy:</v-card-title>
            <v-list>
              <hr class="custom-hr" />
              <v-list-item> Paczkomaty Inpost 24/7 </v-list-item>
              <hr class="custom-hr" />
              <v-list-item> Poczta Polska </v-list-item>
              <hr class="custom-hr" />
              <v-list-item> Kurier DHL </v-list-item>
              <hr class="custom-hr" />
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  color="teal"
                  variant="elevated"
                  @click.stop="
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
            </v-list>
          </v-card>
        </v-row>
      </v-col>
      <v-col
        
      >
        <v-card >
          <v-card-title>Mogą ci się również spodobać</v-card-title>
          <router-link :to="'/products/' + prod.id" custom v-for="prod in productsmore"
        :key="prod.id"
        cols="12"
        sm="6"
        md="3">
            <template #default="{ navigate }" >
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
                    @click.stop="
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
            </template>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useProductStore } from "@/stores/product.js";
import { useCartStore } from "@/stores/cart.js";
import { useRoute } from "vue-router";

const cartStore = useCartStore();
const productStore = useProductStore();
const { addToCart } = cartStore;
const route = useRoute();
const products = ref([]);

onMounted(async () => {
  await productStore.getItem(route.params.id);
  productStore.getItemsByCategory();
  cartStore.loadCart();

  const product = productStore.products;
  if (product && product.data) {
    const item = {
      id: product.data.id,
      ...product.data.attributes,
    };
    products.value = [item];
  } else {
    console.error("No product found or data attribute missing");
    products.value = [];
  }
});
const productsmore = computed(() => {
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

<style scoped>
.custom-hr {
  width: 100%;
  margin: 0 auto;
  border-top: 1px solid rgb(0, 0, 0);
}
</style>
