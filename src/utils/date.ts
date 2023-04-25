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
