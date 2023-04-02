/**
 * @author baoyuhao
 * @date 2023/4/3 1:12:28
 * @description
 * @version 0.1.0
 */
export const chargeContractState = (row) => {
  // 状态
  if ((row.contractType != "开放许可") && (!row.isPublicNotice)) {
    return "等待公示";
  } else if (row.contractFileId == null) {
    return "等待产学研上传合同";
  } else if (row.voucherNum == 0) {
    return "等待上传到款凭证";
  } else if (row.checklistId == null) {
    return "等待上传科技成果认定清单";
  } else if (row.accountingInfoId == null) {
    return "等待生成入账通知单";
  } else if (row.invoiceId == null) {
    return "等待上传发票";
  } else if (row.hasCashReward && !row.isCashRewardPublicNotice) {
    return "等待现金奖励公示";
  } else if (row.isCashRewardPublicNotice && !row.isWithdrawal) {
    return "等待提现";
  } else if (!row.isComplete) {
    return "等待流程结束";
  } else {
    return "流程已结束";
  }
};