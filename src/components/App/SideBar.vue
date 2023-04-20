<template>
  <v-card
    :max-width="maxWidth"
    :color="mainColor"
    :height="height"
    :class="extraClasses"
    dark
    tile
  >
    <v-list v-model="open" class="pa-3">
      <v-sheet class="transparent px-3 pb-5" dark>
        <component :is="logo" class="transparent" />
      </v-sheet>
      <div v-for="(link, i) in sidebarLinks" :key="i">
        <template v-if="!link.children?.length">
          <v-list-item
            :to="link.url"
            :value="link"
            :color="isActive(link) ? 'primary' : ''"
            rounded
            dark
          >
            <template v-slot:prepend>
              <v-icon>{{ link.icon }}</v-icon>
            </template>

            <v-list-item-title>
              {{ link.name }}
            </v-list-item-title>
          </v-list-item>
        </template>
        <template v-else-if="link.children?.length">
          <v-list-group :value="`${link.name}`">
            <template v-slot:activator="{ props }">
              <v-list-item
                :to="isActive(link) ? '' : link.url"
                :color="isActive(link) ? 'primary' : ''"
                rounded
                v-bind="props"
                :title="`${link.name}`"
                :prepend-icon="link.icon"
                dark
              ></v-list-item>
            </template>

            <div v-for="(childLink, i) in link.children" :key="i">
              <v-list-item
                :to="childLink.url"
                :color="isActive(link) ? 'primary' : ''"
                rounded
                :value="link.name"
                :title="childLink.name"
                :prepend-icon="childLink.icon"
                dark
              ></v-list-item>
            </div>
          </v-list-group>
        </template>
      </div>
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
      sidebarLinks: [
        {
          name: "تقارير عامة",
          url: "/",
          children: [],
          icon: "mdi-home",
        },
        {
          name: "البطاقات",
          url: "/credits",
          icon: "mdi-credit-card",
          children: [],
        },
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
      return this.$route.path === link.url;
    },
  },
};
</script>
