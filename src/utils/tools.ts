/**
 * @author baoyuhao
 * @date 2023/9/6 14:58:14
 * @description
 * @version 0.1.0
 */

import { isNotEmpty } from "@/utils/validate";
import useClipboard from "vue-clipboard3";
import { MessagePlugin } from "tdesign-vue-next";

/**
 * 复制内容到剪贴板
 * @param info
 */
export const copyInfo = (info: string) => {
  if (isNotEmpty(info)) {
    const { toClipboard } = useClipboard();
    toClipboard(info).then(() => {
      MessagePlugin.closeAll();
      MessagePlugin.success("已复制");
    }).catch(() => {
      MessagePlugin.closeAll();
      MessagePlugin.error("复制失败");
    });
  } else {
    MessagePlugin.closeAll();
    MessagePlugin.error("复制值为空");
  }
};