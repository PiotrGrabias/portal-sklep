import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const username = ref(localStorage.getItem('user-name') || '');
  const token = ref(localStorage.getItem('user-token') || '');
  const isLoggedIn = ref(!!token.value);

  function login(user, userToken) {
    username.value = user;
    token.value = userToken;
    isLoggedIn.value = true;
    localStorage.setItem('user-name', user);
    localStorage.setItem('user-token', userToken);
  }

  function logout() {
    username.value = '';
    token.value = '';
    isLoggedIn.value = false;
    localStorage.removeItem('user-name');
    localStorage.removeItem('user-token');
  }

  return { username, token, isLoggedIn, login, logout };
});