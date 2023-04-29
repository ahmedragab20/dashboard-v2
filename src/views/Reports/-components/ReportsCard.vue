<template>
  <v-hover v-slot="{ hover }">
    <v-card
      flat
      outlined
      class="overflow-hidden"
      :elevation="hover ? 10 : 0"
      rounded="xl"
    >
      <v-card flat style="margin-bottom: -15px">
        <v-card-title
          style="margin-bottom: -20px"
          class="text-h6 primary--text"
        >
          {{ title }}
        </v-card-title>
        <v-card-subtitle class="font-weight-bold">
          الاجمالي {{ number }} تقرير
        </v-card-subtitle>
      </v-card>
      <v-card flat class="overflow-hidden">
        <apexchart
          class="rounded"
          :options="apexChartOptions"
          :series="series"
          height="200"
          type="area"
        ></apexchart>
      </v-card>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    number: {
      type: Number || String,
      default: 0,
    },
    fillColor: {
      type: String,
      default: "#b8b8d2",
    },
  },
  data() {
    return {
      apexChartOptions: {
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
                offset: 40,
                color: this.fillColor, // blue color
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
    };
  },
};
</script>
