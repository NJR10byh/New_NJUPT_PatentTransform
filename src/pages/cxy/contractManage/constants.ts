/**
 * @author baoyuhao
 * @date 2023/4/2 23:29:04
 * @description
 * @version 0.1.0
 */

export const BASE_URL = {
  PUBLICITY_PAGE: "http://cxy.njupt.edu.cn/_s366/gs/list.psp",
  getTransferringContractPage: "/contract/getTransferringContractPage",
  getTransferredContractPage: "/contract/getTransferredContractPage",
  getFileListByContractInfoId: "/file/getFileListByContractInfoId"
};

export const CONTRACT_MANAGE_TABLE_COLUMNS = [
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 50,
    ellipsis: true
  },
  {
    title: "合同名称",
    align: "left",
    colKey: "projectName",
    width: 120,
    ellipsis: true
  },
  {
    title: "合同编号",
    align: "left",
    colKey: "projectCode",
    width: 80,
    ellipsis: true
  },
  {
    title: "受让方单位",
    align: "left",
    colKey: "paName",
    width: 150,
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
    title: "是否寄出",
    align: "center",
    colKey: "isContractSent",
    width: 90,
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