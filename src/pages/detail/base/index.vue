<template>
  <div class="detail-base">
    <t-card title="基本信息">
      <div class="info-block">
        <div v-for="(item, index) in BASE_INFO_DATA" :key="index" class="info-item">
          <h1>{{ item.name }}</h1>
          <span
            :class="{
              ['inProgress']: item.type && item.type.value === 'inProgress',
              ['pdf']: item.type && item.type.value === 'pdf',
            }"
          >
            <i v-if="item.type && item.type.key === 'contractStatus'" />
            {{ item.value }}
          </span>
        </div>
      </div>
    </t-card>

    <t-card title="变更记录" class="container-base-margin-top">
      <t-steps class="detail-base-info-steps" layout="vertical" theme="dot" :current="1">
        <t-step-item title="上传合同附件" content="这里是提示文字" />
        <t-step-item title="修改合同金额" content="这里是提示文字" />
        <t-step-item title="新建合同" content="2020-12-01 15:00:00 管理员-李川操作" />
      </t-steps>
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DetailBase',
};
</script>

<script setup lang="ts">
const BASE_INFO_DATA = [
  {
    name: '合同名称',
    value: '总部办公用品采购项目',
    type: null,
  },
  {
    name: '合同状态',
    value: '履行中',
    type: {
      key: 'contractStatus',
      value: 'inProgress',
    },
  },
  {
    name: '合同编号',
    value: 'BH00010',
    type: null,
  },
  {
    name: '合同类型',
    value: '主合同',
    type: null,
  },
  {
    name: '合同收付类型',
    value: '付款',
    type: null,
  },
  {
    name: '合同金额',
    value: '5,000,000元',
    type: null,
  },
  {
    name: '甲方',
    value: '腾讯科技（深圳）有限公司',
    type: null,
  },
  {
    name: '乙方',
    value: '欧尚',
    type: null,
  },
  {
    name: '合同签订日期',
    value: '2020-12-20',
    type: null,
  },
  {
    name: '合同生效日期',
    value: '2021-01-20',
    type: null,
  },
  {
    name: '合同结束日期',
    value: '2022-12-20',
    type: null,
  },
  {
    name: '合同附件',
    value: '总部办公用品采购项目合同.pdf',
    type: {
      key: 'contractAnnex',
      value: 'pdf',
    },
  },
  {
    name: '备注',
    value: '--',
    type: null,
  },
  {
    name: '创建时间',
    value: '2020-12-22 10:00:00',
    type: null,
  },
];
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
