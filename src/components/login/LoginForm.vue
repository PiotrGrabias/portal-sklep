<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="grey-darken-4" dark flat style="background-image: url('https://wallpaper.dog/large/20420792.jpg'); background-size: cover;">
            <v-toolbar-title>Logowanie</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Nazwa użytkownika lub adres e-mail"
                name="email"
                prepend-icon="mdi-account"
                type="email"
                required
                v-model="username"
              ></v-text-field>
              <v-text-field
                label="Hasło"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
                v-model="password"
              ></v-text-field>

              <v-container>
                <v-row>
                  <v-col cols="12" class="text-center">
                    <v-btn color="grey-darken-4" text @click="handleLogin">
                      Zaloguj się
                    </v-btn>
                    <hr class="custom-hr" > 
                    <span class="mx-2">Nie masz konta?</span>
                    <hr class="custom-hr">
                    <v-btn color="teal" href="/register">
                      Zarejestruj się
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
        <v-alert  v-if="errorMess"
    max-height = 150
    density="compact"
    :text="errorMess"
    title="Niezweryfikowany adres e-mail"
    type="error"
  ></v-alert>
      </v-col>
    </v-row>
  </v-container>
 
  
  
</template>

<script setup>
import AuthService from '../auth/auth-service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const username = ref('');
const password = ref('');
const errorMess = ref('');
const route = useRouter();


const handleLogin = async () => {
  try {
    const userData = {
      username: username.value,
      password: password.value,
    };
    console.log(userData);
    const response = await AuthService.login(userData);
    userStore.login(userData.username, response.token);
    route.push('/');
  } catch (error) {
    if (error.response && error.response.data.errors) {
      if (error.response.data.errors === 'Please confirm your email address.') {
        errorMess.value =
          'Potwierdź swój e-mail klikając w link przesłany na adres podany przy rejestracji';
      } else {
        errorMess.value = error.response.data.errors;
      }
    }
  }
};
</script>

<style scoped>
.custom-hr {
  width: 50%;         
  margin: 0 auto;     
  border-top: 1px solid rgba(255, 255, 255, 0.2); 
}
</style>
