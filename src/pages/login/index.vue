<template>
  <div class="login-wrapper">
    <login-header />
    <div class="login-container">
      <div class="title-container">
        <h1 class="title margin-no">登录到</h1>
        <h1 class="title">南京邮电大学 专利转让系统</h1>
      </div>

      <login v-if="type === 'login'" />
      <register v-else @register-success="switchType('login')" />
      <tdesign-setting />
    </div>

    <footer class="copyright">
      Copyright @ 2022-{{new Date().getFullYear()}} NJUPT. All Rights Reserved
    </footer>
  </div>
</template>
<script lang="ts">
export default {
  name: "LoginIndex"
};
</script>
<script setup lang="ts">
import { ref } from "vue";

import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import LoginHeader from "./components/Header.vue";
import TdesignSetting from "@/layouts/setting.vue";

const type = ref("login");
const switchType = (val: string) => {
  type.value = val;
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
