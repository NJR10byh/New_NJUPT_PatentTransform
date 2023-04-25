/**
 * @author baoyuhao
 * @date 2023/4/25 17:41:43
 * @description
 * @version 0.1.0
 */
export const BASE_URL = {
  getRequireAnnualFeePatentPageByGh: "/annualFee/getRequireAnnualFeePatentPageByGh"
};

export const ANNUAL_FEE_EXPIRATION_TABLE_COLUMNS = [
  {
    title: "序号",
    align: "center",
    colKey: "index",
    width: 40
  },
  {
    title: "专利名称",
    align: "left",
    colKey: "zlmc",
    width: 120,
    ellipsis: true
  },
  {
    title: "申请日期",
    align: "center",
    colKey: "zlapplyrq",
    width: 100,
    ellipsis: true
  },
  {
    title: "授权日期",
    align: "center",
    colKey: "zlsqrq",
    width: 100,
    ellipsis: true
  },
  {
    title: "应缴日期",
    align: "center",
    colKey: "annualFeePaymentDate",
    width: 100,
    ellipsis: true
  },
  {
    title: "短信提醒日期",
    align: "center",
    colKey: "smsReminderDate",
    width: 100,
    ellipsis: true
  }
];