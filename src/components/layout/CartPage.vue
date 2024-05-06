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
            Suma: {{ (item.price * item.quantity).toFixed(2) }} zł
          </v-card-subtitle>
          <v-card-subtitle class="text-center">
            Ilość: {{ item.quantity }}
          </v-card-subtitle>
          <v-row class="justify-center align-center my-2">
            <v-btn
              icon
              @click.stop="removeOneItem(item.id)"
              aria-label="Remove one item"
              v-if="item.quantity > 1"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-btn
              icon
              @click.stop="removeFromCart(item.id)"
              aria-label="Remove item from cart"
              v-if="item.quantity === 1"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn
              icon
              @click.stop="addToCart(item.id)"
              aria-label="Add one more item"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);
const { removeFromCart, removeOneItem, addToCart } = cartStore;
</script>