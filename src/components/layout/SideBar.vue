<template>
    <v-navigation-drawer 
      image="https://wallpaper.dog/large/20420792.jpg"
      color="grey darken-3" 
      dark 
      width="210" 
      expand-on-hover 
      rail
      app 
    >
      <v-list dense flat>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">pc-parts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-divider></v-divider> 
  
        <v-list-item link to="ram">
          <v-list-item-title>Pamięć RAM</v-list-item-title>
        </v-list-item>
  
        <v-list-item link to="procesor">
          <v-list-item-title>Procesory</v-list-item-title>
        </v-list-item>
  
        <v-list-item link to="kartygraf">
          <v-list-item-title>Karty Graficzne</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  