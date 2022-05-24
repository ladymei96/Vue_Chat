import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";
import i18nConfig from "@/i18n";

const app = createApp(App);
const i18n = createI18n(i18nConfig);

app.use(createPinia()).use(i18n).mount("#app");
