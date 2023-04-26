<template>
  <v-container>
    <v-card outlined rounded="xl" class="mb-5 pa-3">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-h4 primary--text">التدقيق والمراجعة</div>
              <p class="grey--text">جميع الاسئلة الخاصة بجميع الجهات</p>
            </div>
          </div>
        </v-col>
      </v-row>

      <transition-group
        id="v-row-div"
        appear
        tag="div"
        @before-enter="beforeEnter"
        @enter="enter">
        <template>
          <v-col
            cols="12"
            lg="4"
            md="6"
            sm="12"
            v-for="item in items"
            :key="item.name">
            <v-hover>
              <template v-slot="{ hover }">
                <v-card
                  :elevation="hover ? 12 : 2"
                  @mouseover="item.show = true"
                  @mouseleave="item.show = false"
                  class="mx-2 my-2 pa-3">
                  <v-card-title
                    class="d-flex justify-space-between align-center">
                    <div class="h5 font-weight-bold primary--text">
                      امانة الرياض
                    </div>
                    <v-btn
                      link
                      to="revision/revision-one"
                      color="primary"
                      class="h5 font-weight-bold"
                      >التدقيق
                      <v-icon class="mr-1">mdi-arrow-left</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text class="mt-2">
                    <v-row v-if="!item.show">
                      <v-col>
                        <v-progress-linear
                          height="20"
                          :color="completionRateColor(item.rate)"
                          :value="item.rate">
                          {{ item.rate }}% مكتمل
                        </v-progress-linear>
                      </v-col>
                    </v-row>
                    <v-row v-if="item.show">
                      <v-col cols="6"
                        ><v-progress-linear
                          height="20"
                          :color="completionRateColor(item.rate)"
                          :value="item.rate">
                          {{ item.rate }}% مكتمل
                        </v-progress-linear></v-col
                      >
                      <v-col cols="6"
                        ><v-progress-linear
                          height="20"
                          :color="completionRateColor(item.rate)"
                          :value="item.rate">
                          {{ item.rate }}% مكتمل
                        </v-progress-linear></v-col
                      >
                    </v-row>
                  </v-card-text>
                </v-card>
              </template>
            </v-hover>
          </v-col>
        </template>
      </transition-group>
    </v-card>
  </v-container>
</template>
<script>
import gsap from "gsap";
import { makeItLikeVRow } from "@/utils/helpers";
export default {
  data() {
    return {
      items: [
        {
          name: "امانة الرياض",
          rate: 70,
          show: false,
        },
        {
          name: "امانة الطائف",
          rate: 90,
          show: false,
        },
        {
          name: "امانة جده",
          rate: 80,
          show: false,
        },
        {
          name: "امانة الجوف",
          rate: 60,
          show: false,
        },
        {
          name: "امانة الباحة",
          rate: 50,
          show: false,
        },
        {
          name: "امانة الاحساء",
          rate: 40,
          show: false,
        },
        {
          name: "2امانة الرياض",
          rate: 70,
          show: false,
        },
      ],
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = "translateX(-100px)";
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        onComplete: done,
        delay: el.dataset.index * 0.1,
      });
    },

    completionRateColor(value) {
      if (value < 50) return "amber";
      if (value < 75) return "info";
      return "success";
    },
  },
  mounted() {
    const vRowDiv = document.getElementById("v-row-div");
    makeItLikeVRow(vRowDiv);
  },
};
</script>
