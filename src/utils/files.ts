/**
 * @author baoyuhao
 * @date 2023/7/7 15:42:07
 * @description
 * @version 0.1.0
 */

import { request } from "@/utils/request";
import { LoadingPlugin, MessagePlugin, NotifyPlugin } from "tdesign-vue-next";
import { isNotEmpty } from "@/utils/validate";
import { useFilesStore } from "@/store";

const filesStore = useFilesStore();

/**
 * 文件信息入缓存
 * @param filesInfo
 */
export const fileInfoToCache = async (filesInfo) => {
  filesStore.getFilesInfo(filesInfo);
};

/**
 * 下载文件
 * @param requestUrl
 * @param requestBody
 */
export const downloadFile = async (requestUrl, requestBody) => {
  const link = document.createElement("a");
  link.style.display = "none";
  document.body.appendChild(link);
  LoadingPlugin(true);
  await request.post({
    url: requestUrl,
    data: requestBody,
    responseType: "blob"
  }).then(res => {
    NotifyPlugin.success({
      title: "成功",
      content: "已进入后台开始下载，您可以进行其他操作"
    });
    let fileName = "文件";
    if (isNotEmpty(res.headers["content-disposition"])) {
      fileName = decodeURI(res.headers["content-disposition"].split("fileName=")[1]) + ".xls";
    }
    const blob = new Blob([res.data], {
      type: "application/force-download"
    });
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", fileName);
    link.click();
  }).catch(err => {
    console.log(err);
    MessagePlugin.error(err);
  }).finally(() => {
    LoadingPlugin(false);
  });
};