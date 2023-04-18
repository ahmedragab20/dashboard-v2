<template>
  <div :style="containerStyle" class="position-relative border">
    <svg :width="size" :height="size">
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke-width="strokeWidth"
        :stroke="emptyStrokeColor"
        fill="none"
      ></circle>
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke-width="strokeWidth"
        :stroke="strokeColor"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
        fill="none"
      ></circle>
    </svg>
    <div
      style="position: absolute; top: 0; left: 0; z-index: 1"
      class="d-flex justify-center align-center w-100 h-100"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      percentage: {
        type: Number,
        required: true,
      },
      size: {
        type: Number,
        default: 100,
      },
      strokeWidth: {
        type: Number,
        default: 10,
      },
      strokeColor: {
        type: String,
        default: 'blue',
      },
      containerStyle: {
        type: Object,
        default: () => ({}),
      },
      emptyStrokeColor: {
        type: String,
        default: 'gray',
      },
    },
    computed: {
      circumference: function () {
        return Math.PI * (this.radius * 2);
      },
      radius: function () {
        return (this.size - this.strokeWidth) / 2;
      },
      center: function () {
        return this.size / 2;
      },
      dashArray: function () {
        return `${this.circumference} ${this.circumference}`;
      },
      dashOffset: function () {
        return this.circumference - (this.percentage / 100) * this.circumference;
      },
    },
  };
</script>
