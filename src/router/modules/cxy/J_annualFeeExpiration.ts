/**
 * @author baoyuhao
 * @date 2023/4/4 17:56:42
 * @description
 * @version 0.1.0
 */
import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/annualFeeExpiration-cxy",
    name: "annualFeeExpiration_cxy",
    component: Layout,
    redirect: "/annualFeeExpiration-cxy/info",
    meta: { title: "年费到期", icon: "time" },
    children: [
      {
        path: "info",
        name: "annualFeeExpirationInfo_cxy",
        component: () => import("@/pages/cxy/annualFeeExpiration/index.vue"),
        meta: { title: "年费到期列表", rolePermission: ["root", "superadmin", "admin"] }
      }
    ]
  }
];