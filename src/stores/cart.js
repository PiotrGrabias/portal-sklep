import { defineStore } from "pinia";
import { ref, onMounted, watch, computed } from "vue";
import { useProductStore } from './product';

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]);
  const currentItemId = ref(null);
  const productStore = useProductStore();
  const tooManyItems = ref(false)
  const showCart = ref(true)
  const product = ref({})

  const fullPrice = computed(() => {
    const total = cartItems.value.reduce((total, item) => {
      const price = parseFloat(item.price) || 0; 
      const quantity = parseInt(item.quantity) || 0;  
      return total + price * quantity;
    }, 0);
  
    return (Math.round(total * 100) / 100).toFixed(2);
  });
  const addToCart = async (itemId, prodName, price, img) => {
    if (productStore.products.length === 0) {
      console.warn("Products not loaded yet. Fetching products...");
      await productStore.getItems(); 
    }
  
    product.value = productStore?.products?.find(product => product.id === itemId);
  
    if (!product.value) {
      console.error(`Product with id ${itemId} not found.`);
      return;
    }
  
    const availableAmount = product.value.attributes.amount;
    const existingItem = cartItems?.value?.find((item) => item.id === itemId);
  
    if (!existingItem) {
      if (availableAmount > 0) {
        cartItems.value.push({
          id: itemId,
          amount: 1,
          quantity: 1,
          name: prodName,
          price: price,
          img: img,
        });
      } else {
        console.error("Cannot add to cart: Product is out of stock");
      }
    } else {
      if (existingItem.quantity < availableAmount) {
        existingItem.quantity++;
      } else {
        console.error("Cannot add more: Exceeds available quantity");
        tooManyItems.value = true;
      }
    }
    currentItemId.value = itemId;
  };
  

  const removeOneItem = (itemId) => {
    const item = cartItems.value.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else if (item && item.quantity === 1) {
      cartItems.value = cartItems.value.filter((item) => item.id !== itemId);
    }
  };

  const clearCart = () => {
    cartItems.value = [];
  };
  
  const loadCart = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      cartItems.value = JSON.parse(storedCart);
    }
  };

  watch(cartItems, (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  }, { deep: true });

  onMounted(() => {
    loadCart();
  });

  return {
    showCart,
    cartItems,
    tooManyItems,
    currentItemId,
    addToCart,
    clearCart,
    removeOneItem,
    fullPrice, 
  };
});
