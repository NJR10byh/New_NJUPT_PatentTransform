/**
 * @author baoyuhao
 * @date 2023/3/25 1:16:07
 * @description 转化状态判断
 * @version 0.1.0
 */
export const chargeTransferState = (row) => {
  // 状态
  if (row.transferProcessId == null) {
    return "未转化";
  } else {
    // 审批表是否撤回
    if (row.isWithdraw) {
      return "审批表已撤回";
    } else {
      // 第一作者确认
      if (!row.isZldyzzConfirm) {
        return "等待第一作者确认";
      } else {
        if (!row.isZldyzzApproval) {
          return "第一作者未通过";
        } else {
          // 归属单位确认
          if (!row.isDepartmentConfirm) {
            return "等待上传所属部门意见";
          } else {
            if (!row.isDepartmentApproval) {
              return "归属单位未通过";
            } else {
              // 是否已转化
              if (row.isComplete) {
                return "已转化";
              } else {
                // 产学研确认
                if (!row.isCxyConfirm) {
                  return "等待产学研审批";
                } else {
                  if (!row.isCxyApproval) {
                    return "产学研未通过";
                  } else {
                    // 产学研通过
                    if (!row.isCxyFzrConfirm) {
                      return "等待产学研负责人审批";
                    } else {
                      if (!row.isCxyFzrApproval) {
                        return "产学研负责人未通过";
                      } else {
                        // 产学研负责人通过
                        if (row.contractInfoId == null) {
                          return "等待产学研创建合同";
                        } else if ((row.contractType != "开放许可") && (!row.isPublicNotice)) {
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
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};