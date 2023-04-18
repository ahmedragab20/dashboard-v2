<template>
  <v-navigation-drawer :value="value" location="bottom">
    <v-col cols="12" class="py-0">
      <div class="d-flex justify-end align-center px-4 pt-1">
        <v-btn @click="closeDrawer" icon size="small" color="error">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-col>
    <v-card flat max-width="320px"></v-card>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'MyDrawer',
    props: {
      value: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        items: [
          {
            title: 'Foo',
            value: 'foo',
          },
          {
            title: 'Bar',
            value: 'bar',
          },
          {
            title: 'Fizz',
            value: 'fizz',
          },
          {
            title: 'Buzz',
            value: 'buzz',
          },
        ],
      };
    },
    methods: {
      closeDrawer() {
        this.$emit('input:value', false);
      },
    },
    watch: {
      value(val) {
        console.log(val);
      },
    },
  };
</script>
