<template>
  <v-row class="align-center">
    <v-col cols="6" class="ps-7">
      <v-text-field
        dense
        outlined
        rounded
        label="البحث"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        clear-icon="mdi-close-circle"
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-card
        color="transparent"
        flat
        class="transparent d-flex align-center py-1 justify-end"
        style="gap: 20px"
      >
        <v-btn icon fab small @click="toggleTheme">
          <v-icon>mdi-lightbulb</v-icon>
        </v-btn>

        <v-btn small text fab>
          <v-badge content="2" color="error">
            <v-icon color="primary">mdi-bell</v-icon>
          </v-badge>
        </v-btn>
        <div>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-card v-on="on" flat color="transparent">
                <v-avatar class="mx-2" size="25px">
                  <v-img
                    alt="Avatar"
                    src="@/assets/avatar/avatar-saudi.jpg"
                    cover
                  ></v-img>
                </v-avatar>
                <span style="user-select: none" color="primary">محمد</span>
                <v-icon size="25">mdi-menu-down</v-icon>
              </v-card>
            </template>

            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { title: "الملف الشخصي" },
        { title: "الإعدادات" },
        { title: "تسجيل الخروج" },
      ],
    };
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style scoped>
.v-text-field {
  box-shadow: none !important;
}

.test .v-field--variant-solo {
  box-shadow: none !important;
}
</style>
