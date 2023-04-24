/**
 * @author baoyuhao
 * @date 2023/4/24 11:12:20
 * @description
 * @version 0.1.0
 */
import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/systemManage",
    name: "systemManage",
    component: Layout,
    redirect: "/systemManage/operateLog",
    meta: { title: "系统管理", hidden: true },
    children: [
      {
        path: "operateLog",
        name: "operateLog",
        component: () => import("@/pages/cxy/systemManage/operateLog/index.vue"),
        meta: { title: "操作日志", hidden: true, rolePermission: ["root", "superadmin"] }
      },
      {
        path: "userList",
        name: "userList",
        component: () => import("@/pages/cxy/systemManage/operateLog/index.vue"),
        meta: { title: "人员管理", hidden: true, rolePermission: ["root", "superadmin"] }
      }
    ]
  }
];