import { createApp } from "vue";

import TDesign from "tdesign-vue-next";
import "tdesign-vue-next/es/style/index.css";

import { store } from "./store";
import router from "./router";
import "@/style/index.less";
import "./permission";
import App from "./App.vue";

const app = createApp(App);

// 自定义指令监听容器宽高变化
app.directive("resize", {
  mounted(el, binding) {
    // 这里使用debounce防抖处理，防抖的延时时间可以通过自定义指令的参数传过来，如`v-resize:300`表示300ms延时
    // 也可以将此处延时去掉，放在绑定的函数中自定义
    function debounce(fn, delay = 16) {
      let t = null;
      return function() {
        if (t) {
          clearTimeout(t);
        }
        const context = this;
        const args = arguments;
        t = setTimeout(function() {
          fn.apply(context, args);
        }, delay);
      };
    }

    el._resizer = new window.ResizeObserver(debounce(binding.value, Number(binding.arg) || 16));
    el._resizer.observe(el);
  },
  unmounted(el) {
    el._resizer.disconnect();
  }
});

app.use(TDesign);
app.use(store);
app.use(router);

app.mount("#app");
