/**
 * @author baoyuhao
 * @date 2023/4/25 11:00:16
 * @description
 * @version 0.1.0
 */
import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/annualFeeExpiration-teacher",
    name: "annualFeeExpiration_teacher",
    component: Layout,
    redirect: "/annualFeeExpiration-teacher/info",
    meta: { title: "年费到期", icon: "time" },
    children: [
      {
        path: "info",
        name: "annualFeeExpirationInfo_teacher",
        component: () => import("@/pages/teacher/annualFeeExpiration/index.vue"),
        meta: { title: "年费到期列表", rolePermission: ["root", "teacher"] }
      }
    ]
  }
];