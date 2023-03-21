<template>
  <t-row :gutter="[24, 24]">
    <t-col :flex="3">
      <div class="user-left-greeting">
        <div>
          Hi，{{ userStore.userInfo.userName }}
          <span class="regular"> 下午好～</span>
        </div>
        <img src="@/assets/assets-njupt-logo.png" class="logo" />
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
              工号
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
              权限
            </div>
            <div class="contract-detail">
              <t-tag theme="success" variant="light" v-if="userStore.userInfo.role=='superadmin'">产学院超级管理员
              </t-tag>
              <t-tag theme="primary" variant="light" v-if="userStore.userInfo.role=='teacher'">教师</t-tag>
            </div>
          </t-col>
        </t-row>
      </t-card>

      <!--      <t-card class="content-container">-->

      <!--      </t-card>-->
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

onMounted(() => {
});

</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
