import { mande } from 'mande'
import { defineStore } from 'pinia'


const api = mande('http://localhost:8000/api', {
  headers: {
    'Accept': '*/*'
  }
})

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
  }),
  actions: {
    async getItems() {
      try {
        const response = await api.get('/products/');
        this.products = response.data;
        console.log(this.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async getItem(itemId) {
      try {
        const response = await api.get(`/products/${itemId}`); 
        this.products = response.data
        console.log(this.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async getItemsByCategory(searchQuery) {
      try {
        const response = await api.get(`products/?category=${searchQuery}`);
        this.products = response.data
        console.log(this.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async getItemsByProducer(producer) {
      try {
        const response = await api.get(`/products/?producer=${producer}`);
        this.products = response.data
        console.log(this.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async FilterSearch(producer, category, minprice, maxprice) {
      try {
        const response = await api.get(`/products/?producer=${producer}&category=${category}&price_min=${minprice}&price_max=${maxprice}`);
        this.products = response.data
        console.log(this.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
})