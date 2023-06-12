/**
 * @author baoyuhao
 * @date 2023/4/4 17:14:13
 * @description
 * @version 0.1.0
 */

export const BASE_URL = {
  getCompanyPage: "/company/getCompanyPage",
  searchCompanyByName: "/company/searchCompanyByName"
};

export const COMPANY_MANAGE_TABLE_COLUMNS = [
  // { colKey: "row-select", type: "multiple", width: 10, fixed: "left" },
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 50
  },
  {
    title: "公司名称",
    align: "left",
    colKey: "companyName",
    width: 120,
    ellipsis: true
  },
  {
    title: "法定代表人",
    align: "center",
    colKey: "companyRepresentative",
    width: 80,
    ellipsis: true
  },
  {
    title: "联系人姓名",
    align: "center",
    colKey: "companyContactPerson",
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