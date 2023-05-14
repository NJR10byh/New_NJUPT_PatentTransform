/**
 * @author baoyuhao
 * @date 2023/4/25 10:43:00
 * @description
 * @version 0.1.0
 */
import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/patent",
    name: "patentList",
    component: Layout,
    meta: { title: "专利列表", icon: "view-module" },
    children: [
      {
        path: "all",
        name: "allPatent",
        component: () => import("@/pages/teacher/patentList/allPatents/index.vue"),
        meta: { title: "全部专利", rolePermission: ["root", "teacher"] }
      },
      {
        path: "transferred",
        name: "transferredPatent",
        component: () => import("@/pages/teacher/patentList/transferredPatents/index.vue"),
        meta: { title: "已转化的专利", rolePermission: ["root", "teacher"] }
      }
    ]
  }
];