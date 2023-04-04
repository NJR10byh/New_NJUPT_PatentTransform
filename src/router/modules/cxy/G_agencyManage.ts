/**
 * @author baoyuhao
 * @date 2023/4/4 17:47:06
 * @description
 * @version 0.1.0
 */
import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/agencyManage",
    name: "agencyManage",
    component: Layout,
    redirect: "/agencyManage/agency",
    meta: { title: "中介管理", icon: "hourglass" },
    children: [
      {
        path: "agency",
        name: "agencyList",
        component: () => import("@/pages/cxy/agencyManage/index.vue"),
        meta: { title: "中介列表", rolePermission: ["root", "superadmin", "admin"] }
      }
    ]
  }
];