<template>
  <header class="login-header">
    <span class="header-logo-container">
        <img src="@/assets/assets-njupt-full-logo.png" class="logo" />
    </span>
    <!--    <div class="operations-container">-->
    <!--      <t-button theme="default" shape="square" variant="text" @click="navToGitHub">-->
    <!--        <t-icon name="logo-github" class="icon" />-->
    <!--      </t-button>-->
    <!--      <t-button theme="default" shape="square" variant="text" @click="navToHelper">-->
    <!--        <t-icon name="help-circle" class="icon" />-->
    <!--      </t-button>-->
    <!--      <t-button theme="default" shape="square" variant="text" @click="toggleSettingPanel">-->
    <!--        <t-icon name="setting" class="icon" />-->
    <!--      </t-button>-->
    <!--    </div>-->
  </header>
</template>

<script setup lang="ts">
import { useSettingStore } from "@/store";

const settingStore = useSettingStore();
const toggleSettingPanel = () => {
  settingStore.updateConfig({
    showSettingPanel: true
  });
};

const navToGitHub = () => {
  console.log("aaa");
  window.open("https://github.com/applenjr/NJUPT_Patent_Collection_Frontend");
};

const navToHelper = () => {
  window.open("https://tdesign.tencent.com/starter/docs/vue-next/get-started");
};
</script>

<style lang="less" scoped>
.login-header {
  height: 64px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(5px);
  color: var(--td-text-color-primary);

  .header-logo-container {
    width: 180px;
    height: 45px;
    display: flex;
    color: var(--td-text-color-primary);
    //border: 1px solid red;

    .logo {
      width: 100%;
      height: 100%;
    }
  }

  .operations-container {
    display: flex;
    align-items: center;

    .t-button {
      margin-left: 16px;
    }

    .icon {
      height: 20px;
      width: 20px;
      padding: 6px;
      box-sizing: content-box;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
