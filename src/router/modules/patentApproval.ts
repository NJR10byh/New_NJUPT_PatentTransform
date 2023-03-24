/**
 * @author baoyuhao
 * @date 2023/3/24 22:23:44
 * @description 专利审批
 * @version 0.1.0
 */

import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/patentApproval",
    name: "patentApproval",
    component: Layout,
    meta: { title: "专利审批", icon: "secured" },
    children: [
      {
        path: "transfer",
        name: "transferPatentApproval",
        component: () => import("@/pages/cxy/patentApproval/transfer/index.vue"),
        meta: { title: "转让", rolePermission: ["root", "superadmin"] }
      }
      // {
      //   path: "license",
      //   name: "license",
      //   component: () => import("@/pages/cxy/patentApproval/license/index.vue"),
      //   meta: { title: "许可", rolePermission: ["root", "superadmin"] }
      // }
    ]
  }
];