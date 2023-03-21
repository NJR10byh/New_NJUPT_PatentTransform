export interface formListResult {
  formList: Array<FormModel>;
}

export interface FormModel {
  achievementName: string,// 成果名称
  achievementContractPerson: string,// 成果联系人
  jobTitle: string,// 职称
  achievementContractPhone: string,// 联系方式-电话
  achievementContractEmail: string,// 联系方式-Email
  department: string,// 所在学院
  jobNumber: string,// 工号
  technicalMaturity: string,// 技术成熟度
  technicalClassification: string,// 技术分类
  achievementIntroduce: string,// 成果介绍
  keyTechnologies: string,// 关键技术
  fieldMarket: string,// 应用领域和市场
  achievementPrice: string,// 成果估值金额
  transformWay: string,// 转化方式
  createUser: string,// 创建人
  createTime: string,// 创建时间
  updateUser: string,// 更新人
  updateTime: string,// 更新时间
}
