import { defineStore } from "pinia";
import { ref, onMounted, watch, computed } from "vue";
import { useProductStore } from './product';

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]);
  const currentItemId = ref(null);
  const productStore = useProductStore();

  const fullPrice = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  });

  const addToCart = (itemId, prodName, price, img) => {
    const existingItem = cartItems?.value?.find((item) => item.id === itemId);
    const product = productStore?.products?.find(product => product.id === itemId);
    if (!product) {
      console.error(`Product with id ${itemId} not found.`);
      return;
    }    
    const availableAmount = product.amount;

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
      }
    }
    currentItemId.value = itemId;
  };

  const removeOneItem = (itemId) => {
    const item = cartItems.value.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else {
      cartItems.value = cartItems.value.filter((item) => item.id !== itemId);
    }
  };

  const removeFromCart = (itemId) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== itemId);
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
    cartItems,
    currentItemId,
    addToCart,
    removeFromCart,
    clearCart,
    loadCart,
    removeOneItem,
    fullPrice, 
  };
});
