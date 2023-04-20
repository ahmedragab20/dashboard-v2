<template>
  <v-main :class="$vuetify.theme.dark ? '' : 'grey lighten-5'">
    <router-view v-slot="{ Component }">
      <transition name="rout" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </v-main>
</template>
