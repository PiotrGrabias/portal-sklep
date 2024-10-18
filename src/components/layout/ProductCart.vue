<template>
  <v-menu open-on-click :close-on-content-click=false v-if="showCart"> 
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <v-badge 
      color="red"
      :content="totalItems"
      overlap
      >
        <v-icon size="x-large">mdi-cart</v-icon>
      </v-badge>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="item in cartItems" :key="item.id">
        <v-list-item-content>
            <v-img
                height="100"
                aspect-ratio="16/9"
                :src="item.img"
              ></v-img>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle
            >Ilość: {{ item.quantity }}</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-row class="justify-center align-center my-2">
          <v-btn v-if="item.quantity === 1"  @click="removeOneItem(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn v-if="item.quantity>0 && item.quantity !== 1" @click="removeOneItem(item.id)"><v-icon>mdi-minus</v-icon></v-btn>
          <v-btn v-if="item.quantity>0" @click="addToCart(item.id)"><v-icon>mdi-plus</v-icon></v-btn>
        </v-row>
        </v-list-item-action>
      </v-list-item>
      <v-row class="justify-center align-center my-2">
      <v-list-item
        ><v-btn @click="clearCart" color="warning">Wyczyść Koszyk</v-btn>
      </v-list-item>
    </v-row>
    <v-row class="justify-center align-center my-2">
      <v-list-item link to="/cart">
        <v-btn color="teal"> Wyświetl koszyk </v-btn>
      </v-list-item>
    </v-row>
    </v-list>
  </v-menu>
  <ConfirmationDialog v-if="tooManyItems"
  :showConfirmation="tooManyItems" 
  title="Uwaga"
  text="To jest maksymalna ilość dostępnych egzemplarzy"
  @close="tooManyItems = false"
/>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia'; 
import { computed } from 'vue';

const cartStore = useCartStore();
const { tooManyItems, cartItems, showCart } = storeToRefs(cartStore);
const {  clearCart, removeOneItem, addToCart } = cartStore;
const totalItems = computed(() => cartItems.value.length);
</script>