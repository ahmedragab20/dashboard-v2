<template>
  <v-responsive>
    <canvas ref="canvas"></canvas>
  </v-responsive>
</template>

<script>
  import { Chart, registerables } from 'chart.js';

  export default {
    props: {
      type: {
        type: String,
        required: true,
      },
      datasets: {
        type: Array,
        required: true,
        validator: (value) => {
          // Validate that each dataset has a label and data array
          return value.every((dataset) => {
            return dataset.label && Array.isArray(dataset.data);
          });
        },
      },
      labels: {
        type: Array,
        required: true,
      },
      options: {
        type: Object,
        default: {},
      },
    },
    mounted() {
      if (!this.type) {
        throw new Error('No chart type provided');
      }
      if (!this.datasets?.length) {
        throw new Error('No datasets provided');
      }

      const ctx = this.$refs.canvas.getContext('2d');
      if (ctx) {
        Chart.register(...registerables);

        new Chart(ctx, {
          type: this.type,
          data: {
            labels: this.labels,
            datasets: this.datasets,
          },
          options: this.options,
        });
      }
    },
  };
</script>
