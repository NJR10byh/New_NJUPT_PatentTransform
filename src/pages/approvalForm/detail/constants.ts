/**
 * @author baoyuhao
 * @date 2023/7/27 16:23:46
 * @description
 * @version 0.1.0
 */
export const BASE_URL = {
  getPatentInfoByWid: "/application/getPatentInfoByWid",
  getTransferApplicationFormByWID: "/application/getTransferApplicationFormByWID"
};
export const CASH_REWARD_TABLE_COLUMNS = [
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 30
  },
  {
    title: "姓名",
    align: "center",
    colKey: "recipientName",
    width: 50
  },
  {
    title: "工号",
    align: "center",
    colKey: "recipientGh",
    width: 60,
    ellipsis: true
  },
  {
    title: "学院",
    align: "left",
    colKey: "recipientDepartment",
    width: 100,
    ellipsis: true

  },
  {
    title: "身份证号",
    align: "center",
    colKey: "idCard",
    width: 80,
    ellipsis: true
  },
  {
    title: "分配金额",
    align: "center",
    colKey: "amount",
    width: 90,
    ellipsis: true
  }
];