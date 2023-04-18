<template>
  <v-card flat class="bg-transparent pb-16">
    <v-container>
      <v-card flat outlined rounded="xl" class="pa-0 mb-5">
        <v-card flat rounded="xl" class="d-flex justify-space-between">
          <v-col cols="6">
            <v-card-title class="text-h4 primary--text px-0 pt-0">
              البطاقات
            </v-card-title>
            <v-card-subtitle class="px-0 grey--text"
              >جميع البطاقات الخاصة بجميع الجهات
            </v-card-subtitle>
          </v-col>
          <v-col cols="6">
            <div class="d-flex justify-end align-center py-2"></div>
          </v-col>
        </v-card>

        <v-row no-gutters>
          <v-col cols="12">
            <v-card
              flat
              class="d-flex justify-space-between align-center"
              rounded="xl"
            >
              <v-col cols="6">
                <v-btn
                  @click="filterationsDialog = !filterationsDialog"
                  outlined
                  color="primary"
                  rounded
                >
                  <v-icon class="me-3"> mdi-filter-variant</v-icon>
                  <span>تصفية</span>
                </v-btn>
              </v-col>

              <v-col cols="6">
                <div class="d-flex justify-end">
                  <v-btn variant="outlined" icon size="x-small" to="/">
                    <v-icon> mdi-home</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <transition-group
        id="v-row-div"
        appear
        tag="div"
        @before-enter="beforeEnter"
        @enter="enter"
      >
        <template>
          <v-col
            v-for="(item, i) in creditsData"
            :data-index="i"
            :key="i"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <CreditCard :item="item" @openDetails="previewCard" />
          </v-col>
        </template>
      </transition-group>
    </v-container>

    <Filters v-model="filterationsDialog" />

    <!-- Dialogs -->
    <v-dialog v-model="cardPreviewDialog" width="70%">
      <v-card v-if="cardDetails" class="py-3 px-10">
        <v-icon color="primary" :size="88">{{ cardDetails?.icon }}</v-icon>
        <v-card-title class="text-h4 primary--text px-2 py-0">
          {{ cardDetails?.title }}
        </v-card-title>
        <div
          v-for="(key, i) in Object.keys(cardDetails)"
          :key="i"
          class="px-2 grey--text mt-3"
        >
          <template
            v-if="
              ![
                'id',
                'title',
                'rate',
                'icon',
                'questions',
                'standards',
              ].includes(key)
            "
          >
            <template v-if="key !== 'completionRate'">
              <div class="d-flex">
                <div style="min-width: 100px" class="d-flex font-weight-bold">
                  {{ credits[key] }}:
                </div>
                <span>{{ cardDetails[key] }}</span>
              </div>
            </template>
            <template v-else>
              <div class="d-flex align-center">
                <strong class="me-3">{{ credits[key] }}: </strong>
                <div class="d-flex align-center">
                  <span>{{ cardDetails.completionRate * 100 || 0 }}%</span>
                  <v-progress-circular
                    :width="3"
                    :rotate="-90"
                    :size="14"
                    class="mx-3"
                    :value="cardDetails.completionRate * 100 || 0"
                    :color="
                      completionRateColor(cardDetails.completionRate * 100 || 0)
                    "
                  >
                  </v-progress-circular>
                </div>
              </div>
            </template>
          </template>
        </div>
        <v-divider class="mt-6"></v-divider>
        <v-card flat class="px-2">
          <v-card-title class="text-h5 primary--text px-0">
            الاسئلة الخاصة بالبطاقة
          </v-card-title>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>السؤال</th>
                  <th>الأجابة</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(question, i) in cardDetails.questions" :key="i">
                  <td>{{ question.title }}</td>
                  <td>{{ question.answer }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
        <v-divider class="mt-6"></v-divider>
        <v-card flat class="px-2">
          <v-card-title class="text-h5 primary--text px-0">
            المعايير الخاصة بالبطاقة
          </v-card-title>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>المعيار</th>
                  <th>الوصف</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(standard, i) in cardDetails.standards" :key="i">
                  <td>{{ standard.title }}</td>
                  <td>{{ standard.description }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import gsap from "gsap";
import creditsData from "@/Data/credits";
import CreditCard from "@/views/Credits/-Components/CreditCard.vue";
import { credits } from "@/locals/ar-KSA";
import { makeItLikeVRow } from "@/utils/helpers";
import Filters from "@/views/Credits/-Components/Filters.vue";

export default {
  data() {
    return {
      filterationsDialog: false,
      cardPreviewDialog: false,
      cardDetails: null,
    };
  },
  computed: {
    creditsData() {
      return creditsData;
    },
    credits() {
      return credits;
    },
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
    previewCard(item) {
      // open dialog
      console.log(item);
      this.cardPreviewDialog = true;
      this.cardDetails = item;
    },
    completionRateColor(value) {
      if (value < 50) return "amber";
      if (value < 75) return "info";
      return "success";
    },
  },
  watch: {
    cardPreviewDialog(val) {
      if (!val) {
        this.cardDetails = null;
      }
    },
  },
  mounted() {
    const vRowDiv = document.getElementById("v-row-div");
    makeItLikeVRow(vRowDiv);

    // this.previewCard(this.creditsData[0]);
  },
  components: {
    CreditCard,
    Filters,
  },
};
</script>
