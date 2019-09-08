/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require("./bootstrap");
window.Vue = require("vue");
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import VueYouTubeEmbed from "vue-youtube-embed";
Vue.use(VueYouTubeEmbed);

Vue.component(
    "parli-player",
    require("./components/ParliPlayer/ParliPlayer.vue").default
);

import VueAnalytics from "vue-analytics";
Vue.use(VueAnalytics, {
    id: "UA-119145839-3",
    checkDuplicatedScript: true
});

import SocialSharing from "vue-social-sharing";
Vue.use(SocialSharing);

const app = new Vue({
    el: "#app"
});
