import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import mailData from "./resources/mailData";

Vue.prototype.$mailData = mailData;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
