<template>
  <v-card class="bg-transparent py-7">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-h4 text-grey-darken-1">
                البطاقات / <span class="primary--text">المعايير</span>
              </div>
              <p>جميع المعايير الخاصة بجميع الجهات</p>
            </div>
            <div class="d-flex align-center" style="gap: 20px">
              <v-btn @click="toggleAddStandardDialog" color="primary" link>
                <span class="mx-2">اضافة معيار جديد</span>
                <v-icon> mdi-plus</v-icon>
              </v-btn>
              <v-btn variant="outlined" icon size="x-small" to="/">
                <v-icon> mdi-home</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" class="mt-4 mb-2">
          <div class="d-flex justify-start align-center">
            <v-col cols="6">
              <div class="d-flex justify-start align-center" style="gap: 15px">
                <v-btn depressed link>
                  <span class="mx-1 primary--text">عرض الكل</span>
                  <v-icon color="primary"> mdi-filter-variant</v-icon>
                </v-btn>

                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      link
                      class="bg-transparent"
                      v-bind="attrs"
                      v-on="on">
                      <span class="info--text mx-1"> الجهه الحكومية</span>
                      <v-icon color="info"> mdi-filter-variant</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in gov"
                      :key="index"
                      :value="item">
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      link
                      class="bg-transparent"
                      v-bind="attrs"
                      v-on="on">
                      <span class="success--text mx-1"> الحالة</span>
                      <v-icon color="success"> mdi-filter-variant</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in statuses"
                      :key="index"
                      :value="item">
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-col>
            <!-- <v-col cols="6">
              <v-text-field
                dense
                outlined
                rounded
                label="البحث"
                prepend-inner-icon="mdi-magnify"
                single-line
                hide-details></v-text-field>
            </v-col> -->
          </div>
        </v-col>

        <v-col cols="12">
          <v-divider class="my-7"></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="elevation-1" outlined>
            <v-card-title class="primary--text">
              المعايير
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="البحث"
                single-line
                hide-details></v-text-field>
            </v-card-title>

            <v-data-table
              variant="outlined"
              :headers="headers"
              :items="items"
              :items-per-page="8"
              :loading="false"
              :search="search"
              loading-text="Loading... Please wait"
              class="elevation-0">
              <template v-slot:item.status="{ item }">
                <v-chip :color="competitionRateColor(item.rate * 100 || 0)"
                  >{{ item.status }}
                </v-chip>
              </template>
              <template v-slot:item.rate="{ item }">
                <div class="d-flex align-center">
                  <v-progress-circular
                    :width="3"
                    :size="25"
                    class="mx-2"
                    :value="item.rate * 100 || 0"
                    :color="competitionRateColor(item.rate * 100 || 0)">
                  </v-progress-circular>

                  <v-list-item
                    class="pa-0"
                    :color="competitionRateColor(item.rate * 100)">
                    {{ item.rate * 100 }}%
                  </v-list-item>
                </div>
              </template>
              <template v-slot:item.question="{ item }">
                <div class="text-subtitle d-flex align-center" style="gap: 5px">
                  <v-icon color="primary">mdi-message-question-outline </v-icon>
                  <span class="primary--text">الاسئلة</span>
                </div>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <!-- <v-col cols="12">
          <v-table height="400px">
            <thead class="bg-primary">
              <tr>
                <th style="color: white">المعيار</th>
                <th style="color: white">الجهة الحكومية</th>
                <th style="color: white">تاريخ البدء</th>
                <th style="color: white">تاريخ الانتهاء</th>
                <th style="color: white">الحالة</th>
                <th style="color: white">نسسبة الانجاز</th>
                <th style="color: white">الاسئلة</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in items"
                :key="index"
                :class="index % 2 === 1 ? 'bg-tableRow1' : ''">
                <td>
                  <div>{{ item.standard }}</div>
                </td>
                <td>
                  <div>{{ item.gov }}</div>
                </td>
                <td>
                  <div>{{ item.startDate }}</div>
                </td>
                <td>
                  <div>{{ item.endDate }}</div>
                </td>
                <td>
                  <v-chip :color="competitionRateColor(item.rate * 100 || 0)"
                    >{{ item.status.name }}
                  </v-chip>
                </td>
                <td>
                  <div class="d-flex align-center">
                    <v-progress-circular
                      :width="3"
                      :size="25"
                      class="mx-2"
                      :value="item.rate * 100 || 0"
                      :color="competitionRateColor(item.rate * 100 || 0)">
                    </v-progress-circular>

                    <v-list-item
                      class="pa-0"
                      :color="competitionRateColor(item.rate * 100)">
                      {{ item.rate * 100 }}%
                    </v-list-item>
                  </div>
                </td>
                <td>
                  <div class="text-h6 d-flex align-center" style="gap: 5px">
                    <v-icon color="primary"
                      >mdi-message-question-outline
                    </v-icon>
                    <span class="primary--text">الاسئلة</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col> -->
      </v-row>
    </v-container>

    <!--- dialog --->
    <v-dialog v-model="addStandardDialog" width="500">
      <v-card class="px-4">
        <v-card-title class="text-h5 primary--text px-0">
          اضافة معيار جديد
        </v-card-title>
        <v-text-field label="اسم المعيار" dense class="my-3"></v-text-field>
        <v-select
          dense
          outlined
          item-text="standard"
          :items="[
            {
              standard: 'كل الجهات',
              gov: 'كل الجهات',
            },
            ...items,
          ]"
          label="الجهات"
          class="my-3"></v-select>
        <v-select
          dense
          outlined
          item-text="title"
          :items="standardTypes"
          label="نوع المعيار"
          class="my-3"></v-select>

        <v-card>
          <v-row no-gutters>
            <v-col cols="6" class="pe-4">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="computedDateOneFormatted"
                    clearable
                    outlined
                    dense
                    label="التاريخ البدأ:"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="date1 = null"></v-text-field>
                </template>
                <v-date-picker
                  v-model="date1"
                  show-adjacent-months></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="computedDateTwoFormatted"
                    clearable
                    outlined
                    dense
                    label="التاريخ الأنتهاء:"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="date2 = null"></v-text-field>
                </template>
                <v-date-picker
                  show-adjacent-months
                  v-model="date2"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
        <v-divider></v-divider>

        <v-card-actions class="px-0">
          <v-spacer></v-spacer>
          <v-btn color="primary" text block @click="addStandardDialog = false">
            <v-icon>mdi-plus</v-icon>
            اضافة معيار
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { format, parseISO } from "date-fns";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "المعيار",
          value: "standard",
          align: "start",
          sortable: false,
        },
        { text: "الجهة الحكومية", value: "gov" },
        { text: "تاريخ البدء", value: "startDate" },
        { text: "تاريخ الانتهاء", value: "endDate" },
        { text: "الحالة", value: "status" },
        { text: "نسسبة الانجاز", value: "rate" },
        { text: "الاسئلة", value: "question" },
      ],
      gov: ["امانة الرياض", "وزارة الصحة", "أمانة جدة"],
      statuses: ["مكتمل", "قيد العمل", "ملغي"],

      items: [
        {
          standard: "معيار الامن والامان",
          gov: "امانة الرياض",
          startDate: "01/01/2021",
          endDate: "01/01/2022",
          status: "قيد العمل",
          rate: 0.3,
        },
        {
          standard: "معيار الجودة",
          gov: "وزارة الصحة",
          startDate: "05/01/2021",
          endDate: "05/01/2022",
          status: "قيد العمل",
          rate: 0.5,
        },
        {
          standard: "معيار الاستدامة",
          gov: "أمانة جدة",
          startDate: "02/01/2021",
          endDate: "02/01/2022",
          status: "مكتمل",
          rate: 1,
        },
        {
          standard: "معيار الصحة والسلامة المهنية",
          gov: "شركة النفط السعودية",
          startDate: "03/01/2021",
          endDate: "03/01/2022",
          status: "قيد مكتمل",
          rate: 0.7,
        },
      ],
      standardTypes: [
        {
          title: "الموارد البشرية",
        },
        {
          title: "الموارد المالية",
        },
        {
          title: "الموارد المادية",
        },
        {
          title: "الموارد البيئية",
        },
      ],
      date1: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
      date2: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
      menu1: false,
      menu2: false,
      addStandardDialog: false,
    };
  },
  computed: {
    computedDateOneFormatted() {
      return this.date1
        ? format(parseISO(this.date1), "EEEE, MMMM do yyyy")
        : "";
    },
    computedDateTwoFormatted() {
      return this.date2
        ? format(parseISO(this.date2), "EEEE, MMMM do yyyy")
        : "";
    },
  },
  methods: {
    competitionRateColor(value) {
      if (value === 0) return "error";
      if (value < 50) return "amber";
      if (value < 75) return "info";

      return "success";
    },
    toggleAddStandardDialog() {
      this.addStandardDialog = !this.addStandardDialog;
    },
  },
};
</script>
