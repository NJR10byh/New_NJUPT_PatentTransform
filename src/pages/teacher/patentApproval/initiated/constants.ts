/**
 * @author baoyuhao
 * @date 2023/6/6 9:55:32
 * @description
 * @version 0.1.0
 */

export const BASE_URL = {
  getApplicationPage: "/teacher/getApplicationPage"
};

export const INITIATED_TABLE_COLUMNS = [
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
    title: "转化状态",
    align: "center",
    colKey: "state",
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