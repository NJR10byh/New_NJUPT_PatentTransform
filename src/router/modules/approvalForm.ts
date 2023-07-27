import Layout from "@/layouts/index.vue";

/**
 * @author baoyuhao
 * @date 2023/7/27 16:47:09
 * @description 审批表相关
 * @version 0.1.0
 */
export default [
  {
    path: "/approvalForm",
    name: "approvalForm",
    component: Layout,
    redirect: "/approvalForm/edit",
    meta: { title: "审批表", hidden: true },
    children: [
      {
        path: "edit",
        name: "approvalFormEdit",
        component: () => import("@/pages/approvalForm/edit/index.vue"),
        meta: { title: "编辑审批表", hidden: true, rolePermission: ["root", "superadmin", "admin", "teacher"] }
      },
      {
        path: "detail",
        name: "approvalFormDetail",
        component: () => import("@/pages/approvalForm/detail/index.vue"),
        meta: { title: "审批表详情", hidden: true, rolePermission: ["root", "superadmin", "admin", "teacher"] }
      }
    ]
  }
];