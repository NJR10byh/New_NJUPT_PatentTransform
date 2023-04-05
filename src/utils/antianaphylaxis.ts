/**
 * @author baoyuhao
 * @date 2023/4/5 12:54:47
 * @description 脱敏工具类
 * @version 0.1.0
 */

/**
 * 身份证号脱敏
 */
export const ID_card = (val) => {
  if (val.length == 0) {
    return "";
  }
  return val.replace(val.slice(4, 14), "*".repeat(10));
};

/**
 * 手机号脱敏
 */
export const phone_number = (val) => {
  if (val.length == 0) {
    return "";
  }
  return val.replace(val.slice(3, 7), "*".repeat(4));
};