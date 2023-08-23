/**
 * @author baoyuhao
 * @date 2023/4/5 12:54:47
 * @description 脱敏工具类
 * @version 0.1.0
 */

import { isEmpty } from "@/utils/validate";

/**
 * 身份证号脱敏
 * @param idCard
 * @constructor
 */
export const IDCardLock = (idCard: string) => {
  if (isEmpty(idCard)) {
    return "";
  }
  const reg = /^(.{6})\d{8}(.{4})$/;    // 匹配身份证号前6位和后4位的正则表达式
  return idCard.replace(reg, "\$1********\$2");   // 身份证号脱敏，将中间8位替换为“*”
};

/**
 * 手机号脱敏
 * @param tel
 * @constructor
 */
export const PhoneLock = (tel: string) => {
  if (isEmpty(tel)) {
    return "";
  }
  const reg = /^(\d{3})\d{4}(\d{4})$/;
  return tel.replace(reg, "\$1****\$2");
};