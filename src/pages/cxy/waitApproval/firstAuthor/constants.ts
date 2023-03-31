/**
 * @author baoyuhao
 * @date 2023/3/29 14:55:11
 * @description
 * @version 0.1.0
 */
export const WAIT_FIRST_AUTHOR_APPROVAL_TABLE_COLUMNS = [
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
    width: 80
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
    width: 90,
    ellipsis: true
  },
  {
    title: "操作",
    colKey: "settings",
    fixed: "right",
    width: 150,
    stopPropagation: true
  }
];