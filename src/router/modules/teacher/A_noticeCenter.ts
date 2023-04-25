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
    name: "noticeCenter_teacher",
    component: Layout,
    meta: { title: "通知中心", icon: "notification" },
    children: [
      {
        path: "teacher",
        name: "notice_teacher",
        component: () => import("@/pages/teacher/noticeCenter/index.vue"),
        meta: { title: "通知中心", rolePermission: ["root", "teacher"] }
      }
    ]
  }
];