/**
 * @author baoyuhao
 * @date 2023/4/4 17:43:22
 * @description
 * @version 0.1.0
 */

export const BASE_URL = {
  getAgencyPage: "/agency/getAgencyPage",
  searchAgencyByName: "/agency/searchAgencyByName"
};

export const AGENCY_MANAGE_TABLE_COLUMNS = [
  // { colKey: "row-select", type: "multiple", width: 10, fixed: "left" },
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 50
  },
  {
    title: "中介名称",
    align: "left",
    colKey: "agencyName",
    width: 120,
    ellipsis: true
  },
  {
    title: "法定代表人",
    align: "center",
    colKey: "agencyRepresentative",
    width: 80,
    ellipsis: true
  },
  {
    title: "联系人姓名",
    align: "center",
    colKey: "agencyContactPerson",
    width: 80,
    ellipsis: true
  },
  {
    title: "操作",
    align: "left",
    colKey: "settings",
    fixed: "right",
    width: 30
  }
];