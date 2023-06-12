/**
 * @author baoyuhao
 * @date 2023/4/24 14:16:06
 * @description
 * @version 0.1.0
 */
export const BASE_URL = {
  getAdminList: "/admin/getAdminList"
};

export const USER_LIST_TABLE_COLUMNS = [
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 50
  },
  {
    title: "姓名",
    align: "center",
    colKey: "userName",
    width: 100,
    ellipsis: true
  },
  {
    title: "工号/学号",
    align: "center",
    colKey: "userGh",
    width: 80,
    ellipsis: true
  },
  {
    title: "权限",
    align: "left",
    colKey: "roles",
    width: 120,
    ellipsis: true
  },
  {
    title: "操作",
    align: "left",
    colKey: "settings",
    width: 80,
    fixed: "right"
  }
];