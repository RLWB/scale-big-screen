import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "normalize.css";
// import "@/assets/var.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import scaleBigScreen from "scale-big-screen";
import "scale-big-screen/style.css";
import test from "xuanqiyantest";
console.log(test());

const app = createApp(App);

app.use(ElementPlus, { size: "large", zIndex: 3000 });
app.use(scaleBigScreen);
app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);

app.mount("#app");
