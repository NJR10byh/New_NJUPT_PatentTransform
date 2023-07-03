// 获取常用时间
import dayjs from "dayjs";

export const LAST_7_DAYS = [
  dayjs().subtract(7, "day").format("YYYY-MM-DD"),
  dayjs().subtract(1, "day").format("YYYY-MM-DD")
];

export const LAST_30_DAYS = [
  dayjs().subtract(30, "day").format("YYYY-MM-DD"),
  dayjs().subtract(1, "day").format("YYYY-MM-DD")
];

export const chargeTheme = () => {
// 获取当前时间
  const timeNow = new Date();
  // 获取当前小时
  const hours = timeNow.getHours();

  /**
   * 7-18 light mode
   * 18-7（次日）dark mode
   */
  return hours >= 7 && hours <= 18 ? "light" : "dark";
};

/**
 * 获取 n 年后的日期
 * eq: 2023-07-03 getNYearLaterDate(1) => 2023-07-02
 * @param nYears
 */
export const getNYearLaterDate = (nYears) => {
  let currentTimeStamp = Date.now();
  // 计算一年后的时间戳
  let oneYearLaterTimeStamp = currentTimeStamp + ((nYears - 1) * 365 + 364) * 24 * 60 * 60 * 1000;
  // 创建一个新的Date对象，使用n年后的时间戳
  let nYearLaterDate = new Date(oneYearLaterTimeStamp);
  // 获取年、月、日
  let year = nYearLaterDate.getFullYear();
  let month = String(nYearLaterDate.getMonth() + 1).padStart(2, "0");
  let day = String(nYearLaterDate.getDate()).padStart(2, "0");
  // 格式化为 "yyyy-MM-dd" 的字符串
  return year + "-" + month + "-" + day;
};
