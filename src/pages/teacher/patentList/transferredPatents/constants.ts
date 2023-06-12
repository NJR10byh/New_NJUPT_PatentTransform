/**
 * @author baoyuhao
 * @date 2023/4/29 15:21:19
 * @description
 * @version 0.1.0
 */
export const BASE_URL = {
  getTransferredPatentPage: "/teacher/getTransferredPatentPage"
};

export const TRANSFERRED_PATENTS_TABLE_COLUMNS = [
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
    title: "价格",
    align: "center",
    colKey: "patentPrice",
    width: 80,
    ellipsis: true
  },
  {
    title: "受让方单位",
    align: "left",
    colKey: "paName",
    width: 120,
    ellipsis: true
  },
  {
    title: "合同签订日期",
    align: "center",
    colKey: "contractSigningDate",
    width: 100,
    ellipsis: true
  }
];