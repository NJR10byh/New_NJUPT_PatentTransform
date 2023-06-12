/**
 * @author baoyuhao
 * @date 2023/4/4 17:50:24
 * @description
 * @version 0.1.0
 */

export const BASE_URL = {
  getRequireAnnualFeePatentPage: "/cxy/getRequireAnnualFeePatentPage",
  getRequireAnnualFeePatentPageByZLMC: "/cxy/getRequireAnnualFeePatentPageByZLMC"
};

export const ANNUAL_FEE_EXPIRATION_TABLE_COLUMNS = [
  // { colKey: "row-select", type: "multiple", width: 10, fixed: "left" },
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 50
  },
  {
    title: "专利名称",
    align: "left",
    colKey: "zlmc",
    width: 120,
    ellipsis: true
  },
  {
    title: "申请日期",
    align: "center",
    colKey: "zlapplyrq",
    width: 100,
    ellipsis: true
  },
  {
    title: "授权日期",
    align: "center",
    colKey: "zlsqrq",
    width: 100,
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