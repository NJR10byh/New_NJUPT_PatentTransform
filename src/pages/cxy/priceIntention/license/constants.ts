/**
 * @author baoyuhao
 * @date 2023/3/23 14:17:22
 * @description
 * @version 0.1.0
 */
export const LICENCES_PRICE_TABLE_COLUMNS = [
  // { colKey: "row-select", type: "multiple", width: 10, fixed: "left" },
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 50
  },
  {
    title: "专利名称",
    align: "center",
    colKey: "zlmc",
    width: 120,
    ellipsis: true
  },
  {
    title: "价格意向（万元）",
    align: "center",
    colKey: "licencePriceIntention",
    width: 100,
    ellipsis: true
  },
  {
    title: "最后更新时间",
    align: "center",
    colKey: "gmtUpdate",
    width: 100,
    ellipsis: true
  }
];