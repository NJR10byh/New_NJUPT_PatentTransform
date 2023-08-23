/**
 * @author baoyuhao
 * @date 2023/4/29 15:21:03
 * @description
 * @version 0.1.0
 */

export const BASE_URL = {
  getMyPatentPage: "/teacher/getMyPatentPage",
  getPatentPageByZLMC: "/teacher/getPatentPageByZLMC",
  getPatentPageByZLH: "/teacher/getPatentPageByZLH",
  downloadCertificate: "/teacher/downloadCertificate",

  // 价格意向
  updateTransferPriceIntention: "/intention/updateTransferPriceIntention",
  updateLicencePriceIntention: "/intention/updateLicencePriceIntention",
  updateOpenLicencePriceIntention: "/intention/updateOpenLicencePriceIntention",
  deleteTransferPriceIntentionByWid: "/intention/deleteTransferPriceIntentionByWid",
  deleteLicencePriceIntentionByWid: "/intention/deleteLicencePriceIntentionByWid",
  deleteOpenLicencePriceIntentionByWid: "/intention/deleteOpenLicencePriceIntentionByWid",

  // 上传专利证书
  uploadCertificate: "/file/uploadCertificate"
};

export const ALL_PATENTS_TABLE_COLUMNS = [
  { colKey: "row-select", type: "multiple", width: 30, fixed: "left" },
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
    width: 80,
    ellipsis: true
  },
  {
    title: "专利名称",
    align: "left",
    colKey: "zlmc",
    width: 120,
    ellipsis: true
  },
  {
    title: "操作",
    stopPropagation: true,
    align: "left",
    colKey: "settings",
    fixed: "right",
    width: 30
  }
];