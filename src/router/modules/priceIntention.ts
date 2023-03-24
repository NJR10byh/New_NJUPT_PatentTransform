/**
 * @author baoyuhao
 * @date 2023/3/23 14:59:36
 * @description 价格意向
 * @version 0.1.0
 */

import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/priceIntention",
    name: "priceIntention",
    component: Layout,
    meta: { title: "价格意向", icon: "money-circle" },
    children: [
      {
        path: "transfer",
        name: "transfer",
        component: () => import("@/pages/cxy/priceIntention/transferPrice/index.vue"),
        meta: { title: "转让", rolePermission: ["root", "superadmin"] }
      },
      {
        path: "license",
        name: "license",
        component: () => import("@/pages/cxy/priceIntention/licensePrice/index.vue"),
        meta: { title: "许可", rolePermission: ["root", "superadmin"] }
      },
      {
        path: "openLicense",
        name: "openLicense",
        component: () => import("@/pages/cxy/priceIntention/openLicensePrice/index.vue"),
        meta: { title: "开放许可", rolePermission: ["root", "superadmin"] }
      }
    ]
  }
];