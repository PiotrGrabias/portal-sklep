<template>
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12">
            <v-toolbar color="grey-darken-4" image="@/assets/tlo.jpg">
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
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, defineProps, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/user';
  import AuthService from '../auth/auth-service';
  import { storeToRefs } from 'pinia';
  
  const props = defineProps({
    redirectPath: {
      type: String,
      default: '/',
    },
  });
  
  const userStore = useUserStore();
  const { ifAdmin } = storeToRefs(userStore);
  const username = ref('');
  const password = ref('');
  const router = useRouter();
  
  onMounted(() => {
    if (ifAdmin.value==true) {
      router.push('/jF8r$kL1pWz3Q@h9N7xG2kD!vA6YtO*5bTzLm0s/admin'); 
    }
  });
  
  const handleLogin = async () => {
    try {
      const userData = {
        username: username.value,
        password: password.value,
      };
      const response = await AuthService.login(userData);
      userStore.loginAdmin(userData.username, response.token, response.is_superuser);
      router.push(props.redirectPath); 
    } catch (error) {
      console.error('Error during login:', error);
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
  