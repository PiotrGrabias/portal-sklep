<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        v-for="item in cartItems"
        :key="item.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card class="ma-2 pa-2" hover rounded="xs">
          <v-img
            :src="item.img"
            :aspect-ratio="16/9"
            :height="item.imageHeight || 100"
          ></v-img>
          <v-card-title class="headline text-center">
            <div>{{ item.name }}</div>
          </v-card-title>
          <v-card-subtitle class="text-center">
            Cena: {{ (item.price).toFixed(2) }} zł
          </v-card-subtitle>
          <v-card-subtitle class="text-center">
            Ilość: {{ item.quantity }}
          </v-card-subtitle>
          <v-row class="justify-center align-center my-2">
            <v-tooltip text="Usuń egzemplarz">
              <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              @click.prevent="removeOneItem(item.id)"
              v-if="item.quantity > 1"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
            <v-tooltip text="Usuń produkt">
              <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              @click.prevent="removeFromCart(item.id)"
              v-if="item.quantity == 1"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            </template>
          </v-tooltip>
            <v-tooltip text="Dodaj kolejny egzemplarz">
              <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              @click.prevent="addToCart(item.id)"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            </template>
          </v-tooltip>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-row no-gutters justify="center" align="center">
  <v-col align="center">
    <v-card>
      <v-card-title class="text-h4 font-weight-black">
      Suma do zapłacenia: {{ fullPrice }} zł
    </v-card-title>
  </v-card>
  </v-col>
</v-row>
  <v-row justify="center" align="center" v-if="!isLoggedIn">
  <v-col cols="auto" class="mx-2" >
          <v-btn variant="outlined" link to="/summary" color="teal">Kontynuuj jako gość</v-btn
          >
        </v-col> 
      </v-row>
        <v-row>
  <v-col cols="12">
      <login-form v-if="!isLoggedIn" redirectPath = "/summary"/>
        </v-col>
      </v-row>
      <v-row justify="center" align="center" v-if="isLoggedIn">
  <v-col cols="auto" class="mx-2">
          <v-btn link to="/summary" color="blue">Kontynuuj</v-btn
          >
        </v-col>
      </v-row>
      <ConfirmationDialog v-if="tooManyItems"
  :showConfirmation="tooManyItems" 
  title="Uwaga"
  text="To jest maksymalna ilość dostępnych egzemplarzy"
  @close="tooManyItems  = false"
/>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed } from 'vue';

const cartStore = useCartStore();
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { tooManyItems, cartItems } = storeToRefs(cartStore);
const fullPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
});
console.log(cartItems.value);


const { removeFromCart, removeOneItem, addToCart } = cartStore;
</script>