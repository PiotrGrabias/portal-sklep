<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-btn @click="toggleDrawer" icon>
            <v-icon>mdi-menu</v-icon>
          </v-btn>
          <v-toolbar-title>Panel Admina</v-toolbar-title>
        </v-col>
      </v-row>
  
      <v-navigation-drawer v-model="drawer" app>
        <v-list dense>
          <v-list-item @click="navigateTo('products')">
              <v-list-item-title>Manage Products</v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigateTo('orders')">
              <v-list-item-title>Manage Orders</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-main>
        <v-container>
          <v-btn color="primary" @click="openCreateProductDialog">Dodaj produkt</v-btn>
  
          <v-row v-for="(item, index) in products" :key="index">
  <v-col cols="12">
    <v-card>
      <v-card-title>{{ item.attributes.product_name }}</v-card-title>
      <v-card-subtitle>{{ item.attributes.price }} PLN</v-card-subtitle>
      <v-card-text>
        <p><strong>Producent:</strong> {{ item.attributes.producer }}</p>
        <p><strong>Kategoria:</strong> {{ item.attributes.category }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" @click="deleteProduct(item.id)">Usuń</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</v-row>

  
          <v-dialog v-model="createProductDialog" max-width="600px">
            <v-card>
              <v-card-title>Dodaj nowy produkt</v-card-title>
              <v-card-text>
                <v-form ref="productForm" v-model="validProduct">
                  <v-text-field v-model="newProduct.name" label="Product Name" required />
                  <v-text-field v-model="newProduct.price" label="Price" type="number" required />
                  <v-text-field v-model="newProduct.producer" label="Producer" required />
                  <v-text-field v-model="newProduct.category" label="Category" required />
                  <v-textarea v-model="newProduct.description" label="Product Description" />
                  <v-text-field v-model="newProduct.image_path" label="Path" required />
                  <v-text-field v-model="newProduct.amount" label="amount" type="number" required />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="createProduct" :disabled="!validProduct" color="primary">Dodaj</v-btn>
                <v-btn @click="createProductDialog = false" color="secondary">Anuluj</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
  
          <v-divider></v-divider>
  
          <v-data-table
            :headers="orderHeaders"
            :items="orders"
            item-key="id"
            loading="loadingOrders"
            :items-per-page="5"
          >
            <template v-slot:top>
              <v-row>
                <v-col cols="12" sm="4">
                  <!-- <v-text-field v-model="orderFilter" label="Filter by User" @input="fetchOrders" /> -->
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-container>
      </v-main>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useProductStore } from '@/stores/product';
  
  const drawer = ref(false);
  const createProductDialog = ref(false)
  const productStore = useProductStore();
  const loadingOrders = ref(false);
  const products = computed(() => productStore.products);
  const orders = ref([]);
  const productHeaders = ref([
  { text: 'Product Name', align: 'start', key: 'product_name' },
  { text: 'Price', key: 'price' },
  { text: 'Producer', key: 'producer' },
  { text: 'Category', key: 'category' },
  { text: 'Description', key: 'description' },
  { text: 'Actions', key: 'actions' }
]);

  const orderHeaders = ref([
    { text: 'Order ID', key: 'id' },
    { text: 'Customer Email', key: 'email' },
    { text: 'Total Price', key: 'price' },
    { text: 'Status', key: 'status' }
  ]);
  const validProduct = ref(false);
  const newProduct = ref({
    name: '',
    price: '',
    producer: '',
    description: ''
  });
  const orderFilter = ref('');
  
  const router = useRouter();
  
  const toggleDrawer = () => {
    drawer.value = !drawer.value;
  };
  
  const navigateTo = (page) => {
    router.push({ name: page });
  };

  
  const createProduct = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/create/', newProduct.value, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    products.value.push(response.data); 
    createProductDialog.value = false;
  } catch (error) {
    console.error('Error creating product:', error);
  }
};
  
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/product/${productId}/`, {
      });
      products.value = products.value.filter(product => product.id !== productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const openCreateProductDialog = () => {
    createProductDialog.value = true;
  }
//   const fetchOrders = async () => {
//     loadingOrders.value = true;
//     try {
//       const response = await axios.get('http://localhost:8000/api/orders/', {
//         params: { email: orderFilter.value },
//       });
//       orders.value = response.data;
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     } finally {
//       loadingOrders.value = false;
//     }
//   };
  
  onMounted(() => {
    productStore.getItems();
    console.log(products.value)
  });
  </script>
  
  <style scoped>
  .v-btn {
    margin-bottom: 10px;
  }
  </style>
  