<template>
  <v-card class="bg-transparent py-7">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-h4">
                البطاقات / <span class="text-primary">الاسئلة</span>
              </div>
              <p>عرض جميع الاجهزة الموجوده ف النظام</p>
            </div>
            <div class="d-flex align-center" style="gap: 20px">
              <v-btn color="primary" flat link>
                <span class="mx-2">اضافة سؤال جديد</span>
                <v-icon> mdi-plus </v-icon>
              </v-btn>
              <v-btn variant="outlined" icon size="x-small" to="/">
                <v-icon> mdi-home </v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" class="mt-2">
          <v-row>
            <v-col
              cols="6"
              class="d-flex justify-space-between align-center"
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
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
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
          ans: "تتضمن بعض النصائح لزيادة الإنتاجية في العمل وضع أهداف واضحة، وتحديد الأولويات، وتقليل التشتت، وأخذ استراحات، وتفويض المهام عند الاقتضاء.",
          status: "تم الإجابة",
          grade: 90,
          gradeTitle: "ممتاز",
        },
        {
          rate: 2.8,
          ques: "ما هي فوائد التأمل؟",
          ans: "تتضمن فوائد التأمل تقليل مستوى الضغط والقلق، وتحسين التركيز والانتباه، وزيادة الوعي الذاتي، وتحسين النوم.",
          status: "تم الإجابة",
          grade: 60,
          gradeTitle: "مقبول",
        },
        {
          rate: 3.2,
          ques: "كيف يمكن تحسين الذاكرة؟",
          ans: "يمكن تحسين الذاكرة عن طريق الاسترخاء والنوم الجيد، وتحديد مواقيت محددة للتعلم، وتكرار المعلومات، واستخدام تقنيات الذاكرة مثل التجسيد والتأليف.",
          status: "تم الإجابة",
          grade: 80,
          gradeTitle: "جيد جدًا",
        },
        {
          rate: 1.5,
          ques: "ما هو التعلم عن بُعد؟",
          ans: "يعني التعلم عن بعد تعلم المواد التعليمية والدراسية عن طريق الإنترنت أو من خلال برامج التعلم الإلكترونية، ويمكن للطلاب المشاركة في المحاضرات عبر الإنترنت وإجراء الاختبارات وتقديم الواجبات الخاصة بهم عبر الإنترنت.",
          status: "تم الإجابة",
          grade: 68,
          gradeTitle: "جيد",
        },
      ],
    };
  },
  methods: {
    complationRateColor(value) {
      if (value <= 60) return "error";
      if (value <= 70) return "warning";
      if (value <= 80) return "info";
      if (value <= 90) return "success";
      return "success";
    },
  },
};
</script>
