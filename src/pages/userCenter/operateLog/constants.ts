/**
 * @author baoyuhao
 * @date 2023/4/24 10:15:18
 * @description
 * @version 0.1.0
 */

export const BASE_URL = {
  searchOperationRecord: "/record/searchOperationRecord"
};

export const OPERATE_LOG_TABLE_COLUMNS = [
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 50
  },
  {
    title: "姓名",
    align: "center",
    colKey: "operatorName",
    width: 80,
    ellipsis: true
  },
  {
    title: "工号/学号",
    align: "center",
    colKey: "operatorGh",
    width: 60,
    ellipsis: true
  },
  {
    title: "所在单位",
    align: "left",
    colKey: "operatorDepartment",
    width: 150,
    ellipsis: true
  },
  {
    title: "操作内容",
    align: "left",
    colKey: "operationType",
    width: 100,
    ellipsis: true
  },
  {
    title: "操作时间",
    align: "center",
    colKey: "gmtCreate",
    width: 80,
    ellipsis: true
  }
];