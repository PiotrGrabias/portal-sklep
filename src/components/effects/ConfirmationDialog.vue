<template>
    <v-dialog
      :modelValue="showConfirmation"
      @update:modelValue="showConfirmation = $event"
      :width="dialogWidth"
    >
      <v-card :max-width="maxCardWidth">
        <v-card-title>
          <v-icon>{{ prependIcon }}</v-icon>
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ text }}
        </v-card-text>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="$emit('close')"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  defineProps({
    showConfirmation: Boolean,
    isLoggedIn: Boolean,
    title: {
      type: String,
      default: "Potwierdzenie",
    },
    text: {
      type: String,
      default: "Zamówienie zostało pomyślnie zarejestrowane w systemie, niebawem otrzymasz potwierdzenie na podany adres email. Za kilka sekund zostaniesz przeniesiony na stronę główną.",
    },
    dialogWidth: {
      type: String,
      default: "auto",
    },
    maxCardWidth: {
      type: [String, Number],
      default: 400,
    },
    prependIcon: {
      type: String,
      default: "mdi-update",
    },
  });
  </script>
  