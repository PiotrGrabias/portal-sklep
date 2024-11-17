<template>
    <v-container 
      fluid 
      class="d-flex align-center justify-center"
      style="min-height: 50vh;"
    >
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-5 elevation-2">
            <v-card-title class="text-h4 text-center">
              O NAS
            </v-card-title>
            <v-card-subtitle class="text-center text-body-2 mb-4">
              Twoje zaufane źródło podzespołów komputerowych
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text class="text-center my-4">
              <p>
                Witamy w <strong>PC-Parts</strong>, miejscu stworzonym dla miłośników technologii! 
                Jesteśmy zespołem entuzjastów, który z pasją dostarcza najwyższej klasy podzespoły komputerowe 
                oraz kompleksową obsługę klienta. Niezależnie od tego, czy budujesz komputer od podstaw, czy 
                unowocześniasz swój sprzęt, znajdziesz u nas wszystko, czego potrzebujesz.
              </p>
              <p>
                <strong>Dlaczego my?</strong> 
                Bo cenimy jakość, niezawodność i uczciwe podejście do klientów. Współpracujemy 
                z renomowanymi producentami, oferując produkty takich marek jak Intel, AMD, NVIDIA, 
                Corsair, ASUS, MSI i wielu innych.
              </p>
            </v-card-text>
            <v-divider></v-divider>
            <v-row class="text-center my-4">
              <v-col cols="12" sm="4">
                <v-icon size="48px" color="primary">mdi-truck</v-icon>
                <h4 class="mt-2">Szybka Dostawa</h4>
                <p>Wysyłamy zamówienia już w 24 godziny!</p>
              </v-col>
              <v-col cols="12" sm="4">
                <v-icon size="48px" color="primary">mdi-wallet-outline</v-icon>
                <h4 class="mt-2">Konkurecyjne Ceny</h4>
                <p>Zapewniamy najlepszy stosunek jakości do ceny.</p>
              </v-col>
              <v-col cols="12" sm="4">
                <v-icon size="48px" color="primary">mdi-star-outline</v-icon>
                <h4 class="mt-2">Zaufanie Klientów</h4>
                <p>Tysiące zadowolonych klientów!</p>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-actions class="justify-center mt-4">
              <v-btn color="primary" elevation="2" large href="/shop">
                Sprawdź naszą ofertę
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  html, body, #app {
    height: 100%;
    margin: 0;
  }
  
  .v-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  