<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4 text-black">
          <v-card-title class="text-h5">Dane do dostawy</v-card-title>
          <v-card-text>
            <v-form ref="deliveryForm" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="delivery.firstName"
                    :rules="[(v) => !!v || 'Imie jest wymagane']"
                    label="Imię"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="delivery.lastName"
                    :rules="[(v) => !!v || 'Nazwisko jest wymagane']"
                    label="Nazwisko"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                v-model="delivery.address"
                :rules="[(v) => !!v || 'Adres jest wymagany']"
                label="Adres"
                required
              ></v-text-field>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="delivery.zipCode"
                    :rules="[(v) => !!v || 'Kod pocztowy jest wymagany']"
                    label="Kod pocztowy"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="delivery.city"
                    :rules="[(v) => !!v || 'Miasto jest wymagane']"
                    label="Miasto"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                v-model="delivery.phone"
                :rules="[(v) => !!v || 'Telefon jest wymagany']"
                label="Telefon"
                required
              ></v-text-field>
              <v-text-field
                v-model="delivery.email"
                :rules="[
                  (v) => /.+@.+\..+/.test(v) || 'Podaj prawidłowy email',
                  (v) => !!v || 'Email jest wymagany',
                ]"
                label="E-mail"
                required
              ></v-text-field>
              <v-radio-group
                v-model="delivery.deliveryType"
                label="Wybierz sposób dostawy"
                :rules="[(v) => !!v || 'Wybór sposobu dostawy jest wymagany']"
                required
              >
                <v-radio
                  label="Kurier - niestety to nasza jedyna opcja w tej chwili (12,99 zł)"
                  value="courier"
                ></v-radio>
              </v-radio-group>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4">
      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-card-title class="text-h5">Dane do płatności</v-card-title>
          <v-card-text>
            <v-form ref="paymentForm" v-model="valid" lazy-validation>
              <v-text-field
                v-model="payment.cardNumber"
                :rules="[
                  (v) => !!v || 'Numer karty jest wymagany',
                  (v) => /^\d{16}$/.test(v) || 'Numer karty musi mieć 16 cyfr',
                ]"
                label="Numer karty"
                required
              ></v-text-field>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="payment.expiryDate"
                    :rules="[
                      (v) => !!v || 'Data ważności jest wymagana',
                      (v) =>
                        /^\d{2}\/\d{2}$/.test(v) ||
                        'Data ważności musi być w formacie MM/YY',
                      (v) =>
                        validateExpiryDate(v) ||
                        'Data ważności nie może być przeterminowana',
                    ]"
                    label="Data ważności (MM/YY)"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="payment.cvv"
                    :rules="[
                      (v) => !!v || 'Kod CVV jest wymagany',
                      (v) =>
                        /^\d{3,4}$/.test(v) ||
                        'CVV musi składać się z 3 lub 4 cyfr',
                    ]"
                    label="CVV"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-4">
      <v-col cols="12" md="8" class="text-center">
        <v-card class="pa-4">
          <v-typography class="text-h4 monospace-text">
            Łącznie do zapłaty
          </v-typography>
          <v-card-text class="text-h4 font-weight-black monospace-text">
            {{ totalPriceWithDelivery }} zł (razem z dostawą)
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="valid" justify="center" class="mt-4">
      <v-col cols="12" md="8" class="text-center" align-self="stretch">
        <v-btn color="teal" @click="submitForm">Potwierdź i zapłać</v-btn>
      </v-col>
    </v-row>
    <v-row v-else justify="center" class="mt-4">
      <v-col cols="12" md="8" class="text-center" align-self="stretch">
        <v-tooltip text="Wypełnij poprawnie wszystkie pola">
          <template v-slot:activator="{ props }">
        <v-btn v-bind="props" variant = "outlined" color="red" @click="submitForm">Potwierdź i zapłać</v-btn>
      </template>
    </v-tooltip>
      </v-col>
    </v-row>
    <LoadSpinner :model-value="loading" />
    <ConfirmationDialog v-if="!isLoggedIn"
  :showConfirmation="showConfirmation" 
  :isLoggedIn="isLoggedIn" 
  @close="showConfirmation = false"
/>
<ConfirmationDialog v-else
  :showConfirmation="showConfirmation" 
  :isLoggedIn="isLoggedIn" 
  text="Zamówienie zostało pomyślnie zarejestrowane w systemie, niebawem otrzymasz potwierdzenie na podany adres email, będzie ono również widoczne na twoim koncie w sekcji zamówienia. Za kilka sekund zostaniesz przeniesiony na stronę główną."
  @close="showConfirmation = false"
/>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import router from "@/router";

const valid = ref(false);
const cartStore = useCartStore();
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore)
const { fullPrice, cartItems } = storeToRefs(cartStore);
const loading = ref(false);
const showConfirmation = ref(false);

const deliveryCost = ref(12.99);

const validateExpiryDate = (expiry) => {
  const [month, year] = expiry.split("/").map(Number);
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear() % 100;
  if (year < currentYear) {
    return false;
  }
  if (year === currentYear && month < currentMonth) {
    return false;
  }

  return true;
};

const totalPriceWithDelivery = computed(() => {
  return fullPrice.value + deliveryCost.value;
});

const delivery = ref({
  firstName: "",
  lastName: "",
  address: "",
  zipCode: "",
  city: "",
  phone: "",
  email: "",
  deliveryType: "courier",
  price: totalPriceWithDelivery.value,
  items: cartItems.value.map(item => ({
    id: item.id,
    prodName: item.name,
    amount: item.quantity,
    image: item.img,
  })),
});

const payment = ref({
  cardNumber: "",
  expiryDate: "",
  cvv: "",
});

const redirectToHome = () => {
  setTimeout(() => {
    router.push({ path: '/' })
}, 8000);
}


const submitForm = async () => {
  if (valid.value) {
    loading.value = true;
    console.log(delivery.value)
    try {
      const response = await fetch("http://localhost:8000/api/submit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(delivery.value),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas wysyłania zamówienia.");
      }
      for (const item of cartItems.value) {
        await fetch(`http://localhost:8000/api/products/${item.id}/decrement/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: item.quantity }), 
        }
      );
      }
      const result = await response.json();
      loading.value = false;
      showConfirmation.value = true;
       redirectToHome(); 
      console.log("Zamówienie wysłane pomyślnie:", result);
    } catch (error) {
      console.error("Wystąpił błąd:", error.message);
    }
  } else {
    
    console.log("Formularz nie jest poprawny.");
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
