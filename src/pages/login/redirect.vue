<!--
  * @author baoyuhao
  * @date 2023/4/23 13:55:03
  * @description
  * @version 0.1.0
-->
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { setObjToUrlParams } from "@/utils/request/utils";
import { request } from "@/utils/request";
import { MessagePlugin } from "tdesign-vue-next";
import { userInfoToCache } from "@/utils/auth";

/**
 * data
 */
const loginByCodeUrl = ref("/authorize/loginByCode");

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  // 已进行智慧校园门户鉴权，存在code
  if (window.location.href.indexOf("code=") != -1) {
    let obj = {
      code: window.location.href.split("code=")[1]
    };
    let requestUrl = setObjToUrlParams(loginByCodeUrl.value, obj);
    request.get({
      url: requestUrl
    }).then(res => {
      userInfoToCache(res);
    }).catch(err => {
      MessagePlugin.error(err.message);
    }).finally(() => {
    });
  }
});
</script>