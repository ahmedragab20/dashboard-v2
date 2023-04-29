<template>
  <v-card flat rounded="xl" outlined class="overflow-hidden py-3">
    <apexchart
      class="rounded"
      :options="options"
      :series="options.series"
      height="360"
      type="area"
    ></apexchart>
  </v-card>
</template>

<script>
export default {
  name: "ReportsChart1",
  data() {
    return {
      options: {
        series: [
          {
            name: "المعايير",
            type: "column",
            data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
          },
          {
            name: "البطاقات",
            type: "line",
            data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
          },
        ],
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
                color: "#50548c",
              },
              {
                offset: 100,
                color: "#8f7fd3",
              },
            ],
          },
        },
        stroke: {
          curve: "smooth",
          show: true,
          width: 3,
          colors: ["#fff"],
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
        },
        labels: [
          "01 Jan 2001",
          "02 Jan 2001",
          "03 Jan 2001",
          "04 Jan 2001",
          "05 Jan 2001",
          "06 Jan 2001",
          "07 Jan 2001",
          "08 Jan 2001",
          "09 Jan 2001",
          "10 Jan 2001",
          "11 Jan 2001",
          "12 Jan 2001",
        ],
        xaxis: {
          categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          crosshairs: {
            show: true,
            position: "front",
            stroke: {
              color: "#b6b6b6",
              width: 1,
              dashArray: 3,
            },
          },
        },
        yaxis: [
          {
            lines: {
              show: false,
            },
          },
          {
            opposite: true,
          },
        ],
        markers: {
          colors: ["#46497c"],
          strokeColor: ["#eee"],
          strokeWidth: 3,
        },
      },
    };
  },
};
</script>
