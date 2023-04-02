/**
 * @author baoyuhao
 * @date 2023/3/31 17:01:59
 * @description
 * @version 0.1.0
 */

import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/waitApproval",
    name: "waitApproval",
    component: Layout,
    redirect: "/waitApproval/firstAuthor",
    meta: { title: "等待审批", icon: "discount" },
    children: [
      {
        path: "firstAuthor",
        name: "waitFirstAuthorApproval",
        component: () => import("@/pages/cxy/waitApproval/firstAuthor/index.vue"),
        meta: { title: "第一作者", rolePermission: ["root", "superadmin", "admin"] }
      },
      {
        path: "cxyChargePerson",
        name: "waitCxyChargePersonApproval",
        component: () => import("@/pages/cxy/waitApproval/cxyChargePerson/index.vue"),
        meta: { title: "产学研负责人", rolePermission: ["root", "superadmin", "admin"] }
      }
    ]
  }
];