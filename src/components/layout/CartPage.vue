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
            Cena: {{ (item.price) }} zł
          </v-card-subtitle>
          <v-card-subtitle class="text-center">
            Ilość: {{ item.quantity }}
          </v-card-subtitle>
          <v-row class="justify-center align-center my-2">
            <v-btn v-if="item.quantity>1"
              icon
              @click="removeOneItem(item.id)"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-btn v-else
              icon
              @click="removeOneItem(item.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="addToCart(item.id)"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
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
          <v-btn v-if="fullPrice != 0" link to="/summary" color="blue">Kontynuuj</v-btn
          >
          <v-btn v-else @click="showCart = true" link to="/" color="red">Brak przedmiotów w koszyku, wróć na stronę główną</v-btn>
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

const cartStore = useCartStore();
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { tooManyItems, cartItems, showCart, fullPrice } = storeToRefs(cartStore);
showCart.value = false

const { removeOneItem, addToCart } = cartStore;
</script>