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

      <t-card class="user-info-list">
        <t-row justify="start" class="cardTop">
          <div class="cardTitle">个人信息</div>
        </t-row>
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
              {{ ID_card(userStore.userInfo.userIdCard) }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              联系方式
            </div>
            <div class="contract-detail">
              {{ phone_number(userStore.userInfo.userPhone) }}
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
              <t-tag theme="success" variant="light">{{ getRoleName(userStore.userInfo.role) }}</t-tag>
            </div>
          </t-col>
        </t-row>
      </t-card>

      <t-card class="user-info-list">
        <t-row justify="space-between" class="cardTop">
          <div class="cardTitle">信息维护（合同乙方）</div>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="edit" size="18" />
          </t-button>
        </t-row>
        <t-row class="content">
          <t-col class="contract" :span="3">
            <div class="contract-title">
              法定代表人
            </div>
            <div class="contract-detail">
              {{ basicInfo.contractPbRepresentative }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              电话
            </div>
            <div class="contract-detail">
              {{ phone_number(basicInfo.contractPbTel) }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              邮箱
            </div>
            <div class="contract-detail">
              {{ basicInfo.contractPbEmail }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              通讯地址
            </div>
            <div class="contract-detail">
              {{ basicInfo.contractPbMailingAddress }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              地址
            </div>
            <div class="contract-detail">
              {{ basicInfo.contractPbAddress }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              开户银行
            </div>
            <div class="contract-detail">
              {{ basicInfo.contractPbBankName }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              银行账户名称
            </div>
            <div class="contract-detail">
              {{ basicInfo.contractPbBankAccountName }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              银行账户
            </div>
            <div class="contract-detail">
              {{ basicInfo.contractPbBankAccount }}
            </div>
          </t-col>
          <t-col class="contract" :span="3">
            <div class="contract-title">
              现金奖励公示联系地址
            </div>
            <div class="contract-detail">
              {{ basicInfo.cashRewardContactAddress }}
            </div>
          </t-col>
        </t-row>
      </t-card>

      <t-card class="manageCard">
        <t-row justify="start" class="cardTop">
          <div class="cardTitle">管理</div>
        </t-row>
        <t-row justify="start" class="module">
          <t-button class="moduleBtn" theme="warning" size="large" @click="To_ChangeDistribution">
            <template #icon>
              <t-icon name="chart"></t-icon>
            </template>
            调整收益分配比例
          </t-button>
          <t-button class="moduleBtn" theme="primary" size="large" @click="To_UserList">
            <template #icon>
              <t-icon name="usergroup"></t-icon>
            </template>
            人员管理
          </t-button>
          <t-button class="moduleBtn" theme="primary" size="large" @click="To_OperateLog">
            <template #icon>
              <t-icon name="root-list"></t-icon>
            </template>
            操作记录
          </t-button>
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
import { onMounted, ref } from "vue";
import { useUserStore } from "@/store";

import { BASE_URL, TEAM_MEMBERS } from "./constants";
import { request } from "@/utils/request";
import { MessagePlugin } from "tdesign-vue-next";
import { ID_card, phone_number } from "@/utils/antianaphylaxis";
import router from "@/router";
import { getRoleName } from "@/utils/auth";

const userStore = useUserStore();

/**
 * data
 */
const basicInfo = ref({
  contractPbRepresentative: "",
  contractPbTel: "",
  contractPbBankAccountName: "",
  contractPbAddress: "",
  contractPbEmail: "",
  contractPbMailingAddress: "",
  contractPbBankName: "",
  contractPbBankAccount: "",
  cashRewardContactAddress: ""
});


/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  getBasicInfo();
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
  if (hours >= 0 && hours <= 6) {
    text = `夜已经深了，注意休息哦`;
  } else if (hours > 6 && hours <= 10) {
    text = `早上好`;
  } else if (hours > 10 && hours <= 13) {
    text = `中午好`;
  } else if (hours > 13 && hours <= 18) {
    text = `下午好`;
  } else if (hours > 18 && hours <= 24) {
    text = `晚上好`;
  }
  // 返回当前时间段对应的状态
  return text;
};

// 信息维护（合同乙方）
const getBasicInfo = () => {
  request.get({
    url: BASE_URL.getBasicInfo
  }).then(res => {
    console.log(res);
    basicInfo.value = res;
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
  });
};

// 调整收益分配比例
const To_ChangeDistribution = () => {
  router.push("/userCenter/changeDistribution");
};
// 用户列表
const To_UserList = () => {
  router.push("/userCenter/userList");
};
// 操作记录
const To_OperateLog = () => {
  router.push("/userCenter/operateLog");
};
</script>

<style lang="less" scoped>
@import url('./index.less');

.manageCard {
  &:first-child {
    margin-top: 0;
  }

  margin-top: 10px;

  .cardTop {
    //border: 1px solid red;
    align-items: center;

    .cardTitle {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .module {
    margin-top: 10px;
    align-items: center;
    flex-wrap: wrap;

    .moduleBtn {
      margin: 5px;
    }
  }
}
</style>
