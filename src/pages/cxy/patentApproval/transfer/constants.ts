/**
 * @author baoyuhao
 * @date 2023/3/23 14:17:22
 * @description
 * @version 0.1.0
 */
export const PATENT_APPROVAL_TABLE_COLUMNS = [
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 30
  },
  {
    title: "专利号",
    align: "center",
    colKey: "zlh",
    width: 70,
    ellipsis: true
  },
  {
    title: "专利名称",
    align: "left",
    colKey: "zlmc",
    width: 150,
    ellipsis: true
  },
  {
    title: "价格（万元）",
    align: "center",
    colKey: "patentPrice",
    width: 50,
    ellipsis: true
  },
  {
    title: "受让方单位",
    align: "left",
    colKey: "paName",
    width: 100,
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
    width: 150
  }
];

export const PATENT_APPROVAL_TABLE_COLUMNS_WITH_SELECT = [
  { colKey: "row-select", type: "multiple", width: 10, fixed: "left" },
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 30
  },
  {
    title: "专利号",
    align: "center",
    colKey: "zlh",
    width: 120,
    ellipsis: true
  },
  {
    title: "专利名称",
    align: "center",
    colKey: "zlmc",
    width: 120,
    ellipsis: true
  },
  {
    title: "价格（万元）",
    align: "center",
    colKey: "patentPrice",
    width: 30,
    ellipsis: true
  },
  {
    title: "受让方单位",
    align: "center",
    colKey: "paName",
    width: 50,
    ellipsis: true
  },
  {
    title: "转化状态",
    align: "center",
    colKey: "state",
    width: 50,
    ellipsis: true
  },
  {
    title: "操作",
    align: "left",
    colKey: "settings",
    width: 150
  }
];