<template>
  <header class="custom-app-bar grey darken-2 d-flex align-center">
    <div class="app-bar-content d-flex align-center justify-space-between flex-grow-1">
      <div class="app-bar-title d-flex align-center">
        <a href="/" class="no-underline white--text text-h5">
          PC Parts and Service
          <v-icon size="x-large" class="ml-2">mdi-home-circle</v-icon>
        </a>
        <v-btn to="/jF8r$kL1pWz3Q@h9N7xG2kD!vA6YtO*5bTzLm0s" class="ml-4" text>
          <v-icon size="x-large">mdi-security</v-icon>Admin
        </v-btn>
      </div>
      <div class="app-bar-user d-flex align-center">
        <p v-if="userStore.isLoggedIn" class="white--text">Witaj {{ userStore.username }}</p>
        <v-btn href="/support" text class="white--text">
          <v-icon size="x-large">mdi-comment-question</v-icon>
        </v-btn>
        <ProductCart />
        <v-menu open-on-click>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text class="white--text">
              <v-icon size="x-large">mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list v-if="!userStore.isLoggedIn">
            <v-list-item link to="/login">
              <v-list-item-title>Zaloguj się</v-list-item-title>
              <v-icon size="x-large" class="ml-2">mdi-login</v-icon>
            </v-list-item>
            <v-list-item>
              <v-list-item-title style="color: darkcyan">Nie masz konta?</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/register">
              <v-list-item-title>Załóż konto</v-list-item-title>
              <v-icon class="ml-2">mdi-pencil</v-icon>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item link to="/orders">
              <v-list-item-title>Twoje Zamówienia</v-list-item-title>
              <v-icon size="x-large" class="ml-2">mdi-invoice-list</v-icon>
            </v-list-item>
            <v-list-item @click="handleLogout">
              <v-list-item-title>Wyloguj się</v-list-item-title>
              <v-icon size="x-large" class="ml-2">mdi-logout</v-icon>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </header>
  <v-dialog v-model="showSessionExpiredDialog" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5">Sesja wygasła</v-card-title>
      <v-card-text>
        Twoja sesja wygasła, możesz się ponownie zalogować lub kontynuować bez logowania
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="redirectToLogin">Zaloguj</v-btn>
        <v-btn color="blue darken-1" text @click="handleClose">Kontynuuj</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const route = useRouter();
const showSessionExpiredDialog = ref(false);
const username = ref(localStorage.getItem("user-name"));

const setupTokenTimer = (expiryInSeconds) => {
  setTimeout(() => {
    userStore.logout();
    showSessionExpiredDialog.value = true;
  }, expiryInSeconds * 1000);
};
if (userStore.isLoggedIn) {
  setupTokenTimer(3600);
}
const redirectToLogin = () => {
  showSessionExpiredDialog.value = false;
  handleLogout();
};
const handleLogout = () => {
  userStore.logout();
  username.value = null;
  route.go();
};
const handleClose = () => {
  showSessionExpiredDialog.value = false;
  route.go();
};
</script>

<style>
.custom-app-bar {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 64px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1006;
  background-color: var(--v-grey-darken-2);
  color: white;
  background-image: url('@/assets/tlo.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

</style>
