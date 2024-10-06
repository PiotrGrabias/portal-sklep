<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4 text-black" >
          <v-card-title class="text-h5">Dane do dostawy</v-card-title>
          <v-card-text>
            <v-form ref="deliveryForm" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="delivery.firstName"
                    :rules="[(v) => !!v || 'Imię jest wymagane']"
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
                  (v) =>
                    !!v ||
                    'Adres email jest wymagany - tam otrzymasz potwierdzenie zamówienia',
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
                :rules="[(v) => !!v || 'Numer karty jest wymagany']"
                label="Numer karty"
                required
              ></v-text-field>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="payment.expiryDate"
                    :rules="[(v) => !!v || 'Data ważności jest wymagana']"
                    label="Data ważności"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="payment.cvv"
                    :rules="[(v) => !!v || 'Kod CVV jest wymagany']"
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
        <!-- Użycie klasy 'monospace-text' do stylizacji tekstu komputerowego -->
        <v-typography class="text-h4 monospace-text">
          Suma do zapłaty
        </v-typography>
        <v-card-text class="text-h4 font-weight-black monospace-text">
          {{ totalPriceWithDelivery }} zł (z dostawą)
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
    <v-row justify="center" class="mt-4">
      <v-col cols="12" md="8" class="text-center" align-self="stretch">
        <v-btn color="teal" @click="submitForm">Potwierdź i zapłać</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

const valid = ref(false);
const cartStore = useCartStore();
const { fullPrice } = storeToRefs(cartStore);

const deliveryCost = ref(15);

const delivery = ref({
  firstName: "",
  lastName: "",
  address: "",
  zipCode: "",
  city: "",
  phone: "",
  email: "",
  deliveryType: "courier", 
});

const payment = ref({
  cardNumber: "",
  expiryDate: "",
  cvv: "",
});

const totalPriceWithDelivery = computed(() => {
  return fullPrice.value + deliveryCost.value;
});

const submitForm = () => {
  if (valid.value) {
    console.log("Formularz jest poprawny");
  } else {
    console.log("Formularz nie jest poprawny");
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
