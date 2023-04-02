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
    redirect: "/userCenter/info",
    meta: { title: "个人中心", icon: "user-circle", hidden: true },
    children: [
      {
        path: "info",
        name: "userInfo",
        component: () => import("@/pages/userCenter/userInfo/index.vue"),
        meta: { title: "个人中心", hidden: true, rolePermission: ["root", "teacher", "superadmin", "admin"] }
      }
    ]
  }
];
