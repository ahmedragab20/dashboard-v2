<template>
  <v-container>
    <v-row no-gutters justify="space-between">
      <v-card flat class="transparent py-0">
        <v-card-title class="text-h4 font-bold primary--text">
          {{ dashboard.homepage }}
        </v-card-title>
      </v-card>
      <!-- Time Dialog -->
      <v-dialog v-model="timeDialog" width="auto" class="rounded-xl">
        <template v-slot:activator="{ props }">
          <v-card flat class="d-flex align-end transparent" v-bind="props">
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
    <v-card flat class="pa-3 transparent">
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
    <v-card flat class="mt-5 pa-3" rounded="xl">
      <v-card-title class="text-h5 font-bold primary--text">
        {{ dashboard.charts }}
      </v-card-title>
      <!-- <v-card-subtitle>
        {{ dashboard.chartsSubtitle }}
      </v-card-subtitle> -->
      <v-card flat color="transparent">
        <v-row justify="space-between" align="center">
          <v-col cols="12" sm="6">
            <v-card flat class="transparent">
              <v-card-title class="text-h6 font-bold primary--text">
                {{ dashboard.filters }}
              </v-card-title>
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="12" sm="6" class="pb-0">
                    <v-select
                      clearable
                      v-model="selectedFilter"
                      :items="filters"
                      label="الفلتر"
                      outlined
                      rounded="xl"
                      dense
                      color="primary"
                      hide-details
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-card-title
                      class="text-h6 font-bold primary--text pb-2 px-0"
                    >
                      تلخيص البيانات
                    </v-card-title>
                    <v-card flat>
                      <v-row class="pa-4" justify="space-between">
                        <v-col cols="12" sm="6" class="text-center">
                          <v-card
                            flat
                            class="d-flex align-center flex-column justify-center"
                          >
                            <v-progress-circular
                              style="transform: rotate(-90deg)"
                              :value="30"
                              size="70"
                              width="10"
                              color="accent"
                              class="mx-auto"
                            ></v-progress-circular>
                            <v-card-title
                              class="text-h6 font-bold accent--text"
                            >
                              30%
                            </v-card-title>
                            <v-card-subtitle
                              class="accent white--text py-1 rounded-xl font-weight-bold"
                            >
                              جارية
                            </v-card-subtitle>
                          </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" class="text-center">
                          <v-card
                            flat
                            class="d-flex align-center flex-column justify-center"
                          >
                            <v-progress-circular
                              style="transform: rotate(-90deg)"
                              :value="70"
                              size="70"
                              width="10"
                              color="primary"
                              class="mx-auto"
                            ></v-progress-circular>
                            <v-card-title
                              class="text-h6 font-bold primary--text"
                            >
                              70%
                            </v-card-title>
                            <v-card-subtitle
                              class="primary white--text py-1 rounded-xl font-weight-bold"
                            >
                              مكتملة
                            </v-card-subtitle>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card class="pa-4" rounded="xl" elevation="10">
              <chart
                :key="chartType"
                :type="chartType"
                :datasets="chartData"
                :labels="chartLabels"
                :options="chartOptions"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card-title>
        <v-btn
          depressed
          fab
          text
          color="primary"
          @click="
            chartType =
              chartTypes[chartTypes.indexOf(chartType) + 1] || chartTypes[0]
          "
        >
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
        <v-btn
          depressed
          fab
          text
          color="primary"
          @click="
            chartType =
              chartTypes[chartTypes.indexOf(chartType) - 1] || chartTypes[0]
          "
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-title class="mb-5 primary--text">
        تقارير عامة
      </v-card-title>
      <!-- <v-card-subtitle>
        هذه البيانات تم تحديثها بشكل دوري وهي متوفرة للمستخدمين
      </v-card-subtitle> -->
      <v-card flat>
        <v-row class="pa-4" justify="space-between">
          <v-col cols="12" sm="6" class="text-center">
            <v-card flat class="d-flex align-center flex-column justify-center">
              <v-progress-circular
                style="transform: rotate(-90deg)"
                :value="30"
                size="70"
                width="10"
                color="accent"
                class="mx-auto"
              ></v-progress-circular>
              <v-card-title class="text-h6 font-bold accent--text">
                30%
              </v-card-title>
              <v-card-subtitle
                class="accent white--text py-1 rounded-xl font-weight-bold"
              >
                جارية
              </v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" class="text-center">
            <v-card flat class="d-flex align-center flex-column justify-center">
              <v-progress-circular
                style="transform: rotate(-90deg)"
                :value="70"
                size="70"
                width="10"
                color="primary"
                class="mx-auto"
              ></v-progress-circular>
              <v-card-title class="text-h6 font-bold primary--text">
                70%
              </v-card-title>
              <v-card-subtitle
                class="primary white--text py-1 rounded-xl font-weight-bold"
              >
                مكتملة
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-row class="pa-4" justify="space-between">
        <v-col cols="12" sm="6" class="text-center">
          <v-card flat class="d-flex align-center flex-column justify-center">
            <chart
              :key="chartType"
              type="doughnut"
              :datasets="chartData"
              :labels="chartLabels"
              :options="chartOptions"
            />
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" class="text-center">
          <v-card flat class="d-flex align-center flex-column justify-center">
            <chart
              :key="chartType"
              type="doughnut"
              :datasets="chartData"
              :labels="chartLabels"
              :options="chartOptions"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card flat>
        <v-card-title class="mb-5 primary--text">
          تقارير الجهات الحكومية
        </v-card-title>
        <!-- <v-card-subtitle>
          هذة البيانات ليست متوفرة للمستخدمين وهي مخصصة للمشرفين فقط
        </v-card-subtitle> -->
        <v-row no-gutters>
          <v-col cols="12">
            <chart
              :key="chartType"
              type="line"
              :datasets="chartData"
              :labels="chartLabels"
              :options="chartOptions"
            />
          </v-col>
        </v-row>
      </v-card>
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
        backgroundColor: ["#3d3870", "#82B1FF"],
        hoverOffset: 9,
        responsive: true,
      },
      filters: ["سنوي", "ربع سنوي", "شهري", "أسبوعي"],
      selectedFilter: null,
      governmentStanders: [
        { title: "مكتملة", value: 40, color: "#45a2ff" },
        { title: "جارية", value: 23, color: "#a39714" },
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
