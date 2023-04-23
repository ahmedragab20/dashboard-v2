<template>
  <v-card class="transparent">
    <v-container>
      <v-card flat outlined rounded="xl" class="mb-5 pa-3">
        <v-row no-gutters>
          <v-col cols="12">
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-h5 grey--text">
                  البطاقات / <span class="primary--text">الاسئلة</span>
                </div>
                <p class="grey--text">جميع الاسئلة الخاصة بجميع الجهات</p>
              </div>
              <div class="d-flex justify-end">
                <div class="d-flex">
                  <v-btn
                    @click="toggleAddQuestionDialog"
                    color="primary"
                    outlined
                    rounded
                  >
                    <v-icon> mdi-plus</v-icon>
                    <span class="mx-2">اضافة سؤال جديد</span>
                  </v-btn>
                  <div class="mx-4 d-flex py-2">|</div>
                </div>
                <div class="d-flex align-center" style="gap: 10px">
                  <div class="d-flex align-center">
                    <v-select
                      :items="['معيار الزياده', 'معيار النقص', 'معيار الحكومة']"
                      label="اختر المعيار"
                      dense
                      outlined
                      rounded
                      color="primary"
                    >
                    </v-select>
                  </div>

                  <div class="d-flex align-center">
                    <v-select
                      :items="['امانة الرياض', 'امانة جده', 'وزارة الدفاع']"
                      label="اختر الجهة الحكومية"
                      dense
                      outlined
                      offset-y
                      rounded
                    >
                    </v-select>
                  </div>
                </div>
              </div>
            </div>
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
            cols="4"
            lg="4"
            md="6"
            sm="12"
            v-for="(item, i) in Items"
            :key="item.rate"
            :data-index="i"
          >
            <v-hover>
              <template v-slot="{ hover }">
                <v-card flat rounded="xl" :elevation="hover ? 12 : 2">
                  <QuesCard :item="item"></QuesCard>
                </v-card>
              </template>
            </v-hover>
          </v-col>
        </template>
      </transition-group>

      <div class="pb-8"></div>
    </v-container>

    <!-- Dialogs -->
    <v-dialog v-model="addQuestionDialog" max-width="720px">
      <v-card>
        <v-card-title>
          <span class="text-h5 primary--text"> اضافة مجموعة أسئلة </span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  dense
                  label="عنوان "
                  required
                  outlined
                  hide-details
                ></v-text-field>
              </v-col>
              <v-divider class="my-4"></v-divider>
              <v-col cols="12">
                <v-card
                  flat
                  class="d-flex justify-space-between align-center py-0"
                >
                  <v-card-title class="px-0">
                    <span class="text-h6">اضافة سؤال</span>
                  </v-card-title>
                  <v-btn icon>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card outlined class="py-0">
                  <v-col cols="12">
                    <v-textarea
                      label="السؤال"
                      required
                      outlined
                      messages="السؤال مطلوب"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-autocomplete
                      dense
                      outlined
                      :items="[
                        'معايير الامان والسلامة',
                        'معايير الجودة',
                        'معايير الصحة والسلامة المهنية',
                        'معايير البيئة',
                      ]"
                      label="المعيار*"
                      multiple
                      hint="اختر المعيارات التي تنطبق عليها الاسئلة"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-autocomplete
                      dense
                      outlined
                      :items="[
                        'امانة الرياض',
                        'امانة جده',
                        'وزارة الدفاع',
                        'وزارة الصحة',
                      ]"
                      label="الجهة الحكومية*"
                      hint="اختر الجهة الحكومية التي تنطبق عليها الاسئلة"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      dense
                      v-model="files"
                      color="deep-purple accent-4"
                      counter
                      label="المرفقات"
                      multiple
                      placeholder="اختر المرفقات"
                      prepend-icon="mdi-paperclip"
                      outlined
                      :show-size="1000"
                    >
                      <template v-slot:selection="{ index, text }">
                        <v-chip
                          v-if="index < 2"
                          color="deep-purple accent-4"
                          dark
                          label
                          small
                        >
                          {{ text }}
                        </v-chip>

                        <span
                          v-else-if="index === 2"
                          class="text-overline grey--text text--darken-3 mx-2"
                        >
                          +{{ files.length - 2 }} ملفات اخرى
                        </span>
                      </template>
                    </v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <v-card
                      flat
                      class="d-flex justify-space-between align-center"
                    >
                      <!-- required question -->
                      <v-switch label="السؤال مطلوب" color="primary"></v-switch>
                      <div class="d-flex">
                        <!-- copy question -->
                        <v-btn icon class="me-2">
                          <v-icon>mdi-content-copy</v-icon>
                        </v-btn>
                        <!-- delete question -->
                        <v-btn icon>
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </div>
                    </v-card>
                  </v-col>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pb-5">
          <v-btn
            color="primary"
            block
            rounded
            @click="addQuestionDialog = false"
          >
            اضافة
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      addQuestionDialog: false,
      files: [],
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
    toggleAddQuestionDialog() {
      this.addQuestionDialog = !this.addQuestionDialog;
    },
  },
  mounted() {
    const vRowDiv = document.getElementById("v-row-div");
    makeItLikeVRow(vRowDiv);
  },
};
</script>
