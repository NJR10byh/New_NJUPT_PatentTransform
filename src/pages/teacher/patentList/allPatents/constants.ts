/**
 * @author baoyuhao
 * @date 2023/4/29 15:21:03
 * @description
 * @version 0.1.0
 */

export const BASE_URL = {
  getMyPatentPage: "/teacher/getMyPatentPage",
  getPatentPageByZLMC: "/teacher/getPatentPageByZLMC",
  getPatentPageByZLH: "/teacher/getPatentPageByZLH"
};

export const ALL_PATENTS_TABLE_COLUMNS = [
  // { colKey: "row-select", type: "multiple", width: 10, fixed: "left" },
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 50
  },
  {
    title: "专利号",
    align: "center",
    colKey: "zlh",
    width: 80,
    ellipsis: true
  },
  {
    title: "专利名称",
    align: "left",
    colKey: "zlmc",
    width: 120,
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