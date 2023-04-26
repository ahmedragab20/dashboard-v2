<template>
  <v-container>
    <v-card outlined rounded="xl" class="mb-5 pa-3">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center">
            <div>
              <!-- <div class="text-h4 primary--text">التدقيق والمراجعة</div> -->
              <div class="text-h5 grey--text">
                التدقيق والمراجعة/
                <span class="primary--text">امانة الرياض</span>
              </div>
              <p class="grey--text">جميع الاسئلة الخاصة لهذه الجهه</p>
            </div>
          </div>
        </v-col>
      </v-row>

      <transition-group
        id="v-row-div2"
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
            v-for="item in cardItems"
            :key="item.title">
            <v-hover>
              <template v-slot="{ hover }">
                <v-card
                  :elevation="hover ? 12 : 2"
                  class="mx-2 my-2 pa-3 text-center">
                  <v-progress-circular
                    :width="10"
                    :rotate="-90"
                    :size="200"
                    class="mx-3 text-center"
                    :value="item.completionRate * 100 || 0"
                    :color="item.color">
                    <small>
                      <div class="h2 font-weight-black" style="font-size: 30px">
                        {{ item.title }}
                      </div>
                      <div style="font-size: 30px" class="h2 font-weight-black">
                        {{ item.completionRate * 100 }}
                      </div>
                    </small>
                  </v-progress-circular>
                </v-card>
              </template>
            </v-hover>
          </v-col>
        </template>
      </transition-group>
      <transition-group
        id="v-row-div"
        appear
        tag="div"
        @before-enter="beforeEnter"
        @enter="enter">
        <template>
          <v-data-table
            :key="1"
            :headers="headers"
            :items="items"
            :items-per-page="10"
            :loading="false"
            :search="search"
            loading-text="Loading... Please wait"
            dense
            fixed-header
            must-sort
            striped
            class="px-5 rounded-xl overflow-hidden mt-9">
            <template v-slot:item.status="{ item }">
              <v-chip :color="competitionRateColor(item.rate * 100 || 0)"
                >{{ item.status }}
              </v-chip>
            </template>
            <template v-slot:item.rate="{ item }">
              <div class="d-flex align-center justify-center">
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
            <template v-slot:item.actions="{ item }">
              <v-btn @click="checkDialog = true" small color="primary">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </template>
      </transition-group>
    </v-card>
    <!-- dialog --->
    <v-dialog v-model="checkDialog" width="700" persistent>
      <v-card class="px-0" color="#eee">
        <v-card-title
          class="d-flex justify-space-between align-start ma-0 pa-0">
          <div
            style="border-top-right-radius: 0px; border-bottom-left-radius: 8px"
            class="primary white--text py-1 px-3 font-weight-light text-subtitle-1">
            1
          </div>
          <v-spacer></v-spacer>
          <div class="error--text h3 pa-1 pl-3">*</div>
        </v-card-title>
        <div class="d-flex justify-space-between align-center px-3">
          <div class="primary--text font-weight-black">
            ما مدى قوة كلمة المرور الخاصه بك ؟
          </div>
          <div class="grey--text lighten-3 font-weight-bold">
            المدة الزمنية للحل : 30 ثانية
          </div>
        </div>
        <div class="d-flex justify-space-between align-center px-3 pr-7">
          <div>
            <span class="grey--text lighten-3 font-weight-bold ml-2"
              >اظهار الاجابة</span
            >
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  depressed
                  icon
                  small
                  @click="showresult = !showresult">
                  <v-icon color="primary" v-if="showresult == true"
                    >mdi-arrow-up</v-icon
                  >
                  <v-icon color="primary" v-else>mdi-arrow-down</v-icon>
                </v-btn>
              </template>
              <span>اظهار الاجابة</span>
            </v-tooltip>
          </div>
          <div
            class="d-flex justify-space-between align-center font-weight-bold">
            <div class="primary--text">
              <v-icon color="success">mdi-circle-medium</v-icon>
              اجابة الجهة
            </div>
            <div class="primary--text">
              <v-icon color="error">mdi-circle-medium</v-icon>
              اجابة المدقق
            </div>
            <div class="primary--text">
              <v-icon color="primary">mdi-circle-medium</v-icon>
              اجابة متطابقة
            </div>
          </div>
        </div>
        <v-lazy>
          <div class="grey--text lighten-3 px-3" v-if="showresult == true">
            يجب الا تكون كلمه عادية و ويجب ان تتضمن مجموعة من الاحرف والارقام
            والرموز الخاصة فى الدورات التدريبيه التى نقدمها نعلم المتدربيين حيلا
            بسيطة لانشاء كلمات مرور ذكية يسهل تذكرها
          </div>
        </v-lazy>

        <v-divider class="mt-3"></v-divider>
        <v-card-text class="px-3">
          <v-radio-group
            active-class="bg-active"
            class="font-weight-black"
            v-model="radioCheck"
            column>
            <v-radio
              color="white"
              label=" يجب الا تكون كلمه عادية و ويجب ان تتضمن مجموعة من الاحرف والارقام"
              style="
                background-color: white;
                padding: 10px;
                border-radius: 10px;
              "
              value="primary">
            </v-radio>
            <v-radio
              color="white"
              label=" يجب الا تكون كلمه عادية و ويجب ان تتضمن مجموعة من الاحرف والارقام"
              style="
                background-color: white;
                padding: 10px;
                border-radius: 10px;
              "
              value="info"
              checked>
            </v-radio>
            <v-radio
              color="white"
              label=" يجب الا تكون كلمه عادية و ويجب ان تتضمن مجموعة من الاحرف والارقام"
              style="
                background-color: white;
                padding: 10px;
                border-radius: 10px;
              "
              value="danger">
            </v-radio>
            <v-radio
              color="white"
              label=" يجب الا تكون كلمه عادية و ويجب ان تتضمن مجموعة من الاحرف والارقام"
              style="
                background-color: white;
                padding: 10px;
                border-radius: 10px;
              "
              value="secondary">
            </v-radio>
          </v-radio-group>
          <v-col class="py-0" cols="12">
            <div class="grey--text lighten-4 h5">ملاحظة الخبير</div>
            <v-text-field
              outlined
              multi-line
              rows="3"
              placeholder="ملاحظة الخبير"
              background-color="white"></v-text-field>
          </v-col>
          <v-col class="py-0" cols="12">
            <div class="grey--text lighten-4 h5">ملاحظة المدقق الاول</div>
            <v-text-field
              outlined
              multi-line
              rows="3"
              placeholder="ملاحظة المدقق الاول"
              background-color="white"></v-text-field>
          </v-col>
          <v-col class="py-0" cols="12">
            <div class="grey--text lighten-4 h5">ملاحظة المدقق الثانى</div>
            <v-text-field
              outlined
              multi-line
              rows="3"
              placeholder="ملاحظة المدقق الثانى"
              background-color="white"></v-text-field>
          </v-col>
        </v-card-text>

        <v-card-actions class="px-2 py-4 d-flex justify-end">
          <v-btn
            color="primary"
            rounded
            @click="(checkDialog = false), (snackbar = true)">
            <v-icon>mdi-plus</v-icon>
            اصدار تقرير
          </v-btn>
          <v-btn color="error" rounded outlined @click="checkDialog = false">
            اغلاق
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" color="primary">
      <v-icon> mdi-check</v-icon>
      تم المراجعة بنجاح
    </v-snackbar>
  </v-container>
</template>
<script>
import gsap from "gsap";
import { makeItLikeVRow } from "@/utils/helpers";
export default {
  data() {
    return {
      showresult: false,
      radioCheck: "info",
      search: "",
      checkDialog: false,
      snackbar: false,
      headers: [
        {
          text: "السؤال",
          value: "question",
          align: "start",
          sortable: false,
        },
        {
          text: "المعيار",
          value: "standard",
          align: "start",
          sortable: false,
        },
        { text: "تاريخ البدء", value: "startDate" },
        { text: "تاريخ الانتهاء", value: "endDate" },
        { text: "الحالة", value: "status" },
        { text: "نسسبة الانجاز", value: "rate" },
        { text: "الاجراءات", value: "actions" },
      ],
      items: [
        {
          question: "الى اى مدى قوة كلمة السر؟",
          standard: "معيار الامن والامان",
          startDate: "01/01/2021",
          endDate: "01/01/2022",
          status: "قيد العمل",
          rate: 0.3,
        },
        {
          question: "الى اى مدى قوة كلمة السر؟",
          standard: "معيار الجودة",
          startDate: "05/01/2021",
          endDate: "05/01/2022",
          status: "قيد العمل",
          rate: 0.5,
        },
        {
          question: "الى اى مدى قوة كلمة السر؟",
          standard: "معيار الاستدامة",
          startDate: "02/01/2021",
          endDate: "02/01/2022",
          status: "مكتمل",
          rate: 1,
        },
        {
          question: "الى اى مدى قوة كلمة السر؟",
          standard: "معيار الصحة والسلامة المهنية",
          startDate: "03/01/2021",
          endDate: "03/01/2022",
          status: "قيد مكتمل",
          rate: 0.7,
        },
        {
          question: "الى اى مدى قوة كلمة السر؟",
          standard: "معيار الامن والامان",
          startDate: "01/01/2021",
          endDate: "01/01/2022",
          status: "قيد العمل",
          rate: 0.3,
        },
        {
          question: "الى اى مدى قوة كلمة السر؟",
          standard: "معيار الجودة",
          startDate: "05/01/2021",
          endDate: "05/01/2022",
          status: "قيد العمل",
          rate: 0.5,
        },
        {
          question: "الى اى مدى قوة كلمة السر؟",
          standard: "معيار الامن والامان",
          startDate: "01/01/2021",
          endDate: "01/01/2022",
          status: "قيد العمل",
          rate: 0.3,
        },
        {
          question: "الى اى مدى قوة كلمة السر؟",
          standard: "معيار الجودة",
          startDate: "05/01/2021",
          endDate: "05/01/2022",
          status: "قيد العمل",
          rate: 0.5,
        },
      ],
      cardItems: [
        { completionRate: 0.8, title: "المكتملة", color: "success" },
        { completionRate: 0.4, title: "غير المكتملة", color: "orange" },
        { completionRate: 0.2, title: "لم تفتح بعد", color: "error" },
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
    competitionRateColor(value) {
      if (value === 0) return "error";
      if (value < 50) return "amber";
      if (value < 75) return "info";

      return "success";
    },
  },
  mounted() {
    const vRowDiv = document.getElementById("v-row-div2");
    makeItLikeVRow(vRowDiv);
    setInterval(() => {
      const columnHeaders = document.querySelectorAll('[role="columnheader"]');

      columnHeaders.forEach((header) => {
        header.classList.remove("text-start");
        header.classList.add("text-center");
      });

      const td = document.querySelectorAll("td");
      td.forEach((td) => {
        td.classList.remove("text-start");
        td.classList.add("text-center");
      });
    });
  },
};
</script>
<style lang="scss">
[role="columnheader"] {
  background-color: #3d3870 !important;
  border-color: #3d3870 !important;

  * {
    color: #fff !important;
  }
}

.bg-active {
  background-color: #3d3870 !important;
  color: yellow !important;
  padding: 10px;
  border-radius: 10px;
}
.bg-active * {
  color: white !important;
}
</style>
