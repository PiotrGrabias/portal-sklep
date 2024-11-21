<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="text-h3">
              Aktywacja konta
            </v-card-title>
            <v-card-text v-if="message">
              <p>{{ message }}</p>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      const route = useRoute();
      const message = ref('');
  
      const activateAccount = async () => {
        const uid = route.params.id;
        const token = route.params.token;
        try {
          const response = await fetch(`https://pjerdson321.pythonanywhere.com/api/activate/${uid}/${token}`);
          if (response.ok) {
            message.value = 'Twoje konto zostało aktywowane, za chwilę zostaniesz przeniesiony na stronę logowania';
              setTimeout(() => {
                  router.push('/login');
              }, 4000); 
          } else {
            message.value = 'Nie udało się aktywować konta';
          }
        } catch (error) {
          message.value = 'Wystąpił błąd';
        }
      };
  
      onMounted(activateAccount);
  
      return { message, activateAccount };
    }
  };
  </script>