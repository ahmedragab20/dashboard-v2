<template>
  <v-card
    class="pa-0"
    density="compact"
    color="transparent"
    outlined
    rounded="xl"
    min-height="330px">
    <v-card-title class="d-flex justify-space-between align-start ma-0 pa-0">
      <div
        style="border-top-right-radius: 10px; border-bottom-left-radius: 8px"
        class="primary white--text py-1 px-3 font-weight-light text-subtitle-1">
        {{ item.rate }}
      </div>
      <v-spacer></v-spacer>
      <div class="error--text h3 pa-1 pl-3">*</div>
    </v-card-title>
    <v-card-text>
      <div class="text-h6 text-truncate primary--text">
        {{ item.ques }}
      </div>
      <div class="mt-3 mb-1">
        <v-icon color="error" style="transform: rotate(45deg)">
          mdi-pin
        </v-icon>
      </div>
      <div class="text-grey-darken-3 font-weight-bold">
        {{ item.ans }}
      </div>
      <div class="mb-1 pa-0">
        <div class="d-flex align-center">
          <div class="d-flex align-center">
            <v-progress-circular
              class="mx-3"
              :size="100"
              :width="5"
              :value="item.grade"
              :color="complationRateColor(item.grade)">
              <span class="text-title font-weight-bold">
                {{ item.grade }}%
              </span>
            </v-progress-circular>
            <v-card-text class="text-h6 px-0 font-weight-bold grey--text"
              >{{ item.gradeTitle }}
            </v-card-text>
          </div>
          <v-spacer></v-spacer>
        </div>
      </div>
      <div class="d-flex align-center justify-space-between">
        <v-chip class="lighten-5">
          <v-icon class="pa-0" color="success">mdi-circle-medium</v-icon>
          <span class="ma-1">{{ item.status }}</span>
        </v-chip>
        <div class="d-flex">
          <v-icon class="ml-2" color="error" style="transform: rotate(45deg)"
            >mdi-paperclip</v-icon
          >
          <v-icon color="success">mdi-file-move</v-icon>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    complationRateColor(value) {
      if (value <= 60) return "error";
      if (value <= 70) return "warning";
      if (value <= 80) return "info";
      if (value <= 90) return "success";
      return "success";
    },
  },
};
</script>
