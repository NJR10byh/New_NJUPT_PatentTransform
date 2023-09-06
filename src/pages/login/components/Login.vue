<template>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="loginData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type == 'password'">
      <t-form-item name="username">
        <t-input
          v-model="loginData.username"
          size="large"
          placeholder="请输入账号：cxy/teacher"
        >
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input
          v-model="loginData.password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          placeholder="请输入登录密码：abc123123"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon
              :name="showPsw ? 'browse' : 'browse-off'"
              @click="showPsw = !showPsw"
            />
          </template>
        </t-input>
      </t-form-item>
    </template>

    <t-form-item v-if="type !== 'qrcode'" class="btn-container">
      <t-button block size="large" type="submit" :loading="loginBtnLoading">登 录</t-button>
    </t-form-item>
  </t-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { MessagePlugin } from "tdesign-vue-next";
import { usePermissionStore, useUserStore } from "@/store";
import { request } from "@/utils/request";
import { checkAuth, userInfoToCache } from "@/utils/auth";
import md5 from "js-md5";


const userStore = useUserStore();
const permissionStore = usePermissionStore();

const FORM_RULES = {
  username: [{ required: true, message: "账号必填", type: "error" }],
  password: [{ required: true, message: "密码必填", type: "error" }]
};

const type = ref("password");

const loginData = ref({
  username: "cxy",
  password: "abc123123"
});
const showPsw = ref(false);

const loginBtnLoading = ref(false);
const router = useRouter();

const onSubmit = async ({ validateResult }) => {
  if (validateResult === true) {
    loginBtnLoading.value = true;
    if (!await checkAuth()) {
      loginData.value.password = md5(loginData.value.password);
      let requestUrl = "/authorize/loginByPassword";
      await request.post({
        url: requestUrl,
        data: loginData.value
      }).then(async res => {
        console.log(res);
        await userInfoToCache(res);
      }).catch(err => {
        MessagePlugin.closeAll();
        MessagePlugin.error(err.message);
      }).finally(() => {
        loginBtnLoading.value = false;
      });
    } else {
      loginBtnLoading.value = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../index.less");
</style>
