/**
 * @author baoyuhao
 * @date 2023/4/5 22:46:59
 * @description
 * @version 0.1.0
 */

export const BASE_URL = {
  // 专利
  getPatentByCondition: "/export/getPatentByCondition",
  getPatentColumnMap: "/export/getPatentColumnMap",
  exportPatentByCondition: "/export/exportPatentByCondition",
  exportPatentByWid: "/export/exportPatentByWid",

  // 合同
  getContractByCondition: "/export/getContractByCondition",
  getContractColumnMap: "/export/getContractColumnMap",
  exportContractByCondition: "/export/exportContractByCondition",
  exportContractByContractInfoId: "/export/exportContractByContractInfoId"
};

export const PATENT_SEARCH_CONDITION = [
  {
    name: "zlh",
    placeholder: "专利号"
  },
  {
    name: "zlmc",
    placeholder: "专利名称"
  },
  {
    name: "cymd",
    placeholder: "专利发明人"
  },
  {
    name: "cygh",
    placeholder: "专利发明人工号"
  },
  {
    name: "zldyzzxm",
    placeholder: "专利第一作者"
  },
  {
    name: "zldyzzgh",
    placeholder: "专利第一工号"
  },
  {
    name: "gsdw",
    placeholder: "归属单位"
  },
  {
    name: "fzyName",
    placeholder: "负责人姓名"
  },
  {
    name: "fzyGh",
    placeholder: "负责人工号"
  },
  {
    name: "fzyPhone",
    placeholder: "负责人电话"
  },
  {
    name: "fzyDepartment",
    placeholder: "负责人单位"
  }
];

export const CONTRACT_SEARCH_CONDITION = [
  {
    name: "projectName",
    placeholder: "合同名称"
  },
  {
    name: "paName",
    placeholder: "受让方名称"
  },
  {
    name: "gsdw",
    placeholder: "学院"
  },
  {
    name: "pcName",
    placeholder: "中介名称"
  },
  {
    name: "pbContactPerson",
    placeholder: "乙方联系人"
  }
];

export const PATENT_TABLE_COLUMNS = [
  // { colKey: "row-select", type: "multiple", width: 10, fixed: "left" },
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
    width: 70,
    ellipsis: true
  },
  {
    title: "专利名称",
    align: "left",
    colKey: "zlmc",
    width: 150,
    ellipsis: true
  },
  {
    title: "第一作者",
    align: "center",
    colKey: "zldyzzxm",
    width: 100,
    ellipsis: true
  },
  {
    title: "专利价格",
    align: "center",
    colKey: "patentPrice",
    width: 100,
    ellipsis: true
  },
  {
    title: "受让方",
    align: "left",
    colKey: "paName",
    width: 100,
    ellipsis: true
  },
  {
    title: "合同签订日期",
    align: "center",
    colKeys: "contractSigningDate",
    width: 100,
    ellipsis: true
  }
];

export const CONTRACT_TABLE_COLUMNS = [
  // { colKey: "row-select", type: "multiple", width: 10, fixed: "left" },
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 50
  },
  {
    title: "合同名称",
    align: "left",
    colKey: "projectName",
    width: 150,
    ellipsis: true
  },
  {
    title: "合同编号",
    align: "center",
    colKey: "projectCode",
    width: 100,
    ellipsis: true
  },
  {
    title: "价格",
    align: "center",
    colKey: "totalTransferAmount",
    width: 100,
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
    title: "合同签订日期",
    align: "center",
    colKeys: "contractSigningDate",
    width: 100,
    ellipsis: true
  },
  {
    title: "完成时间",
    align: "center",
    colKeys: "completeTime",
    width: 100,
    ellipsis: true
  }
];