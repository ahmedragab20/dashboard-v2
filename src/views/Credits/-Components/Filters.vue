<template>
  <v-bottom-sheet :value="value" persistent>
    <v-card>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <div class="d-flex justify-end align-center px-4 pt-1">
              <v-btn @click="closeDrawer" icon size="small" color="error">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" class="pb-10">
            <v-card flat class="px-1">
              <v-card-title class="primary--text"> تصفية</v-card-title>
              <v-card-subtitle class="grey--text">
                تصفية البطاقات بواسطة البيانات التالية
              </v-card-subtitle>
              <v-col cols="12">
                <v-text-field
                  dense
                  outlined
                  label="البحث باسم الجهة"
                  prepend-inner-icon="mdi-magnify"
                  single-line
                  hide-details
                  clear-icon="mdi-close-circle"
                  clearable
                  color="primary"
                ></v-text-field>
              </v-col>
            </v-card>
            <v-card flat class="px-4">
              <v-row no-gutters>
                <v-col cols="6" class="pe-4">
                  <v-text-field
                    dense
                    outlined
                    type="number"
                    label="المدة المتوقعة للانجاز بالأيام"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="ps-4">
                  <v-card flat>
                    <v-select
                      v-model="selectedExperts"
                      :items="experts"
                      label="الخبراء المعنيين"
                      multiple
                      hint="اختر الخبراء المعنيين"
                      item-text="name"
                      item-value="name"
                      persistent-hint
                      menu-props="auto"
                      hide-details
                      outlined
                      rounded
                      dense
                    >
                      <template v-slot:selection="{ item, index }">
                        <v-chip
                          pill
                          small
                          close
                          @click:close="selectedExperts.splice(index, 1)"
                        >
                          <v-avatar left>
                            <v-img :src="item.image" cover></v-img>
                          </v-avatar>
                          {{ item.name }}
                        </v-chip>
                      </template>
                    </v-select>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <v-card flat class="px-4">
              <v-row no-gutters>
                <v-col cols="12" sm="6">
                  <div class="d-flex">
                    <v-switch
                      v-model="mostCompletionRate"
                      label="الجهة التي تحتوي على أكبر معدل انجاز"
                    ></v-switch>
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="d-flex ps-5">
                    <v-switch
                      v-model="hasTheMostExperts"
                      label="الجهة التي تحتوي على أكبر عدد من الخبراء"
                    ></v-switch>
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="d-flex">
                    <v-switch
                      v-model="mostRating"
                      label="الجهة التي تحتوي على أكبر معدل تقييم"
                    ></v-switch>
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="d-flex ps-5">
                    <v-switch
                      v-model="mostRecent"
                      label="الجهة التي تحتوي على أحدث تاريخ انجاز"
                    ></v-switch>
                  </div>
                </v-col>
              </v-row>

              <v-card-actions>
                <v-btn
                  @click="closeDrawer"
                  color="primary"
                  rounded
                  class="pe-10"
                  depressed
                >
                  <v-icon class="pe-7 ps-3"> mdi-filter-variant</v-icon>
                  تأكيد
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import { format, parseISO } from "date-fns";

export default {
  name: "MyDrawer",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      drawer: false,
      mostCompletionRate: false,
      hasTheMostExperts: false,
      mostRating: false,
      mostRecent: false,
      date1: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
      date2: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
      menu1: false,
      menu2: false,
      selectedExperts: [],
      experts: [
        {
          name: "محمد العمري",
          image: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          name: "فاطمة الحمداني",
          image: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
          name: "علي الغامدي",
          image: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        {
          name: "نورة الشمري",
          image: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        {
          name: "أحمد المنصور",
          image: "https://randomuser.me/api/portraits/men/5.jpg",
        },
      ],
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
    format,
    closeDrawer() {
      this.$emit("input", false);
    },
  },
  mounted() {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        this.closeDrawer();
      }
    });
  },
};
</script>
