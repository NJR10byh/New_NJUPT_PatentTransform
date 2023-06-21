/**
 * @author baoyuhao
 * @date 2023/6/21 15:12:29
 * @description
 * @version 0.1.0
 */

export const BASE_URL = {
  getDistributionProportion: "/distribution/getDistributionProportion"
};

export const CHANGE_DISTRIBUTION_TABLE_COLUMNS = [
  {
    title: "净收益金额",
    align: "center",
    colKey: "priceRange",
    width: 80,
    ellipsis: true
  },
  {
    title: "成果完成人",
    align: "center",
    colKey: "recipientProportion",
    width: 80,
    ellipsis: true
  },
  {
    title: "学校",
    align: "center",
    colKey: "schoolProportion",
    width: 80,
    ellipsis: true
  },
  {
    title: "中介",
    align: "center",
    colKey: "agencyProportion",
    width: 80,
    ellipsis: true
  },
  {
    title: "学院",
    align: "center",
    colKey: "departmentProportion",
    width: 80,
    ellipsis: true
  },
  {
    title: "操作",
    align: "left",
    colKey: "settings",
    fixed: "right",
    width: 120
  }
];