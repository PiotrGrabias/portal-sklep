import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const username = ref(localStorage.getItem('user-name') || '');
  const token = ref(localStorage.getItem('user-token') || '');
  const isLoggedIn = ref(!!token.value);
  const ifAdmin = ref(localStorage.getItem('is-admin') === 'true');  // Ensure this is a boolean

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
    ifAdmin.value = false;
    localStorage.removeItem('user-name');
    localStorage.removeItem('user-token');
    localStorage.removeItem('is-admin');
  }

  function loginAdmin(user, userToken, isSuperuser) {
    username.value = user;
    token.value = userToken;
    isLoggedIn.value = true;
    ifAdmin.value = isSuperuser;
    localStorage.setItem('user-name', user);
    localStorage.setItem('user-token', userToken);
    localStorage.setItem('is-admin', isSuperuser.toString());  
  }

  return { username, token, isLoggedIn, ifAdmin, login, logout, loginAdmin };
});
