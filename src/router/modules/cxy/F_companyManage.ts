/**
 * @author baoyuhao
 * @date 2023/4/4 17:21:14
 * @description
 * @version 0.1.0
 */
import Layout from "@/layouts/index.vue";

export default [
  {
    path: "/companyManage",
    name: "companyManage",
    component: Layout,
    redirect: "/companyManage/company",
    meta: { title: "公司管理", icon: "laptop" },
    children: [
      {
        path: "company",
        name: "companyList",
        component: () => import("@/pages/cxy/companyManage/index.vue"),
        meta: { title: "公司列表", rolePermission: ["root", "superadmin", "admin"] }
      }
    ]
  }
];