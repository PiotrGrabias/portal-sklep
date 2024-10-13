<template>
  <v-row>
    <v-col justify="center" align="center">
      <h1>Zamówienia użytkownika {{ username }}</h1>

      <v-list v-if="orders" class="order-list">
        <v-list-item-group>
          <v-list-item v-for="order in orders" :key="order.id">
            <v-card class="mb-4" outlined>
              <v-list-item-content>
                <v-list-item-title
                  >Zamówienie nr #{{ order.attributes.secret }}</v-list-item-title
                >
                <v-list-item-subtitle
                  >Cena: {{ order.attributes.price }} zł</v-list-item-subtitle
                >
                <div
                  v-if="Object.keys(order.attributes.products).length > 0"
                  class="product-list"
                >
                  <v-row>
                    <v-col
                      lg="4"
                      sm="4"
                      md="4"
                      v-for="(productInfo, productName) in order.attributes.products"
                      :key="productName"
                    >
                      <v-list-item-avatar>
                        <v-img
                          :height="300"
                          :src="order.attributes.image[productName]"
                          alt="Product Image"
                        ></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          >{{ productInfo.prodName }} - 
                          {{ productInfo.amount }} szt.</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-col>
                  </v-row>
                </div>
                <div v-else>Brak produktów/błąd systemu</div>
              </v-list-item-content>
            </v-card>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <p class="text-h4" v-else>Brak zamówień</p>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const username = ref(localStorage.getItem("user-name"));
const orders = ref([]);

const loadOrders = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/user-orders", {
      params: {
        userName: username.value,
      },
    });
    orders.value = response.data.data;
    console.log(orders.value);
  } catch (error) {
    console.error("Error loading orders:", error);
  }
};

onMounted(() => {
  if (username.value) {
    loadOrders();
  }
});
</script>
