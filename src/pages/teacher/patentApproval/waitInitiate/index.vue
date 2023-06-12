<!--
  * @author baoyuhao
  * @date 2023/6/6 9:56:02
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="wait-initiate-card">
    <t-table
      :data="waitInitiateTable.tableData"
      :columns="WAIT_INITIATED_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      table-layout="auto"
      :pagination="waitInitiateTable.pagination"
      :loading="waitInitiateTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="waitInitiateTablePageChange"
      style="margin-top: 10px"
      size="small"
    >
      <template #zlh="slotProps">
        <t-tag theme="primary" variant="light-outline">
          {{ slotProps.row.zlh }}
        </t-tag>
      </template>
      <template #settings="slotProps">
        <t-button theme="warning">
          <template #icon>
            <t-icon name="edit"></t-icon>
          </template>
          编辑
        </t-button>
      </template>
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { BASE_URL, WAIT_INITIATED_TABLE_COLUMNS } from "./constants";
import { useSettingStore } from "@/store";
import { prefix } from "@/config/global";
import { setObjToUrlParams } from "@/utils/request/utils";
import { request } from "@/utils/request";
import { MessagePlugin } from "tdesign-vue-next";
import { isNotEmpty } from "@/utils/validate";

const store = useSettingStore();

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

/* 表格相关 */
const waitInitiateTable = ref({
  tableLoading: false,// 表格加载
  tableData: [],// 表格数据
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
  let obj = {
    currPage: waitInitiateTable.value.pagination.current,
    size: waitInitiateTable.value.pagination.pageSize
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getBatchSavedTransferApplicationFormPage, obj);
  getTableData(requestUrl);
});
/**
 * 操作钩子
 */
const waitInitiateTablePageChange = (curr) => {
  console.log("分页变化", curr);
  waitInitiateTable.value.pagination.current = curr.current;
  waitInitiateTable.value.pagination.pageSize = curr.pageSize;
  let obj = {
    currPage: waitInitiateTable.value.pagination.current,
    size: waitInitiateTable.value.pagination.pageSize
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getBatchSavedTransferApplicationFormPage, obj);
  getTableData(requestUrl);
};

/**
 * 业务相关
 */
const getTableData = (requestUrl) => {
  waitInitiateTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    waitInitiateTable.value.pagination.total = res.total;
    waitInitiateTable.value.tableData = res.records;
    for (let i = 0; i < waitInitiateTable.value.tableData.length; i++) {
      waitInitiateTable.value.tableData[i].index = (waitInitiateTable.value.pagination.current - 1) * waitInitiateTable.value.pagination.pageSize + i + 1;
      if (isNotEmpty(waitInitiateTable.value.tableData[i].patentPrice)) {
        waitInitiateTable.value.tableData[i].patentPrice += " 万元";
      }
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    waitInitiateTable.value.tableLoading = false;
  });
};
</script>

<style lang="less" scoped>
.wait-initiate-card {
  &:first-child {
    margin-top: 0;
  }

  margin-top: 10px;
  transition: 1s;

  .cardTop {
    //border: 1px solid red;
    align-items: center;
    flex-wrap: wrap;

    .radioGroup {
      margin: 5px;
    }

    .inputStyle {
      width: 200px;
      margin: 5px;
    }

    .rangeInputStyle {
      width: 410px;
    }

    .cascaderStyle {
      width: 410px;
    }
  }
}
</style>