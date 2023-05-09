<template>
  <v-card
    class="mx-auto py-0"
    :max-width="368"
    rounded="xl"
    density="compact"
    color="transparent"
    flat
    outlined
  >
    <v-card-title class="d-flex justify-space-between align-start ma-0 pa-0">
      <div
        style="border-top-right-radius: 15px; border-bottom-left-radius: 8px"
        class="primary white--text py-1 px-3 font-weight-light text-subtitle-1"
      >
        {{ item.cardNumber }}
      </div>
      <v-spacer></v-spacer>
      <!-- <div class="error--text h3 pa-1 pl-3">*</div> -->
    </v-card-title>
    <!-- <v-card-title>{{ item.cardNumber }}</v-card-title> -->
    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col cols="12" class="text-center mb-5 mt-2">
          <v-icon color="primary" :size="58">{{ item.icon }}</v-icon>
        </v-col>

        <v-col cols="12">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <div v-on="on" v-bind="attrs">
                <div class="body-1 text-truncate font-weight-bold text-center">
                  {{ item.title }}
                </div>
              </div>
            </template>
            <v-card-subtitle class="pa-0">{{ item.title }}</v-card-subtitle>
          </v-tooltip>
        </v-col>
        <v-col cols="12" class="mb-2">
          <div class="d-flex justify-center align-center">
            <v-progress-circular
              :width="3"
              :rotate="-90"
              :size="30"
              class="mx-3"
              :value="item.completionRate * 100 || 0"
              :color="completionRateColor(item.completionRate * 100 || 0)"
            >
              <small>
                {{ item.completionRate * 100 }}
              </small>
            </v-progress-circular>
            <v-card-subtitle class="body-1 px-0">
              مدى الالتزام
            </v-card-subtitle>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-expand-transition>
      <v-card v-show="expand" flat color="transparent" width="100%">
        <div
          v-for="(key, i) in Object.keys(item)"
          :key="i"
          class="px-2 grey--text mt-3"
        >
          <template
            v-if="
              ![
                'id',
                'title',
                'rate',
                'icon',
                'questions',
                'standards',
                'cardNumber',
              ].includes(key)
            "
          >
            <template v-if="key !== 'completionRate'">
              <div class="d-flex justify-center">
                <div class="d-flex font-weight-bold mx-2">
                  {{ credits[key] }}:
                </div>
                <span>{{ item[key] }}</span>
              </div>
            </template>
          </template>
        </div>
      </v-card>
    </v-expand-transition>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text block rounded @click="expand = !expand">
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
    expandAll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      expand: false,
    };
  },
  computed: {
    credits() {
      return credits;
    },
  },
  watch: {
    expandAll(newValue, oldValue) {
      this.expand = newValue;
    },
  },
  methods: {
    completionRateColor(value) {
      if (value < 50) return "amber";
      if (value < 75) return "info";
      return "success";
    },
  },
};
</script>
