import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    options: {
      customProperties: true
    },
    themes: {
      dark: {
        background: "#0d5050",
        primary: "#33cccc",
        secondary: "#3368cc",
        accent: "#92cfe0",
        error: "#a60a0a",
        info: "#1f0aa6",
        success: "#179c0e",
        warning: "#a8a311",
        anchor: "#c4f9fb"
      }
    }
  }
});
