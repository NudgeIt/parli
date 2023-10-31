import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import Bootstrap and BootstrapVue CSS files
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

import VueYouTubeEmbed from "vue-youtube-embed";
Vue.use(VueYouTubeEmbed);

Vue.component(
  "parli-player",
  require("./components/ParliPlayer/ParliPlayer.vue").default
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
