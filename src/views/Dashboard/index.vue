<template>
  <v-container>
    <v-row no-gutters justify="space-between">
      <v-card flat class="bg-transparent">
        <v-card-title class="text-h4 font-bold primary--text">
          {{ dashboard.homepage }}
        </v-card-title>
        <div>
          <v-card-subtitle style="opacity: 1" class="py-0">
            {{ dashboard.weHappyThatYourBack }}،
            <span class="text-h6">يا زيد 👋💜️</span>
          </v-card-subtitle>
        </div>
      </v-card>
      <!-- Time Dialog -->
      <v-dialog v-model="timeDialog" width="auto" class="rounded-xl">
        <template v-slot:activator="{ props }">
          <v-card flat class="d-flex align-end bg-transparent" v-bind="props">
            <v-btn
              @click="timeDialog = !timeDialog"
              depressed
              fab
              text
              color="primary"
            >
              <v-icon>mdi-timer</v-icon>
            </v-btn>
          </v-card>
        </template>
        <Timer />
      </v-dialog>
    </v-row>
    <v-card flat class="mt-10 pa-3 bg-transparent">
      <!---- Simple card --->
      <transition-group
        id="v-row-div"
        appear
        tag="div"
        @before-enter="beforeEnter"
        @enter="enter"
      >
        <v-col
          v-for="(item, i) in dashboardData"
          :data-index="i"
          :key="item.id"
          cols="12"
          lg="4"
          sm="6"
        >
          <SimpleCard :item="item" :color="i === 0 ? '#CBE1F7' : '#fff'" />
        </v-col>
      </transition-group>
    </v-card>
    <!-- Charts -->
    <v-card flat rounded class="bg-transparent mt-5 pa-3">
      <v-card-title class="text-h5 font-bold primary--text">
        {{ dashboard.charts }}
      </v-card-title>
      <chart-row
        v-for="(chart, i) in chartDivs"
        :key="i"
        :item="chart"
        :index="i"
        :items="chartDivs"
        class="py-6"
      >
        <template #start>
          <!-- Circular Progress -->
          <v-card flat class="mt-8 mx-auto bg-transparent" max-width="500px">
            <v-card-title class="primary--text">
              {{ dashboard.governmentStandards }}
            </v-card-title>
            <v-card-subtitle>
              {{ dashboard.governmentStandardsDescription }}
            </v-card-subtitle>
            <div class="d-flex justify-center mt-10">
              <div
                v-for="(stander, i) in governmentStanders"
                :key="i"
                class="text-center"
              >
                <v-progress-circular
                  class="mx-3"
                  :size="128"
                  :width="12"
                  :rotate="-90"
                  :value="stander.value"
                  :color="stander.color"
                >
                  <span class="text-h5 font-weight-bold">
                    {{ stander.value }}%
                  </span>
                </v-progress-circular>
                <v-card-text class="text-h5">
                  {{ stander.title }}
                </v-card-text>
              </div>
            </div>
          </v-card>
        </template>
        <template #end>
          <!-- Charts Card -->
          <v-card flat class="bg-transparent">
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedFilter"
                  :items="filters"
                  :label="dashboard.filters"
                  color="primary"
                  class="bg-transparent"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="chartType"
                  :items="chartTypes"
                  :label="dashboard.changeTheChartView"
                  color="primary"
                  class="bg-transparent"
                ></v-select>
              </v-col>
            </v-row>
            <chart
              :key="chartType"
              :type="chartType"
              :datasets="chartData"
              :labels="chartLabels"
              :options="chartOptions"
            />
          </v-card>
        </template>
      </chart-row>
    </v-card>
  </v-container>
</template>
<script>
import dashboardData from "@/Data/dashboard";
import { dashboard } from "@/locals/ar-KSA";
import SimpleCard from "@/views/Dashboard/-Components/SimpleCard.vue";
import Chart from "@/components/Charts/Chart.vue";
import Timer from "@/views/Dashboard/-Components/Timer.vue";
import gsap from "gsap";
import { makeItLikeVRow } from "@/utils/helpers";
import ChartRow from "@/views/Dashboard/-Components/Chart-Row.vue";

export default {
  data() {
    return {
      timeDialog: false,
      chartTypes: ["line", "bar", "radar", "polarArea", "scatter"],

      chartType: "bar",
      chartData: [
        {
          label: "Dataset 1",
          data: [10, 20, 30, 40, 50, 60],
        },
        {
          label: "Dataset 2",
          data: [20, 30, 10, 40, 50, 60],
        },
      ],
      chartLabels: ["January", "February", "March", "April", "May"],
      chartOptions: {
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        hoverOffset: 9,
        responsive: true,
      },
      filters: ["سنوي", "ربع سنوي", "شهري", "أسبوعي"],
      selectedFilter: null,
      governmentStanders: [
        { title: "مكتملة", value: 40, color: "#45a2ff" },
        { title: "جارية", value: 20, color: "#a39714" },
        { title: "متوقفة", value: 10, color: "#ff1f62" },
      ],
      beforeEnter: (el) => {
        el.style.opacity = 0;
        el.style.transform = "translateX(-100px)";
      },
      enter: (el, done) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          onComplete: done,
          delay: el.dataset.index * 0.1,
        });
      },
      chartDivs: ["chart-one", "chart-two", "chart-three"],
    };
  },
  components: {
    SimpleCard,
    Chart,
    Timer,
    ChartRow,
  },
  methods: {
    makeItLikeVRow,
  },
  mounted() {
    const vRowDiv = document.getElementById("v-row-div");
    this.makeItLikeVRow(vRowDiv);
    window.scrollTo(0, 0);
  },
  watch: {
    chartType(newVal, oldValue) {
      console.log({ newVal, oldValue });
    },
  },
  computed: {
    dashboard() {
      return dashboard;
    },
    dashboardData() {
      return dashboardData;
    },
  },
};
</script>
