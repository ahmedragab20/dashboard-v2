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
            <v-card flat>
              <v-card-title class="primary--text"> تصفية</v-card-title>
              <v-card-subtitle class="grey--text">
                تصفية البطاقات بواسطة البيانات التالية
              </v-card-subtitle>
              <v-col cols="12">
                <v-text-field
                  dense
                  outlined
                  rounded
                  label="البحث باسم الجهة"
                  prepend-inner-icon="mdi-magnify"
                  single-line
                  hide-details
                  clear-icon="mdi-close-circle"
                  clearable
                ></v-text-field>
              </v-col>
            </v-card>
            <v-card flat>
              <v-card-title> النتائج خلال فترة محددة:</v-card-title>
              <v-row no-gutters>
                <v-col cols="6" class="px-4">
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    max-width="290"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="computedDateOneFormatted"
                        clearable
                        outlined
                        rounded
                        dense
                        label="التاريخ من:"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        @click:clear="date1 = null"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date1"
                      show-adjacent-months
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    max-width="290"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="computedDateTwoFormatted"
                        clearable
                        outlined
                        rounded
                        dense
                        label="التاريخ الى:"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        @click:clear="date2 = null"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      show-adjacent-months
                      v-model="date2"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-card>
            <v-card flat class="px-4">
              <div class="d-flex">
                <v-checkbox
                  v-model="mostCompletionRate"
                  label="الجهة التي تحتوي على أكبر معدل انجاز"
                ></v-checkbox>
              </div>
              <div class="d-flex">
                <v-checkbox
                  v-model="hasTheMostExperts"
                  label="الجهة التي تحتوي على أكبر عدد من الخبراء"
                ></v-checkbox>
              </div>
              <v-card-actions>
                <v-btn color="primary" rounded class="pe-10" depressed>
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
      date1: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
      date2: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
      menu1: false,
      menu2: false,
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
