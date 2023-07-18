import Layout from "@/layouts/index.vue";

/**
 * @author baoyuhao
 * @date 2023/7/7 15:01:08
 * @description
 * @version 0.1.0
 */
export default [
  {
    path: "/filesManage",
    name: "filesManage",
    component: Layout,
    redirect: "/filesManage/home",
    meta: { title: "首页", hidden: true },
    children: [
      {
        path: "home",
        name: "filesManageHome",
        component: () => import("@/pages/filesManage/home/index.vue"),
        meta: { title: "个人中心", hidden: true, rolePermission: ["root", "superadmin", "admin"] }
      },
      {
        path: "incomeDistribution",
        name: "filesManageIncomeDistribution",
        component: () => import("@/pages/filesManage/incomeDistribution/index.vue"),
        meta: { title: "收益分配", hidden: true, rolePermission: ["root", "superadmin", "admin"] }
      },
      {
        path: "incomeDistributionDetail",
        name: "filesManageIncomeDistributionDetail",
        component: () => import("@/pages/filesManage/incomeDistribution/detail.vue"),
        meta: { title: "收益分配详细", hidden: true, rolePermission: ["root", "superadmin", "admin"] }
      },
      {
        path: "otherFiles",
        name: "filesManageOtherFiles",
        component: () => import("@/pages/filesManage/otherFiles/index.vue"),
        meta: { title: "其他相关文件", hidden: true, rolePermission: ["root", "superadmin", "admin"] }
      }
    ]
  }
];