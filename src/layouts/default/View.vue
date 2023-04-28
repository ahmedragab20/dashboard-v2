<template>
    <v-main style="position: relative" :class="$vuetify.theme.dark ? '' : 'grey lighten-5'">
        <router-view v-slot="{ Component }">
            <transition name="rout" mode="out-in">
                <component :is="Component"></component>
            </transition>
        </router-view>

        <div class="chat-bot">
            <v-btn fab color="primary" elevation="10">
                <v-icon>
                    mdi-robot
                </v-icon>
            </v-btn>
        </div>
    </v-main>
</template>

<style lang="scss">
.chat-bot {
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 1rem;
}
</style>
