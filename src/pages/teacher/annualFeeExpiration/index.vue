<!--
  * @author baoyuhao
  * @date 2023/4/25 17:41:32
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="annual-fee-expiration-card">
    <t-table
      class="tableStyle"
      :data="annualFeeExpirationTable.tableData"
      :columns="ANNUAL_FEE_EXPIRATION_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      :loading="annualFeeExpirationTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      size="small"
    >
      <template #annualFeePaymentDate="slotProps">
        <t-tag theme="warning" variant="light-outline">
          {{ slotProps.row.annualFeePaymentDate }}
        </t-tag>
      </template>
      <template #smsReminderDate="slotProps">
        <div style="display: flex;justify-content:center;align-items: center;">
          {{ slotProps.row.smsReminderDate }}
          <t-link theme="warning" style="margin-left: 3px">
            <t-icon name="edit"></t-icon>
          </t-link>
        </div>
      </template>
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { prefix } from "@/config/global";
import { useSettingStore } from "@/store";
import { useRouter } from "vue-router";
import { request } from "@/utils/request";
import { MessagePlugin } from "tdesign-vue-next";
import { ANNUAL_FEE_EXPIRATION_TABLE_COLUMNS, BASE_URL } from "./constants";


const store = useSettingStore();
const router = useRouter();

/**
 * data
 */
// 根据是否使用多Tab页判断offsetTop
const offsetTop = computed(() => {
  return store.isUseTabsRouter ? 48 : 0;
});
// 获取当前容器
const getContainer = () => {
  return document.querySelector(`.${prefix}-layout`);
};

/**
 * 表格相关
 */
const annualFeeExpirationTable = ref({
  tableLoading: false,// 表格加载
  tableData: [],// 表格数据
  searchText: "",// 专利名称
  // 表格分页
  pagination: {
    total: 0,
    current: 1,
    pageSize: 20
  }
});

/**
 * methods区
 */
/* 生命周期 */
// 组件挂载完成后执行
onMounted(() => {
  // 获取表格数据
  getTableData(BASE_URL.getRequireAnnualFeePatentPageByGh);
});

/**
 * 操作钩子
 */

/**
 * 业务相关
 */
// 获取表格数据
const getTableData = (requestUrl) => {
  annualFeeExpirationTable.value.tableData = [];
  annualFeeExpirationTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    annualFeeExpirationTable.value.tableData = res;
    annualFeeExpirationTable.value.pagination.total = res.total;
    for (let i = 0; i < annualFeeExpirationTable.value.tableData.length; i++) {
      annualFeeExpirationTable.value.tableData[i].index = i + 1;
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    annualFeeExpirationTable.value.tableLoading = false;
  });
};
</script>

<style lang="less" scoped>
.annual-fee-expiration-card {
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  .cardTop {
    //border: 1px solid red;
    align-items: center;

    .cardTitle {
      display: flex;
      align-items: center;
    }
  }

  .tableStyle {
    width: 100%;
    margin-top: 10px;

    .settingBtns {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: auto;
    }
  }

}
</style>