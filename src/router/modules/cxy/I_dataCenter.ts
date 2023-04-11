/**
 * @author baoyuhao
 * @date 2023/4/5 22:49:00
 * @description
 * @version 0.1.0
 */
import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/dataCenter",
    name: "dataCenter",
    component: Layout,
    redirect: "/dataCenter/list",
    meta: { title: "数据中心", icon: "server" },
    children: [
      {
        path: "list",
        name: "dataCenterList",
        component: () => import("@/pages/cxy/dataCenter/index.vue"),
        meta: { title: "条件筛选", rolePermission: ["root", "superadmin", "admin"] }
      }
    ]
  }
];