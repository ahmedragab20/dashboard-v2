<template>
  <v-card flat class="bg-transparent py-7">
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
              <v-btn color="primary" flat link>
                <span class="mx-2">اضافة معيار جديد</span>
                <v-icon> mdi-plus </v-icon>
              </v-btn>
              <v-btn variant="outlined" icon size="x-small" to="/">
                <v-icon> mdi-home </v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" class="mt-4 mb-2">
          <div class="d-flex justify-start align-center" style="gap: 15px">
            <v-btn flat link class="bg-transparent">
              <span class="mx-1 primary--text">عرض الكل</span>
              <v-icon color="primary"> mdi-filter-variant</v-icon>
            </v-btn>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn flat link v-bind="props" class="bg-transparent">
                  <span class="info--text mx-1"> الجهه الحكومية</span>
                  <v-icon color="info"> mdi-filter-variant </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in gov" :key="index" :value="item">
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" flat link class="bg-transparent">
                  <span class="success--text mx-1"> الحالة</span>
                  <v-icon color="success"> mdi-filter-variant </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in statuses" :key="index" :value="item">
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>
        <v-col cols="12">
          <v-divider class="my-7"></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
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
                :class="index % 2 === 1 ? 'bg-tableRow1' : ''"
              >
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
                  <v-chip :color="complationRateColor(item.rate * 100 || 0)">{{
                    item.status.name
                  }}</v-chip>
                </td>
                <td>
                  <div class="d-flex align-center">
                    <v-progress-circular
                      :width="3"
                      :size="25"
                      class="mx-2"
                      :value="item.rate * 100 || 0"
                      :color="complationRateColor(item.rate * 100 || 0)"
                    >
                    </v-progress-circular>

                    <v-list-item class="pa-0" :color="complationRateColor(item.rate * 100)">
                      {{ item.rate * 100 }}%
                    </v-list-item>
                  </div>
                </td>
                <td>
                  <div class="text-h6 d-flex align-center" style="gap: 5px">
                    <v-icon color="primary">mdi-message-question-outline</v-icon>
                    <span class="primary--text">الاسئلة</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  export default {
    data() {
      return {
        gov: ['امانة الرياض', 'وزارة الصحة', 'أمانة جدة'],
        statuses: ['مكتمل', 'قيد العمل', 'ملغي'],
        items: [
          {
            standard: 'معيار الامن والامان',
            gov: 'امانة الرياض',
            startDate: '01/01/2021',
            endDate: '01/01/2022',
            status: { id: 1, name: 'مكتمل' },
            rate: 0.3,
          },
          {
            standard: 'معيار الجودة',
            gov: 'وزارة الصحة',
            startDate: '05/01/2021',
            endDate: '05/01/2022',
            status: { id: 2, name: 'قيد العمل' },
            rate: 0.5,
          },
          {
            standard: 'معيار الاستدامة',
            gov: 'أمانة جدة',
            startDate: '02/01/2021',
            endDate: '02/01/2022',
            status: { id: 1, name: 'مكتمل' },
            rate: 0.9,
          },
          {
            standard: 'معيار الصحة والسلامة المهنية',
            gov: 'شركة النفط السعودية',
            startDate: '03/01/2021',
            endDate: '03/01/2022',
            status: { id: 1, name: 'مكتمل' },
            rate: 0.7,
          },
        ],
      };
    },
    methods: {
      complationRateColor(value) {
        console.log('value', value);
        if (value == 0) return 'errorr';
        if (value < 50) return 'amber';
        if (value < 75) return 'info';

        return 'success';
      },
    },
  };
</script>
