<template>
  <v-card flat class="transparent pb-16">
    <v-container>
      <v-card flat outlined rounded="xl" class="pa-0 mb-5">
        <v-card flat rounded="xl" class="d-flex justify-space-between pa-0">
          <v-col cols="6">
            <v-card-title class="text-h4 primary--text px-0 pt-0">
              المعايير الاساسية للتحول الرقمى
            </v-card-title>
            <v-card-subtitle class="px-0 grey--text">
              جميع المعايير الخاصة يكل قسم
            </v-card-subtitle>
          </v-col>
          <v-col cols="6">
            <div
              class="d-flex justify-center align-end py-0 flex-column"
              style="gap: 10px"
            >
              <div class="d-flex justify-end align-center py-0">
                <v-btn
                  @click="expandAll = !expandAll"
                  outlined
                  color="primary"
                  rounded
                >
                  <v-icon class="me-3">
                    mdi-chevron-double-{{ expandAll ? "up" : "down" }}
                  </v-icon>
                  <span>{{
                    expandAll ? "إخفاء التفاصيل" : "عرض تفاصيل الكل"
                  }}</span>
                </v-btn>
              </div>
              <div class="d-flex justify-end align-center py-0">
                <v-btn
                  @click="filterationsDialog = !filterationsDialog"
                  outlined
                  color="primary"
                  rounded
                >
                  <v-icon class="me-3"> mdi-filter-variant</v-icon>
                  <span>تصفية</span>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-card>
        <v-col cols="12 mb-3">
          <v-btn
            v-for="tab in tabs"
            :key="tab.name"
            @click="activeComponent = tab.name"
            :class="['tab-btn', { active: activeComponent === tab.name }]"
          >
            <div class="d-flex justify-center align-center py-4">
              <!-- <span :class="tab.icon"></span> -->
              <span class="ml-3">{{ tab.val }}</span>
            </div>
          </v-btn>
        </v-col>
      </v-card>
      <v-card flat outlined rounded="xl" class="pa-3">
        <Transition name="fade" mode="out-in">
          <component :is="activeComponent" :expandAll="expandAll"></component>
        </Transition>
        <!-- <transition-group
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
              <v-hover>
                <template v-slot="{ hover }">
                  <v-card
                    :elevation="!hover ? 0 : 1"
                    rounded="xl"
                    :color="!hover ? '' : 'indigo lighten-5'"
                    :style="`border: 1px solid ${
                      $vuetify.theme.dark ? '#333' : '#e1e1e1'
                    }`"
                    class="pt-0"
                  >
                    
                    
                  </v-card>
                </template>
              </v-hover>
            </v-col>
          </template>
        </transition-group> -->
      </v-card>
    </v-container>

    <Filters v-model="filterationsDialog" />
  </v-card>
</template>

<script>
import gsap from "gsap";
import creditsData from "@/Data/credits";
import CreditCard from "@/views/Credits/-Components/CreditCard.vue";
import CreditCard2 from "@/views/Credits/-Components/CreditCard2.vue";
import { credits } from "@/locals/ar-KSA";
import { makeItLikeVRow } from "@/utils/helpers";
import Filters from "@/views/Credits/-Components/Filters.vue";

export default {
  data() {
    return {
      tabs: [
        { name: "CreditCard", icon: "fi-rr-list", val: "القسم الاول" },
        { icon: "fi-rr-apps", name: "CreditCard2", val: "القسم الثانى" },
      ],
      activeComponent: "CreditCard",
      filterationsDialog: false,
      cardPreviewDialog: false,
      expandAll: false,
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
    CreditCard2,
  },
};
</script>
<style scoped>
.tab-btn {
  background: #00a3ff33 !important;
  border-radius: 8px !important;
  color: #3d3870 !important;
  font-style: normal !important;
  font-weight: 900 !important;
  font-size: 12px !important;
  line-height: 14px !important;
  text-transform: uppercase !important;
  padding: 12px 17px !important;
  margin: 0px 5px !important;
}
.tab-btn i {
  font-style: normal !important;
  font-weight: 400 !important;
  font-size: 16px !important;
  line-height: 16px !important;
  text-align: center !important;
}
.active {
  background: #3d3870 !important;
  border-radius: 8px !important;
  color: #ffffff !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
