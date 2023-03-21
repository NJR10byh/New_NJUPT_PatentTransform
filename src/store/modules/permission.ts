import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import router, { asyncRouterList } from "@/router";
import { store } from "@/store";

function filterPermissionsRouters(routes: Array<RouteRecordRaw>, role: String) {
  const res = [];
  let children = [];
  let removeRoutes = [];
  routes.forEach((route) => {
    /**
     * 每次foreach新的route，需要将鉴权通过的孩子数组初始化
     */
    children = [];
    route.children?.forEach((childRouter) => {
      const rolePermission = childRouter.meta?.rolePermission || childRouter.name;
      // @ts-ignore
      if (rolePermission.indexOf(role) !== -1) {
        children.push(childRouter);
      } else {
        removeRoutes.push(childRouter);
      }
    });
    if (children.length > 0) {
      route.children = children;
      res.push(route);
    }
  });
  return { accessedRouters: res, removeRoutes };
}

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    whiteListRouters: ["/login"],
    routers: [],
    removeRoutes: []
  }),
  actions: {
    async initRoutes(role) {
      let accessedRouters = [];// 允许访问的
      let removeRoutes = []; // 移除的
      // special token
      if (role == "root") {
        accessedRouters = asyncRouterList;
      } else {
        const res = filterPermissionsRouters(asyncRouterList, role);
        accessedRouters = res.accessedRouters;
        removeRoutes = res.removeRoutes;
        this.routers = accessedRouters;
        this.removeRoutes = removeRoutes;

        removeRoutes.forEach((item: RouteRecordRaw) => {
          if (router.hasRoute(item.name)) {
            router.removeRoute(item.name);
          }
        });
      }
    },
    async restore() {
      this.removeRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item);
      });
    },
    async clearRoutes() {
      this.whiteListRouters = ["/login"];
      this.routers = [];
      this.removeRoutes = [];
    }
  }
});

export function getPermissionStore() {
  return usePermissionStore(store);
}
