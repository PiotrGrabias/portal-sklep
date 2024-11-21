<template>
    <v-container class="py-5">
      <!-- Nagłówek Strony -->
      <v-row class="mb-5">
        <v-col cols="12" md="8" class="mx-auto text-center">
          <h1 class="text-h4 font-weight-bold">Centrum Wsparcia</h1>
          <p class="text-body-1">
            Potrzebujesz pomocy? Jesteśmy tutaj, aby odpowiedzieć na Twoje pytania. Skorzystaj z formularza kontaktowego poniżej lub przejrzyj nasze FAQ.
          </p>
        </v-col>
      </v-row>
  
      <!-- Sekcja Kontakt -->
      <v-row class="mb-5">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <h2 class="text-h5 font-weight-medium">Skontaktuj się z nami</h2>
            </v-card-title>
  
            <v-card-text>
              <v-form ref="formRef" v-model="valid">
                <!-- Pole Imię -->
                <v-text-field
                  v-model="form.name"
                  :rules="[rules.required]"
                  label="Twoje imię"
                  required
                ></v-text-field>
  
                <!-- Pole E-mail -->
                <v-text-field
                  v-model="form.email"
                  :rules="[rules.required, rules.email]"
                  label="Twój e-mail"
                  required
                ></v-text-field>
  
                <!-- Pole Temat -->
                <v-text-field
                  v-model="form.subject"
                  :rules="[rules.required]"
                  label="Temat"
                  required
                ></v-text-field>
  
                <!-- Pole Wiadomość -->
                <v-textarea
                  v-model="form.message"
                  :rules="[rules.required]"
                  label="Twoja wiadomość"
                  rows="5"
                  required
                ></v-textarea>
  
                <!-- Przycisk Wyślij -->
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  class="mt-3"
                  @click="submitForm"
                >
                  Wyślij wiadomość
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
  
        <!-- Dane Kontaktowe -->
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <v-card-title>
              <h2 class="text-h5 font-weight-medium">Dane kontaktowe</h2>
            </v-card-title>
            <v-card-text>
              <p class="text-body-1 mb-3">
                Masz pytania? Skontaktuj się z nami bezpośrednio:
              </p>
              <v-list dense>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="primary">mdi-phone</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Telefon</v-list-item-title>
                    <v-list-item-subtitle>+48 123 456 789</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
  
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="primary">mdi-email</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>E-mail</v-list-item-title>
                    <v-list-item-subtitle>wsparcie@firma.com</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
  
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="primary">mdi-map-marker</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Adres</v-list-item-title>
                    <v-list-item-subtitle>ul. Główna 123, 00-001 Warszawa</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Sekcja FAQ -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <h2 class="text-h5 font-weight-medium">Często zadawane pytania</h2>
            </v-card-title>
            <v-card-text>
              <v-expansion-panels multiple>
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    Po jakim czasie mogę spodziewać się informacji zwrotnej?
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    Czas oczekiwania na odpowiedź to od około 1 dnia - ale staramy się możliwie jak najszybciej.
                  </v-expansion-panel-text>
                </v-expansion-panel>
  
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    Jak mogę śledzić swoje zamówienie?
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    Musisz być zarejestrowany i potem zaloguj się na swoje konto, przejdź do sekcji "Moje zamówienia" i wybierz zamówienie, które chcesz śledzić.
                  </v-expansion-panel-text>
                </v-expansion-panel>
  
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    Jak mogę skontaktować się z pomocą techniczną?
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    Możesz skorzystać z formularza powyżej, zadzwonić pod numer +48 123 456 789 lub napisać na adres wsparcie@firma.com.
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Powiadomienie Snackbar -->
      <v-snackbar v-model="snackbar.visible" :timeout="snackbar.timeout">
        {{ snackbar.message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar.visible = false">
            Zamknij
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </template>
  
  <script setup>
  import { ref, reactive } from "vue";
  import axios from "axios";
  
  const valid = ref(false);
  const formRef = ref(null);
  
  const form = reactive({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const rules = {
    required: (value) => !!value || "To pole jest wymagane",
    email: (value) => /.+@.+\..+/.test(value) || "Wprowadź poprawny adres e-mail",
  };
  
  // Powiadomienie Snackbar
  const snackbar = reactive({
    visible: false,
    message: "",
    timeout: 3000,
  });
  
  const submitForm = async () => {
    if (formRef.value.validate()) {
        try {
            await axios.post('https://pjerdson321.pythonanywhere.com/api/api/contact/', form);
            snackbar.message = "Twoja wiadomość została wysłana pomyślnie!";
            form.name = "";
            form.email = "";
            form.subject = "";
            form.message = "";
        } catch (error) {
            snackbar.message = "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.";
        }
        snackbar.visible = true;
    } else {
        snackbar.message = "Proszę wypełnić wszystkie wymagane pola poprawnie.";
        snackbar.visible = true;
    }
};

  </script>
  
  <style scoped>
  .v-container {
    max-width: 800px;
    margin: auto;
  }
  </style>
  