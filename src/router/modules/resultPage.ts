/**
 * @author baoyuhao
 * @date 2023/4/21 16:48:11
 * @description
 * @version 0.1.0
 */

export default [
  {
    path: "/result",
    name: "resultPage",
    redirect: "/result/403",
    meta: { title: "结果页", icon: "user-circle", hidden: true },
    children: [
      {
        path: "403",
        name: "Forbidden",
        component: () => import("@/pages/result/403/index.vue"),
        meta: { title: "无权限", hidden: true, rolePermission: ["root", "teacher", "superadmin", "admin"] }
      }
      // {
      //   path: "404",
      //   name: "NotFound",
      //   component: () => import("@/pages/result/404/index.vue"),
      //   meta: { title: "不存在", hidden: true, rolePermission: ["root", "teacher", "superadmin", "admin"] }
      // }
    ]
  }
];