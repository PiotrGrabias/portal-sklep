<template>
  <v-app-bar color="grey-darken-2" :image=tlo>
    <template v-slot:image>
      <v-img></v-img>
    </template>
    <v-toolbar-title
      ><a href="/" class="no-underline"
        >PC Parts and service <v-icon size="x-large">mdi-home-circle</v-icon></a
      >
      
      ></v-toolbar-title
    >
    <v-spacer></v-spacer>
    <p v-if="userStore.isLoggedIn">Witaj {{ userStore.username }}</p>
    <v-btn href="/support"
      ><v-icon size="x-large">mdi-comment-question</v-icon>
    </v-btn>
    <ProductCart />
    <v-menu open-on-click>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">
          <v-icon size="x-large">mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list v-if="!userStore.isLoggedIn">
        <v-list-item link to="/login">
          <v-list-item-title
            >Zaloguj się<v-icon size="x-large"
              >mdi-login</v-icon
            ></v-list-item-title
          >
        </v-list-item>
        <v-list-item style="color: darkcyan">Nie masz konta?</v-list-item>
        <v-list-item link to="/register">
          <v-list-item-title
            >Załóż konto <v-icon>mdi-pencil</v-icon></v-list-item-title
          >
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item link to="/orders">
          <v-list-item-title
            >Twoje Zamówienia<v-icon size="x-large"
              >mdi-invoice-list</v-icon
            ></v-list-item-title
          >
        </v-list-item>
        <v-list-item @click="handleLogout">
          <v-list-item-title
            >Wyloguj się
            <v-icon size="x-large">mdi-logout</v-icon></v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
  <v-dialog v-model="showSessionExpiredDialog" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5">Sesja wygasła</v-card-title>
      <v-card-text
        >Twoja sesja wygasła, możesz się ponownie zalogować lub kontynuować bez
        logowania</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="redirectToLogin"
          >Zaloguj</v-btn
        >
        <v-btn color="blue darken-1" text @click="handleClose">Kontynuuj</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref,  } from "vue";
import { useUserStore } from "../../stores/user";
import { useRouter } from "vue-router";
import tlo from '@/assets/tlo.jpg';

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
if (userStore.isLoggedin) {
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
