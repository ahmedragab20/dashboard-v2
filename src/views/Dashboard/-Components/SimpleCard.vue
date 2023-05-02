<template>
  <v-hover>
    <template v-slot="{ hover }">
      <v-card
        class="mx-auto py-3 d-flex justify-space-between align-center px-3 rounded-xl"
        outlined
        :elevation="!hover ? 0 : 1"
        :color="
          isDark
            ? ''
            : !hover
            ? ''
            : color === '#fff'
            ? 'grey lighten-4'
            : color
        "
      >
        <!-- title -->
        <div
          class="d-flex justify-center flex-column w-75"
          :style="{ gap: '0px' }"
        >
          <v-card-title class="primary--text">{{ item.title }}</v-card-title>
          <!-- <v-card-subtitle class="grey--text">
            {{ item.subtitle }}
          </v-card-subtitle> -->
        </div>
        <!-- icon -->
        <div class="d-flex justify-center align-center flex-column w-25">
          <v-icon :color="item.iconColor" large>{{ item.icon }} </v-icon>
          <v-chip dark small class="font-weight-bold" :color="item.iconColor">
            {{ item.value }}
          </v-chip>
        </div>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    color: {
      type: String,
      default: "#fff",
    },
  },
  computed: {
    isDark() {
      return this.$vuetify.theme.dark;
    },
  },
};
</script>
