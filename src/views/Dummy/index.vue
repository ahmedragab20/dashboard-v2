<template>
  <v-sheet>
    <div class="text-center text-h1 mb-5">Dummy</div>
    <v-card flat min-height="100vh">
      <v-card
        width="500px"
        class="mx-auto overflow-hidden py-7"
        rounded="xl"
        flat
        outlined
      >
        <apexchart
          class="rounded"
          :options="apexChartOptions"
          :series="series"
          height="200"
          type="area"
        ></apexchart>
        <apexchart
          class="rounded"
          :options="apexChartOptions"
          :series="series"
          height="200"
          type="line"
        ></apexchart>
        <apexchart
          class="rounded"
          :options="apexChartOptions"
          :series="series"
          height="200"
          type="radar"
        ></apexchart>
      </v-card>
    </v-card>
    <!-- Countdown -->
    <v-card
      flat
      variant="tonal"
      rounded
      class="d-flex justify-center align-center"
      title="Timer:"
    >
      <v-card-title>
        <div class="display-1 font-weight-light">{{ time.days }} days</div>
      </v-card-title>
      <v-card-subtitle>
        <div class="display-1 font-weight-light">{{ time.hours }} hours</div>
      </v-card-subtitle>
      <v-card-subtitle>
        <div class="display-1 font-weight-light">
          {{ time.minutes }} minutes
        </div>
      </v-card-subtitle>
      <v-card-subtitle>
        <div class="display-1 font-weight-light">
          {{ time.seconds }} seconds
        </div>
      </v-card-subtitle>
    </v-card>
    <!-- Chart.js -->
    <v-card flat class="mt-8 mx-auto transparent" max-width="500px">
      <div>
        <h1>Chart.js Example</h1>
        <div>
          <v-btn color="secondary" variant="outlined" @click="changeChartType">
            play around with the chart
          </v-btn>
        </div>
        <chart
          :key="chartType"
          :type="chartType"
          :datasets="chartData"
          :labels="chartLabels"
          :options="chartOptions"
        />
      </div>
    </v-card>
    <!-- Circular Progress -->
    <v-card flat class="mt-8 mx-auto transparent" max-width="500px">
      <div class="d-flex justify-center align-center">
        <div class="text-center">
          <v-progress-circular
            class="mx-3"
            :value="100"
            color="blue-grey"
          ></v-progress-circular>
          <v-progress-circular
            class="mx-3"
            :value="80"
            color="deep-orange-lighten-2"
          ></v-progress-circular>
          <v-progress-circular
            class="mx-3"
            :value="60"
            color="brown"
          ></v-progress-circular>
          <v-progress-circular
            class="mx-3"
            :value="40"
            color="lime"
          ></v-progress-circular>
          <v-progress-circular
            class="mx-3"
            :value="20"
            color="indigo-darken-2"
          ></v-progress-circular>
        </div>
      </div>
    </v-card>
    <!-- Sidebar -->
    <Sidebar :max-width="320" extra-classes="mx-auto" />
    <!-- Search Input -->
    <v-card max-width="320px" variant="flat" class="mx-auto transparent">
      <v-text-field
        v-model="something"
        prepend-icon="mdi-magnify"
      ></v-text-field>
    </v-card>
    <!-- Progress -->
    <v-card flat class="mt-8 mx-auto transparent" max-width="500px">
      <div class="d-flex">
        <Progress
          :percentage="99"
          :size="250"
          :stroke-width="12"
          stroke-color="#4CAF50"
        >
          <div style="text-align: center; font-size: 20px">75%</div>
        </Progress>
      </div>
    </v-card>
  </v-sheet>
</template>
<script>
import Sidebar from "@/components/App/SideBar.vue";
import Chart from "@/components/Charts/Chart.vue";
import Progress from "@/components/Reusable/Progress.vue";
import { startCountdown } from "@/utils/helpers";

export default {
  components: {
    Sidebar,
    Chart,
    Progress,
  },
  data() {
    return {
      apexChartOptions: {
        labelColor: "#ef227f",
        strokeColor: "#E2E8F0",
        borderColor: "#E2E8F0",
        color: "#0a2541",
        chart: {
          fontFamily: "inherit",
          sparkline: {
            enabled: true,
          },
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 10,
            left: 0,
            blur: 5,
            color: "rgba(238,238,238,0.18)",
            opacity: 0.5,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
            colorStops: [
              {
                offset: 50,
                color: "rgba(113,138,168,0.73)", // blue color
              },
              {
                offset: 80,
                color: "#f3f3f3", // blue color
              },
              {
                offset: 100,
                color: "#fff", // blue color
              },
            ],
          },
        },
        stroke: {
          curve: "smooth",
          show: true,
          width: 3,
          colors: ["#d1d1d1"],
        },
        xaxis: {
          categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          labels: {
            show: true,
            style: {
              colors: this.labelColor,
              fontSize: "12px",
            },
          },
          crosshairs: {
            show: true,
            position: "front",
            stroke: {
              color: this.borderColor,
              width: 1,
              dashArray: 3,
            },
          },
        },
        tooltip: {
          style: {
            fontSize: "12px",
          },
          marker: {
            show: false,
          },
        },
        markers: {
          colors: [this.color],
          strokeColor: [this.strokeColor],
          strokeWidth: 3,
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 45, 32, 70, 40, 40, 40],
        },
      ],
      targetDate: new Date(2023, 3, 20), // April 20, 2023
      time: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      chartTypes: [
        "line",
        "bar",
        "radar",
        "doughnut",
        "polarArea",
        "bubble",
        "scatter",
      ],
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
      something: null,
      percentages: [
        { value: 5, color: "red" },
        { value: 95, color: "green" },
        // { value: 15, color: "blue" },
        // { value: 10, color: "yellow" },
        // { value: 1, color: "orange" },
      ],
    };
  },

  methods: {
    changeChartType() {
      let randomIndex = Math.floor(Math.random() * this.chartTypes.length);
      while (this.chartTypes[randomIndex] === this.chartType) {
        randomIndex = Math.floor(Math.random() * this.chartTypes.length);
      }
      this.chartType = this.chartTypes[randomIndex] || "bar";
    },
  },
  mounted() {
    startCountdown(this.targetDate, (remainingTime) => {
      this.time = remainingTime;
    });
  },
};
</script>
