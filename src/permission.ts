import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getPermissionStore, getUserStore } from "@/store";
import router from "@/router";
import { MessagePlugin } from "tdesign-vue-next";
import { isEmpty } from "@/utils/validate";

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  console.log(from);
  console.log(to);
  if (to.path == "/redirect") {
    next();
    return;
  }
  const userStore = getUserStore();
  const permissionStore = getPermissionStore();
  const { routers } = permissionStore;
  const { role } = userStore;
  console.log(isEmpty(role));

  if (to.path === "/login") {
    next();
    return;
  }

  console.log(routers);
  // 如果路由长度为零，重新鉴权
  if (routers.length == 0) {
    // 如果会话存在，放行
    if (isEmpty(role)) {
      next("/");
      return;
    } else {
      await permissionStore.initRoutes(role);
    }
  }

  console.log(role);
  console.log(to.meta.rolePermission);
  // @ts-ignore
  if ("rolePermission" in to.meta && to.meta.rolePermission.includes(role)) {
    /**
     * 已登录，鉴权通过
     * 放行
     */
    console.log("已登录，鉴权通过");
    next();
  } else {
    /**
     * 无权限
     * 跳转至403
     */
    console.log("无权限");
    try {
      next("/result/403");
    } catch (error) {
      await MessagePlugin.error(error);
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
