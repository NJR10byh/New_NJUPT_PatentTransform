/**
 * @author baoyuhao
 * @date 2023/3/23 14:17:22
 * @description
 * @version 0.1.0
 */

export const PATENT_STATE = {
  PASSED_APPROVAL: 1,
  TRANSFERRING: 2,
  TRANSFERRED: 3,
  FAILED: 4,
  WAIT_APPROVAL: 5
};
export const PATENT_APPROVAL_TABLE_COLUMNS = [
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
    width: 70
  },
  {
    title: "专利名称",
    align: "left",
    colKey: "zlmc",
    width: 150,
    ellipsis: true
  },
  {
    title: "价格",
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
    width: 30,
    ellipsis: true
  },
  {
    title: "操作",
    colKey: "settings",
    fixed: "right",
    width: 30,
    stopPropagation: true
  }
];

export const PATENT_APPROVAL_TABLE_COLUMNS_WITH_SELECT = [
  { colKey: "row-select", type: "multiple", width: 10, fixed: "left", resizable: false },
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
    width: 70
  },
  {
    title: "专利名称",
    align: "left",
    colKey: "zlmc",
    width: 150,
    ellipsis: true
  },
  {
    title: "价格",
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
    width: 30,
    ellipsis: true
  },
  {
    title: "操作",
    colKey: "settings",
    fixed: "right",
    width: 30,
    stopPropagation: true
  }
];