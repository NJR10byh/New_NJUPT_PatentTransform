/**
 * @author baoyuhao
 * @date 2023/4/25 10:51:49
 * @description
 * @version 0.1.0
 */
import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/patentApproval",
    name: "patentApproval_teacher",
    component: Layout,
    meta: { title: "专利审批", icon: "secured" },
    children: [
      {
        path: "waitInitiated",
        name: "waitInitiatedApproval",
        component: () => import("@/pages/cxy/patentApproval/license/index.vue"),
        meta: { title: "待发起的审批", rolePermission: ["root", "teacher"] }
      },
      {
        path: "userInitiated",
        name: "userInitiatedApproval",
        component: () => import("@/pages/cxy/patentApproval/transfer/index.vue"),
        meta: { title: "您发起的审批", rolePermission: ["root", "teacher"] }
      },
      {
        path: "waitConfirm",
        name: "waitConfirmApproval",
        component: () => import("@/pages/cxy/patentApproval/license/index.vue"),
        meta: { title: "待您确认的审批", rolePermission: ["root", "teacher"] }
      }
    ]
  }
];