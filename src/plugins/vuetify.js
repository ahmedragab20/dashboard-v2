import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      light: {
        background: "#f1f1f1",
        primary: "#3d3870",
        secondary: "#5CBBF6",
        accent: "#048ba8",
        error: "#ef476f",
        info: "#2196F3",
        success: "#06d6a0",
        warning: "#ffd166",
        tableRow1: "#eee",
      },
      dark: {
        background: "#2121214C",
        primary: "#494580",
        secondary: "#22ccff",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        tableRow1: "#999",
      },
    },
  },
  rtl: true,
});
