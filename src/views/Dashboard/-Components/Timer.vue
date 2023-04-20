<template>
  <v-card
    class="pt-3 pb-8 rounded-xl overflow-hidden"
    rounded="xl"
    min-width="550px"
  >
    <div class="d-flex justify-center">
      <v-card-title class="headline font-weight-bold">
        {{ timer.title }}
      </v-card-title>
    </div>
    <div class="d-flex justify-center">
      <v-chip class="mb-8 mx-auto" small>
        {{ targetDateFormatted }}
      </v-chip>
    </div>
    <!-- box for each category in the timer -->
    <v-row justify="center">
      <v-card class="mx-1 pa-3" dark color="primary" rounded="xl" text>
        <div class="text-h6">{{ time.days }} {{ timer.days }}</div>
      </v-card>
      <v-card class="mx-1 pa-3 transparent primary--text" rounded="xl" outlined>
        <div class="text-h6">{{ time.hours }} {{ timer.hours }}</div>
      </v-card>
      <v-card class="mx-1 pa-3 transparent primary--text" rounded="xl" outlined>
        <div class="text-h6">{{ time.minutes }} {{ timer.minutes }}</div>
      </v-card>
      <v-card class="mx-1 pa-3 transparent primary--text" rounded="xl" outlined>
        <div class="text-h6">{{ time.seconds }} {{ timer.seconds }}</div>
      </v-card>
    </v-row>
  </v-card>
</template>

<script>
import { timer } from "@/locals/ar-KSA";
import { computed, onBeforeMount, ref } from "vue";
import { startCountdown } from "@/utils/helpers";

export default {
  name: "TimerComponent",
  data() {
    return {
      timer,
      targetDate: new Date(2023, 9, 20), // April 20, 2023
      time: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    };
  },
  computed: {
    targetDateFormatted() {
      const date = this.targetDate;
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
  },
  created() {
    startCountdown(this.targetDate, (remainingTime) => {
      this.time = remainingTime;
    });
  },
};
</script>
