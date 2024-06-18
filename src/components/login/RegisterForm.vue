<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="6" sm="6" md="4">
          <v-card class="elevation-12" color="white">
            <v-toolbar
              color="grey-darken-4"
              light
              flat
              image="@/assets/tlo.jpg"
            >
              <v-toolbar-title>Rejestracja</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Nazwa Użytkownika"
                  prepend-icon="mdi-account"
                  outlined
                  dense
                  required
                  v-model="username"
                  :rules="[(v) => !!v || 'Nazwa użytkownika jest wymagana']"
                  :counter="15"
                  hint="Maksymalnie 15 znaków"
                  persistent-hint
                ></v-text-field>
                <v-text-field
                  label="Email"
                  prepend-icon="mdi-email"
                  type="email"
                  outlined
                  dense
                  required
                  v-model="email"
                  :rules="[
                    (v) => /.+@.+\..+/.test(v) || 'Podaj prawidłowy email',
                  ]"
                  hint="Wprowadź prawidłowy adres e-mail"
                  persistent-hint
                ></v-text-field>
                <v-text-field
                  label="Hasło"
                  prepend-icon="mdi-lock"
                  type="password"
                  outlined
                  dense
                  required
                  v-model="password"
                  :rules="passwordRules"
                  hint="Minimum 8 znaków, jedna wielka litera oraz jeden znak specjalny"
                  persistent-hint
                ></v-text-field>
                <v-text-field
                  label="Powtórz hasło"
                  prepend-icon="mdi-lock-question"
                  type="password"
                  outlined
                  dense
                  required
                  v-model="password2"
                  :rules="[
                    (v) => v === password || 'Hasła muszą być identyczne',
                  ]"
                  hint="Powtórz swoje hasło"
                  persistent-hint
                ></v-text-field>
                <v-container>
                  <v-row justify="center" align="center">
                    <v-col cols="12" class="text-center" align-self="stretch">
                      <v-btn color="grey-darken-4" @click="handleRegister">
                        Zarejestruj
                      </v-btn>
                      <hr class="custom-hr" />
                      <span class="mx-2">Masz już konto?</span>
                      <hr class="custom-hr" />
                      <v-btn color="teal" href="/login">Zaloguj się</v-btn>
                      <div v-if="errorMessages.length">
                        <ul>
                          <li
                            style="color: red"
                            v-for="message in errorMessages"
                            :key="message"
                          >
                            {{ message }}
                          </li>
                        </ul>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-alert 
    max-height = 150
    density="compact"
    text="Na adres e-mail podany przy rejestracji otrzymasz link aktywacyjny do konta, bez niego nie będziesz w stanie się zalogować"
    title="Weryfikacja e-mail"
    type="warning"
  ></v-alert>
    <LoadSpinner :model-value="loading"/>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import AuthService from "../auth/auth-service";
import { useRouter } from "vue-router";
import { watch } from "vue";

const loading = ref(false);
const router = useRouter();
const username = ref("");
const password = ref("");
const password2 = ref("");
const email = ref("");
const errorMessages = ref([]);
const showAlert = ref(false);
const confirmed_email = localStorage.getItem('email-confirmed')


watch(email, () => {
  const emailErrorIndex = errorMessages.value.findIndex(message => message.includes('Email jest już w użyciu'));
  if (emailErrorIndex !== -1) {
    errorMessages.value.splice(emailErrorIndex, 1);
  }
});
watch(username, () => {
  const emailErrorIndex = errorMessages.value.findIndex(message => message.includes('Nazwa użytkownika jest zajęta'));
  if (emailErrorIndex !== -1) {
    errorMessages.value.splice(emailErrorIndex, 1);
  }
});

const passwordRules = [
  (v) => v.length >= 8 || "Hasło musi mieć przynajmniej 8 znaków",
  (v) =>
    /[A-Z]/.test(v) || "Hasło musi zawierać co najmniej jedną wielką literę",
  (v) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
    "Hasło musi zawierać co najmniej jeden znak specjalny",
];

const handleRegister = async () => {
  errorMessages.value = [];  
  if (passwordRules.every((rule) => typeof rule(password.value) === 'boolean' || rule(password.value) === true)) {
    if (password.value !== password2.value) {
      console.error("Validation failed:", errorMessages.value);
      return;
    }
    loading.value = true;
    try {
      const userData = {
        email: email.value,
        password: password.value,
        username: username.value,
      };
      const response = await AuthService.register(userData);
      console.log(response);
      console.log(confirmed_email)
      if(confirmed_email === false){
         showAlert.value = true;
      }
      router.push("/login");
    } catch (error) {
      if (error.response && error.response.data.errors.error) {
        errorMessages.value.push(error.response.data.errors.error || "Failed to connect.");
      } else if(error.response && !error.response.data.errors.error){
        errorMessages.value.push("An unexpected error occurred.");
      }
      console.error("Registration error:", [...errorMessages.value]);
      console.log(error);
    } finally {
      loading.value = false;
    }
  } else {
    passwordRules.forEach(rule => {
      const result = rule(password.value);
      if (typeof result === 'string') {
        errorMessages.value.push(result);
      }
    });
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
