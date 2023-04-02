/**
 * @author baoyuhao
 * @date 2023/4/3 0:17:15
 * @description 合同管理
 * @version 0.1.0
 */

import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/contractManage",
    name: "contractManage",
    component: Layout,
    redirect: "/contractManage/contract",
    meta: { title: "合同管理", icon: "user-circle" },
    children: [
      {
        path: "contract",
        name: "contractList",
        component: () => import("@/pages/cxy/contractManage/index.vue"),
        meta: { title: "合同列表", rolePermission: ["root", "superadmin", "admin"] }
      }
    ]
  }
];