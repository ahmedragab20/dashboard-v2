<template>
  <v-card class="bg-transparent py-7">
    <v-container>
      <v-card flat outlined rounded="xl" class="mb-5 px-4 pt-4">
        <v-row no-gutters>
          <v-col cols="12">
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-h4 grey--text">
                  البطاقات / <span class="primary--text">الاسئلة</span>
                </div>
                <p class="grey--text">جميع الاسئلة الخاصة بجميع الجهات</p>
              </div>
              <div class="d-flex align-center" style="gap: 20px">
                <v-btn color="primary" outlined rounded>
                  <span class="mx-2">اضافة سؤال جديد</span>
                  <v-icon> mdi-plus</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="12" class="mt-2">
            <v-row>
              <v-col class="d-flex justify-space-between align-center">
                <div
                  class="d-flex justify-space-between align-center mt-6"
                  style="gap: 10px">
                  <v-select
                    :items="['معيار الزياده', 'معيار النقص', 'معيار الحكومة']"
                    label="اختر المعيار"
                    dense
                    outlined>
                  </v-select>

                  <v-select
                    :items="['امانة الرياض', 'امانة جده', 'وزارة الدفاع']"
                    label="اختر الجهة الحكومية"
                    dense
                    outlined
                    offset-y>
                  </v-select>
                </div>

                <div>
                  <v-btn class="ml-2" outlined icon size="x-small" to="/">
                    <v-icon> mdi-home </v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <!-- <v-row> -->
      <transition-group
        id="v-row-div"
        appear
        tag="div"
        @before-enter="beforeEnter"
        @enter="enter">
        <template>
          <v-col
            cols="4"
            lg="4"
            md="6"
            sm="12"
            v-for="item in Items"
            :key="item.rate">
            <QuesCard :item="item"></QuesCard>
          </v-col>
        </template>
      </transition-group>
      <!-- </v-row> -->
    </v-container>
  </v-card>
</template>
<script>
import gsap from "gsap";
import QuesCard from "./-components/QuesCard.vue";
import { makeItLikeVRow } from "@/utils/helpers";
export default {
  components: {
    QuesCard,
  },
  data() {
    return {
      Items: [
        {
          rate: 3.3,
          ques: "  الى اى مدى يجب ان تكون كلمة المرور معقدة ؟",
          ans: "يجب الا تكون كلمه عاديةو ويجب ان تتضمن مجموعة من الاحرف والارقام والرموز الخاصة فى الدورات التدريبيه التى نقدمها نعلم المتدربيين حيلا بسيطة لانشاء كلمات مرور ذكية يسهل تذكرها",
          status: "تم الإجابة",
          grade: 75,
          gradeTitle: "نسبة التطابق",
        },
        {
          rate: 4.5,
          ques: "ما هي بعض النصائح لزيادة الإنتاجية في العمل؟",
          ans: "يجب الا تكون كلمه عاديةو ويجب ان تتضمن مجموعة من الاحرف والارقام والرموز الخاصة فى الدورات التدريبيه التى نقدمها نعلم المتدربيين حيلا بسيطة لانشاء كلمات مرور ذكية يسهل تذكرها",
          status: "تم الإجابة",
          grade: 90,
          gradeTitle: "ممتاز",
        },
        {
          rate: 2.8,
          ques: "ما هي فوائد التأمل؟",
          ans: "يجب الا تكون كلمه عاديةو ويجب ان تتضمن مجموعة من الاحرف والارقام والرموز الخاصة فى الدورات التدريبيه التى نقدمها نعلم المتدربيين حيلا بسيطة لانشاء كلمات مرور ذكية يسهل تذكرها",
          status: "تم الإجابة",
          grade: 60,
          gradeTitle: "مقبول",
        },
        {
          rate: 3.2,
          ques: "كيف يمكن تحسين الذاكرة؟",
          ans: "يجب الا تكون كلمه عاديةو ويجب ان تتضمن مجموعة من الاحرف والارقام والرموز الخاصة فى الدورات التدريبيه التى نقدمها نعلم المتدربيين حيلا بسيطة لانشاء كلمات مرور ذكية يسهل تذكرها",
          status: "تم الإجابة",
          grade: 80,
          gradeTitle: "جيد جدًا",
        },
        {
          rate: 1.5,
          ques: "ما هو التعلم عن بُعد؟",
          ans: "يجب الا تكون كلمه عاديةو ويجب ان تتضمن مجموعة من الاحرف والارقام والرموز الخاصة فى الدورات التدريبيه التى نقدمها نعلم المتدربيين حيلا بسيطة لانشاء كلمات مرور ذكية يسهل تذكرها",
          status: "تم الإجابة",
          grade: 68,
          gradeTitle: "جيد",
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
  },
  mounted() {
    const vRowDiv = document.getElementById("v-row-div");
    makeItLikeVRow(vRowDiv);
  },
};
</script>
<style scoped>
.v-content .v-card.theme--light {
  background-color: #ffffff !important;
  border-left: 5px solid red !important;
}
</style>
