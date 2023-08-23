/**
 * @author baoyuhao
 * @date 2023/7/7 16:41:14
 * @description
 * @version 0.1.0
 */

export const BASE_URL = {};

export const FILES_MANAGE_HOME_TABLE_COLUMNS = [
  { colKey: "row-select", type: "multiple", width: 30, fixed: "left" },
  {
    title: "文件名",
    align: "left",
    colKey: "fileName",
    width: 120,
    ellipsis: true
  },
  {
    title: "操作",
    stopPropagation: true,
    align: "left",
    colKey: "settings",
    width: 300
  },
  {
    title: "更新时间",
    align: "center",
    colKey: "updateTime",
    width: 80
  }
];