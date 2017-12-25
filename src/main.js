
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueAwesomeSwiper from 'vue-awesome-swiper';
import store from "./store"
require('swiper/dist/css/swiper.css');
Vue.use(VueAwesomeSwiper);
router.beforeEach(function (to,from,next) {
  document.title=to.meta.title;

  if(to.path==="/list"){
    next();
  }else {
    next();
  }
});
new Vue({
  el:"#app",
  router,
  store,
  render:h=>h(App),
})
