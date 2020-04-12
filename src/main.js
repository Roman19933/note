import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import modal from "@/plugins/modal";
import vuescroll from "vuescroll"
Vue.use(vuescroll, {
  ops: {
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
      keepShow: true,
      background: 'rgb(29, 107, 141)',
      opacity: .8,
      size: '6px',
      disable: false
    }
  },
});
Vue.component('vuescroll', vuescroll)
Vue.use(modal);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
