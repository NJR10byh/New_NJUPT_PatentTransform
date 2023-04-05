<template>
  <t-row :gutter="[24, 24]">
    <t-col :flex="3">
      <div class="user-left-greeting">
        <div>
          Hi，<span style="color: var(--td-brand-color);font-weight: bold">{{ userStore.userInfo.userName }}</span>
          <span class="regular"> {{ getTimeState() }}～</span>
        </div>
        <img src="@/assets/assets-njupt-full-logo.png" class="logo" />
      </div>

      <t-card class="user-info-list" title="个人信息">
        <template #actions>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="edit" size="18" />
          </t-button>
        </template>
        <t-row class="content">
          <t-col class="contract" :span="3">
            <div class="contract-title">
              用户名
            </div>
            <div class="contract-detail">
              {{ userStore.userInfo.userName }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              工号/学号
            </div>
            <div class="contract-detail">
              {{ userStore.userInfo.userGh }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              部门
            </div>
            <div class="contract-detail">
              {{ userStore.userInfo.userDepartment }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              身份证号
            </div>
            <div class="contract-detail">
              {{ userStore.userInfo.userIdCard }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              联系方式
            </div>
            <div class="contract-detail">
              {{ userStore.userInfo.userPhone }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              电子邮箱
            </div>
            <div class="contract-detail">
              {{ userStore.userInfo.userEmail }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              权限
            </div>
            <div class="contract-detail">
              <t-tag theme="success" variant="light" v-if="userStore.userInfo.role=='superadmin'">产学研超级管理员
              </t-tag>
              <t-tag theme="success" variant="light" v-if="userStore.userInfo.role=='admin'">产学研
              </t-tag>
              <t-tag theme="primary" variant="light" v-if="userStore.userInfo.role=='teacher'">教师</t-tag>
            </div>
          </t-col>
        </t-row>
      </t-card>
    </t-col>

    <t-col :flex="1">
      <t-card class="user-intro">
        <t-avatar size="90px">N</t-avatar>
        <div class="name">{{ userStore.userInfo.userName }}</div>
        <div class="position">{{ userStore.userInfo.userDepartment }} {{ userStore.userInfo.userName }}
          {{ userStore.userInfo.userGh }}
        </div>
      </t-card>

      <t-card title="研发团队成员" class="user-team">
        <template #actions>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="edit" size="18" />
          </t-button>
        </template>
        <t-list :split="false">
          <t-list-item v-for="(item, index) in TEAM_MEMBERS" :key="index">
            <t-list-item-meta :image="item.avatar" :title="item.title" :description="item.description" />
          </t-list-item>
        </t-list>
      </t-card>
    </t-col>
  </t-row>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "@/store";

import { TEAM_MEMBERS } from "./constants";

const userStore = useUserStore();

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
});

/**
 * 业务相关
 */
// 判断时间
const getTimeState = () => {
  // 获取当前时间
  let timeNow = new Date();
  // 获取当前小时
  let hours = timeNow.getHours();
  // 设置默认文字
  let text = ``;
  // 判断当前时间段
  if (hours >= 0 && hours <= 5) {
    text = `夜已经深了，注意休息哦`;
  } else if (hours > 5 && hours <= 10) {
    text = `早上好`;
  } else if (hours > 10 && hours <= 14) {
    text = `中午好`;
  } else if (hours > 14 && hours <= 18) {
    text = `下午好`;
  } else if (hours > 18 && hours <= 24) {
    text = `晚上好`;
  }
  // 返回当前时间段对应的状态
  return text;
};

</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
