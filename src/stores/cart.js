import { defineStore } from "pinia";
import { ref, onMounted } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]);
  const currentItemId = ref(null);
  const addToCart = (itemId, prodName, price, img) => {
    if (!cartItems.value.some((item) => item.id === itemId)) {
      cartItems.value.push({
        id: itemId,
        quantity: 1,
        name: prodName,
        price: price,
        img: img,
      });
    } else {
      cartItems.value = cartItems.value.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    localStorage.setItem("cart", JSON.stringify(cartItems.value));
    currentItemId.value = itemId;
  };


  const removeOneItem = (itemId) => {
    cartItems.value = cartItems.value
        .map((item) =>
            item.id === itemId
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )
        .filter(item => item.quantity > 0);
    if(cartItems.value.quantity === 1){
        cartItems.value = cartItems.value.filter((item) => item.id !== itemId);
        localStorage.setItem("cart", JSON.stringify(cartItems.value));
}}
  const clearCart = () => {
    cartItems.value = [];
    localStorage.removeItem("cart");
  };

  const loadCart = () => {
    if (localStorage.getItem("cart")) {
      cartItems.value = JSON.parse(localStorage.getItem("cart"));
    }
  };

  onMounted(() => {
    loadCart();
  });

  return {
    cartItems,
    currentItemId,
    addToCart,
    clearCart,
    loadCart,
    removeOneItem,
  };
});
