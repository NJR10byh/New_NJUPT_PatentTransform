/**
 * @author baoyuhao
 * @date 2023/3/23 14:59:36
 * @description 价格意向
 * @version 0.1.0
 */

import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/userCenter",
    name: "userCenter",
    component: Layout,
    redirect: "/userCenter/userInfo",
    meta: { title: "个人中心", hidden: true },
    children: [
      {
        path: "userInfo",
        name: "userInfo",
        component: () => import("@/pages/userCenter/userInfo/index.vue"),
        meta: { title: "个人中心", hidden: true, rolePermission: ["root", "teacher", "superadmin", "admin"] }
      },
      {
        path: "operateLog",
        name: "operateLog",
        component: () => import("@/pages/userCenter/operateLog/index.vue"),
        meta: { title: "操作日志", hidden: true, rolePermission: ["root", "superadmin"] }
      },
      {
        path: "userList",
        name: "userList",
        component: () => import("@/pages/userCenter/userList/index.vue"),
        meta: { title: "人员管理", hidden: true, rolePermission: ["root", "superadmin"] }
      }
    ]
  }
];
