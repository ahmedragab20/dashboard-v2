<template>
  <v-card
    :max-width="maxWidth"
    :color="mainColor"
    :height="height"
    :class="extraClasses"
    tile
  >
    <v-list v-model="open" class="pa-3">
      <v-sheet class="transparent px-3 pb-5" dark>
        <component :is="logo" class="transparent" />
      </v-sheet>
      <v-list-item
        v-for="({ name, url, icon, children }, index) in sidebarLinks"
        :key="index"
        link
        class="white--text"
        :class="!children.length ? 'px-3' : 'px-0'"
        :color="!children.length ? 'white' : 'transparent'"
        dark
        :to="url"
      >
        <v-list-item-icon v-if="!children.length">
          <v-icon color="white" v-text="icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-title
          v-if="!children.length"
          v-text="name"
        ></v-list-item-title>
        <template v-if="children.length">
          <v-list-group :value="true" color="white" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content class="px-0">
                <v-list-item-title class="px-0">
                  {{ name }}
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="({ name, url, icon }, subIndex) in children"
              :key="subIndex"
              link
              color="white"
              class="white--text ps-10 rounded-xl"
              active-class="rounded-xl elevation-2"
              :to="url"
            >
              <v-list-item-icon>
                <v-icon color="white" v-text="icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="name"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
import Logo from "@/assets/logo.vue";
import LogoDark from "@/assets/logo-dark.vue";

export default {
  props: {
    maxWidth: {
      type: [String, Number],
      default: "100%",
    },
    mainColor: {
      type: String,
      default: "",
    },
    extraClasses: {
      type: String,
      default: "",
    },
    height: {
      type: [String, Number],
      default: "100vh",
    },
  },
  components: {
    Logo,
    LogoDark,
  },
  data() {
    return {
      open: [],
      admins: [
        ["Management", "mdi-account-multiple-outline"],
        ["Settings", "mdi-cog-outline"],
      ],
      cruds: [
        ["Create", "mdi-plus-outline"],
        ["Read", "mdi-file-outline"],
        ["Update", "mdi-update"],
        ["Delete", "mdi-delete"],
      ],
      sidebarLinks: [
        {
          name: "تقارير عامة",
          url: "/",
          children: [],
          icon: "mdi-home",
        },
        {
          name: "البطاقات (الرئيسية)",
          url: "/credits",
          icon: "mdi-credit-card",
          children: [
            {
              name: "المعايير",
              url: "/credits/standards",
              icon: "mdi-ruler",
              children: [],
            },
            {
              name: "الأسئلة",
              url: "/credits/questions",
              icon: "mdi-comment-question-outline",
              children: [],
            },
          ],
        },
        {
          name: "Components ",
          url: "/dummy/blank",
          children: [],
          icon: "mdi-contrast-box",
        },
      ],
    };
  },
  computed: {
    isDarkModeOn() {
      return this.$vuetify.theme.dark;
    },
    logo() {
      return Logo; //!this.isDarkModeOn ? LogoDark : Logo;
    },
  },
  methods: {
    isActive(link) {
      if (!link.url) return;
      console.log({
        path: this.$route.path,
        url: link.url,
        isActive: this.$route.path === link.url,
      });
      return this.$route.path === link.url;
    },
  },
};
</script>
<style lang="scss">
.v-list-group__header .v-list-item .v-list-item--link .theme--dark {
  background-color: #1e1e1e !important;
  color: #000 !important;
}
</style>
