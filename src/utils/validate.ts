/**
 * @author baoyuhao
 * @date 2022/12/5 15:07:25
 * @description 校验工具类
 * @version 0.1.0
 */

export const isEmpty = (val) => {
  return val == null || val == "" || val == undefined || val.length === 0;
};

export const isNotEmpty = (val) => {
  return !isEmpty(val);
};

export const validateMobilePhone = (val) => {
  // 检查手机号码格式
  let validateRule = /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3|5|6|8|9]))\d{8}$/;
  if ([undefined, null, ""].includes(val)) {
    return { result: false, message: "手机号必填", type: "error" };
  } else {
    if (!validateRule.test(val)) {
      return { result: false, message: "请输入正确的11位手机号码", type: "error" };
    }
  }
};

export const validateEmail = (val) => {
  // 检查邮箱格式
  let validateRule = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  if ([undefined, null, ""].includes(val)) {
    return { result: false, message: "邮箱必填", type: "error" };
  } else {
    if (!validateRule.test(val)) {
      return { result: false, message: "请输入正确的邮箱", type: "error" };
    }
  }
};