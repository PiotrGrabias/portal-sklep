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
    cart: []
  }),
  actions: {
    async getItems() {
      try {
        this.products = await api.get('/products/');
        console.log(this.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async getItem(itemId) {
      try {
        this.products = await api.get(`/products/${itemId}`);
        console.log(this.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async getItemsByCategory(searchQuery) {
      try {
        this.products = await api.get(`products/?search=${searchQuery}`);
        console.log(this.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async getItemsByProducer(producer) {
      try {
        this.products = await api.get(`/products/?producer=${producer}`);
        console.log(this.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
})