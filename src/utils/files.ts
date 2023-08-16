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
export const fileInfoToCache = async (filesInfo: any) => {
  filesStore.getFilesInfo(filesInfo);
};

/**
 * 文件校验
 * @param params
 */
export const validateFile = (params: { files: any; type: any; }) => {
  const { type } = params;
  const messageMap = {
    FILE_OVER_SIZE_LIMIT: "文件大小超出限制，已自动过滤",
    FILES_OVER_LENGTH_LIMIT: "文件数量超出限制，仅上传未超出数量的文件",
    FILTER_FILE_SAME_NAME: "不允许上传同名文件",
    BEFORE_ALL_FILES_UPLOAD: "beforeAllFilesUpload 方法拦截了文件",
    CUSTOM_BEFORE_UPLOAD: "beforeUpload 方法拦截了文件"
  };
  messageMap[type] && MessagePlugin.warning(messageMap[type]);
};


/**
 * 上传文件
 * @param requestUrl
 * @param formData
 */
export const uploadFile = async (requestUrl: string, formData: FormData, progressCallback: (percentCompleted: number) => void) => {
  return new Promise((resolve, reject) => {
    request.post({
      url: requestUrl,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      timeout: 30 * 1000,
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        progressCallback(percentCompleted); // 调用回调函数传递进度信息
      }
    }).then(res => {
      if ("errCode" in res) {
        // 上传失败
        reject(res.errMsg);
      } else {
        resolve(res);
      }
    }).catch(err => {
      reject(err);
    });
  });
};

/**
 * 下载文件
 * @param requestUrl
 * @param requestBody
 */
export const downloadFile = async (requestUrl: any, requestBody: any) => {
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