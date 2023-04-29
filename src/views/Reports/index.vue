<template>
  <v-card flat color="transparent">
    <v-container>
      <v-card flat outlined rounded="xl" class="pa-0 mb-5">
        <v-card flat rounded="xl" class="d-flex justify-space-between pa-0">
          <v-col cols="6">
            <v-card-title class="text-h4 primary--text px-0 pt-0">
              البطاقات
            </v-card-title>
            <v-card-subtitle class="px-0 grey--text">
              جميع البطاقات الخاصة بجميع الجهات
            </v-card-subtitle>
          </v-col>
          <v-col cols="6">
            <div class="d-flex justify-end align-center py-0" style="gap: 10px">
              <v-btn color="primary" rounded outlined class="px-5">
                <v-icon left>mdi-download</v-icon>
                <span> تحميل </span>
              </v-btn>
              <v-btn color="primary" rounded outlined class="px-5">
                <v-icon left>mdi-share</v-icon>
                <span> ارسال للايميل </span>
              </v-btn>
            </div>
          </v-col>
        </v-card>
      </v-card>
      <v-card flat outlined rounded="xl" class="pa-3">
        <v-card-title class="pt-0 primary--text"> نظرة عامة</v-card-title>
        <v-card-subtitle class="grey--text">
          نظرة عامة عن جميع التقارير
        </v-card-subtitle>
        <v-row no-gutters justify="center">
          <v-col
            v-for="(chart, i) in charts1"
            :key="i"
            cols="12"
            sm="6"
            md="4"
            :class="i + 1 === charts1.length ? 'ps-3' : 'pe-3'"
          >
            <ReportsCard
              class="mb-3"
              :number="chart.number"
              :title="chart.title"
              :fill-color="chart.color"
            />
          </v-col>
        </v-row>
        <v-divider class="my-5"></v-divider>
        <v-card flat class="pt-0">
          <v-card-title class="primary--text"> التقارير</v-card-title>
          <v-card-subtitle class="grey--text">
            جميع التقارير الخاصة بالبطاقات
          </v-card-subtitle>
          <v-row no-gutters>
            <v-col cols="12" sm="6" class="pa-3">
              <ReportsChart1 />
            </v-col>
            <v-col cols="12" sm="6" class="pa-3">
              <ReportsChart2 chart-type="heatmap" />
            </v-col>
            <v-col cols="12" class="pa-3">
              <ReportsChart2 chart-type="area" />
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-container>
  </v-card>
</template>
<script>
import ReportsCard from "@/views/Reports/-components/ReportsCard.vue";
import ReportsChart1 from "@/views/Reports/-components/ReportsChart1.vue";
import ReportsChart2 from "@/views/Reports/-components/ReportsChart2.vue";

export default {
  name: "Reports",
  components: { ReportsChart2, ReportsChart1, ReportsCard },
  data() {
    return {
      charts1: [
        {
          title: "البطاقات",
          number: 100,
          color: "#0b79e8",
        },
        {
          title: "المعايير",
          number: 321,
          color: "rgb(222,114,116)",
        },
        {
          title: "مستخدمي النظام",
          number: 14,
          color: "#2b5914",
        },
      ],
    };
  },
};
</script>
