/**
 * @author baoyuhao
 * @date 2023/7/17 17:40:38
 * @description 文件管理-收益分配
 * @version 0.1.0
 */
export const BASE_URL = {};

export const FILES_MANAGE_INCOME_DISTRIBUTION_TABLE_COLUMNS = [
  { colKey: "row-select", type: "multiple", width: 10, fixed: "left" },
  {
    title: "文件名",
    align: "left",
    colKey: "fileName",
    width: 120,
    ellipsis: true
  },
  {
    title: "操作",
    align: "left",
    colKey: "settings",
    fixed: "right",
    width: 300
  },
  {
    title: "更新时间",
    align: "center",
    colKey: "updateTime",
    width: 80
  }
];