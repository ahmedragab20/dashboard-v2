<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar app elevate-on-scroll color="transparent">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <Header />
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" app right>
      <SideBar main-color="primary" />
    </v-navigation-drawer>

    <!-- Main Content -->
    <default-view />

    <!-- Footer -->
    <v-footer elevation="0" class="d-flex justify-end" border>
      <v-card flat tile color="transparent">
        <v-card-text class="text-end">
          <v-btn
            fab
            icon
            small
            outlined
            class="transparent"
            @click="toggleTheme"
          >
            <v-icon>mdi-lightbulb</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import DefaultView from "@/layouts/default/View.vue";
import Header from "@/components/App/Header.vue";
import SideBar from "@/components/App/SideBar.vue";

export default {
  components: {
    DefaultView,
    Header,
    // Chat,
    SideBar,
  },

  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    isDarkModeOn() {
      return this.$vuetify.theme.dark;
    },
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
  created() {
    if (this.$vuetify.breakpoint.lgAndUp) {
      this.drawer = true;
    }
  },
};
</script>
<style scoped>
.v-app-bar {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>
