/**
 * @author baoyuhao
 * @date 2023/7/18 16:36:07
 * @description
 * @version 0.1.0
 */
export const FILES_MANAGE_OTHER_FILES_TABLE_COLUMNS = [
  { colKey: "row-select", type: "multiple", width: 10, fixed: "left" },
  {
    title: "文件名",
    align: "left",
    colKey: "fileDisplayName",
    width: 200,
    ellipsis: true
  },
  {
    title: "操作",
    align: "left",
    colKey: "settings",
    width: 100
  },
  {
    title: "更新时间",
    align: "center",
    colKey: "gmtCreate",
    width: 80
  }
];