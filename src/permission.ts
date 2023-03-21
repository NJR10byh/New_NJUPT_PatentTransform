import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getPermissionStore, getUserStore } from "@/store";
import router from "@/router";
import { MessagePlugin } from "tdesign-vue-next";
import { checkAuth } from "@/utils/auth";

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const userStore = getUserStore();
  const permissionStore = getPermissionStore();
  const { routers } = permissionStore;

  // 如果路由长度为零，重新鉴权
  if (!routers.length) {
    // 如果会话存在，放行
    console.log(checkAuth());
    if (checkAuth()) {
      next();
      return;
    }
  }

  if (to.path === "/login") {
    next();
    return;
  }

  const { role } = userStore;
  console.log(role);

  if (role) {
    /**
     * 已登录
     * 放行
     */
    next();
  } else {
    /**
     * role不存在，会话过期或未登录
     * 跳转至登录页面
     */
    try {
      next(`/`);
    } catch (error) {
      MessagePlugin.error(error);
      NProgress.done();
    }
  }
});

router.afterEach((to) => {
  if (to.path === "/login") {
    const userStore = getUserStore();
    const permissionStore = getPermissionStore();
    userStore.logout();
    permissionStore.restore();
  }
  NProgress.done();
});
