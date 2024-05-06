<template>
  <v-menu open-on-click :close-on-content-click=false> 
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <v-icon size="x-large">mdi-cart</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="item in cartItems" :key="item.id">
        <v-list-item-content>
            <v-img
                aspect-ratio="16/9"
                :src="item.img"
              ></v-img>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle
            >Ilość: {{ item.quantity }} Cena: {{ item.price }} zł</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="removeFromCart(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn v-if="item.quantity>0" @click="removeOneItem(item.id)"><v-icon>mdi-minus</v-icon></v-btn>
          <v-btn v-if="item.quantity>0" @click="addToCart(item.id)"><v-icon>mdi-plus</v-icon></v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-list-item
        ><v-btn @click="clearCart" color="warning">Wyczyść Koszyk</v-btn>
      </v-list-item>
      <v-list-item link to="/cart">
        <v-btn color="teal"> Wyświetl koszyk </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);
const { removeFromCart, clearCart, removeOneItem, addToCart } = cartStore;
</script>