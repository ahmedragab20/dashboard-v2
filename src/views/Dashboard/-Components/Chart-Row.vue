<template>
  <v-card
    flat
    color="transparent"
    :class="[item, { 'charts-section': index === 0 }]"
    ref="item"
  >
    <v-row :justify="columns ? 'center' : 'space-between'">
      <v-col cols="12" :sm="columns ? '12' : '6'" class="cols">
        <slot name="start" />
      </v-col>
      <v-col cols="12" :sm="columns ? '12' : '6'">
        <slot name="end" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    item: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
    },
    columns: {
      type: Boolean,
    },
  },
};
</script>
