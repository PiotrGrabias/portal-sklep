<template>
    <v-row>
        <v-col justify="center" align="center">
      <h1>Zamówienia użytkownika {{ username }}</h1>
      <table v-if="orders" border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Numer zamówienia</th>
            <th>Cena (zł)</th>
            <th>Produkty</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>Order #{{ order.attributes.secret }}</td>
            <td>{{ order.attributes.price }}</td>
            <td>
              <div v-if="Object.keys(order.attributes.products).length === 0">
                Brak produktów/błąd systemu
              </div>
              <div v-else>
                <span v-for="(amount, product) in order.attributes.products" :key="product">
                  {{ product }}: {{ amount }}<span v-if="!$last">, </span>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="text-h4" v-else>Brak zamówień</p>
        </v-col>
    </v-row>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'; 
  import axios from 'axios'; 
  
  const username = ref(localStorage.getItem("user-name"));
  const orders = ref([]);
  
  const loadOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user-orders', {
        params: {
          userName: username.value 
        }
      });
      orders.value = response.data.data; 
      console.log(orders.value)
    } catch (error) {
      console.error('Error loading orders:', error); 
    }
  };
  
  onMounted(() => {
    if (username.value) {
      loadOrders();
    }
  });
  </script>
  