import Vue from "vue";
import App from "./App.vue";
import router from "@/routes/index";
import store from "@/store/index";
import axios from "axios";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import ToggleButton from "vue-js-toggle-button";

Vue.use(BootstrapVue);
Vue.use(ToggleButton);

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRF-TOKEN";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
