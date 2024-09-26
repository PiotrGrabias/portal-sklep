import { defineStore } from "pinia";
import { ref, onMounted, watch } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]);
  const currentItemId = ref(null);
  const addToCart = (itemId, prodName, price, img) => {
    const existingItem = cartItems.value.find((item) => item.id === itemId);

    if (!existingItem) {
      cartItems.value.push({
        id: itemId,
        amount: 1,
        quantity: 1,
        name: prodName,
        price: price,
        img: img,
      });
    } else {
      existingItem.quantity++;
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
  };
});
