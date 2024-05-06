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
  },
})