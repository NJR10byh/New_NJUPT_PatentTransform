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
    width: 20,
    resizable: false
  },
  {
    title: "专利号",
    align: "center",
    colKey: "zlh",
    width: 65,
    resizable: false
  },
  {
    title: "专利名称",
    align: "left",
    colKey: "zlmc",
    width: 100,
    ellipsis: true
  },
  {
    title: "价格 (万元)",
    align: "center",
    colKey: "patentPrice",
    width: 40,
    resizable: false

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
    width: 75,
    ellipsis: true
  },
  {
    title: "操作",
    align: "left",
    colKey: "settings",
    fixed: "right",
    width: 100
  }
];

export const PATENT_APPROVAL_TABLE_COLUMNS_WITH_SELECT = [
  { colKey: "row-select", type: "multiple", width: 10, fixed: "left", resizable: false },
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 20,
    resizable: false
  },
  {
    title: "专利号",
    align: "center",
    colKey: "zlh",
    width: 65,
    resizable: false
  },
  {
    title: "专利名称",
    align: "left",
    colKey: "zlmc",
    width: 100,
    ellipsis: true
  },
  {
    title: "价格 (万元)",
    align: "center",
    colKey: "patentPrice",
    width: 40,
    resizable: false

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
    width: 75,
    ellipsis: true
  },
  {
    title: "操作",
    align: "left",
    colKey: "settings",
    fixed: "right",
    width: 100
  }
];