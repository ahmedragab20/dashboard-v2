<template>
  <v-card
    class="mx-auto"
    :max-width="368"
    rounded="xl"
    density="compact"
    flat
    outlined
  >
    <div class="d-flex py-3 justify-space-between">
      <div></div>
      <div class="d-flex flex-column">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <v-progress-circular
                :width="3"
                :rotate="-90"
                :size="25"
                class="mx-3"
                :value="item.completionRate * 100 || 0"
                :color="completionRateColor(item.completionRate * 100 || 0)"
              >
              </v-progress-circular>
            </div>
          </template>
          <span>
            {{ `${credits.completionRate} ${item.completionRate * 100 || 0}%` }}
          </span>
        </v-tooltip>
      </div>
    </div>
    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col cols="12" class="text-center">
          <v-icon color="primary" :size="88">{{ item.icon }}</v-icon>
        </v-col>
        <v-col cols="12">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <div v-on="on" v-bind="attrs">
                <div class="text-h6 text-truncate font-weight-bold text-center">
                  {{ item.title }}
                </div>
              </div>
            </template>
            <v-card-subtitle class="pa-0">{{ item.title }}</v-card-subtitle>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text block rounded @click="openDetails">
        {{ credits.showFullDetails }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { credits } from "@/locals/ar-KSA";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      expand: false,
    };
  },
  computed: {
    headers() {
      return [
        {
          text: credits.details,
          value: "details",
        },
      ];
    },
    credits() {
      return credits;
    },
  },
  methods: {
    completionRateColor(value) {
      if (value < 50) return "amber";
      if (value < 75) return "info";
      return "success";
    },
    openDetails() {
      this.$emit("openDetails", this.item);
    },
  },
};
</script>
