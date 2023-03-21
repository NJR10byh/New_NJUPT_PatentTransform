/**
 * @author baoyuhao
 * @date 2023/3/20 0:01:46
 * @description
 * @version 0.1.0
 */
import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/noticeCenter",
    name: "noticeCenter",
    component: Layout,
    meta: { title: "通知中心", icon: "notification" },
    children: [
      {
        path: "notice_cxy",
        name: "notice_cxy",
        component: () => import("@/pages/cxy/noticeCenter/notice_cxy/index.vue"),
        meta: { title: "通知中心", rolePermission: ["root", "superadmin"] }
      },
      {
        path: "notice_teacher",
        name: "notice_teacher",
        component: () => import("@/pages/teacher/noticeCenter/notice_teacher/index.vue"),
        meta: { title: "通知中心", hidden: true, rolePermission: ["root", "teacher"] }
      }
    ]
  }
];