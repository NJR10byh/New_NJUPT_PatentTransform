<!--
  * @author baoyuhao
  * @date 2023/3/31 17:22:19
  * @description 等待第一作者审批
  * @version 0.1.0
-->
<template>
  <t-card class="waitFirstAuthorApproval-card">
    <t-table
      :data="waitFirstAuthorApprovalTable.tableData"
      :columns="WAIT_FIRST_AUTHOR_APPROVAL_TABLE_COLUMNS"
      row-key="index"
      hover
      stripe
      :pagination="waitFirstAuthorApprovalTable.pagination"
      :loading="waitFirstAuthorApprovalTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: 64, container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: 0,container: getContainer }"
      @page-change="waitFirstAuthorApprovalTablePageChange"
      size="small"
    >
      <template #zlmc="slotProps">
        <t-link theme="primary" @click="getApprovalFormDetail(slotProps.row)">
          {{ slotProps.row.zlmc }}
        </t-link>
      </template>
      <template #zlh="slotProps">
        <t-tag theme="primary" variant="light-outline">
          {{ slotProps.row.zlh }}
        </t-tag>
      </template>
      <template #state="slotProps">
        <t-tag v-if="slotProps.row.state.indexOf('未通过')==-1" theme="success" variant="light-outline" shape="round">
          {{ slotProps.row.state }}
        </t-tag>
        <t-tag v-else theme="warning" variant="light-outline" shape="round">
          <template #icon>
            <t-icon name="info-circle"></t-icon>
          </template>
          {{ slotProps.row.state }}
        </t-tag>
      </template>
      <template #settings="slotProps">
        <t-button theme="success">
          <template #icon>
            <t-icon name="check-circle"></t-icon>
          </template>
          通过
        </t-button>

        <t-button theme="danger">
          <template #icon>
            <t-icon name="close-circle"></t-icon>
          </template>
          不通过
        </t-button>
      </template>
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { prefix } from "@/config/global";
import { useSettingStore } from "@/store";
import { BASE_URL, WAIT_FIRST_AUTHOR_APPROVAL_TABLE_COLUMNS } from "./constants";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { MessagePlugin } from "tdesign-vue-next";
import { chargeTransferState } from "@/utils/transferState";
import router from "@/router";

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
/**
 * 表格相关
 */
/* 等待第一作者审批表 */
const waitFirstAuthorApprovalTable = ref({
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
    currPage: waitFirstAuthorApprovalTable.value.pagination.current,
    size: waitFirstAuthorApprovalTable.value.pagination.pageSize
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getZLDYZZConfirmPage, obj);
  // 获取表格数据
  getWaitFirstAuthorApprovalData(requestUrl);
});

/**
 * 操作钩子
 */
// 分页钩子
const waitFirstAuthorApprovalTablePageChange = (curr: { current: number; pageSize: number; }) => {
  console.log("分页变化", curr);
  waitFirstAuthorApprovalTable.value.pagination.current = curr.current;
  waitFirstAuthorApprovalTable.value.pagination.pageSize = curr.pageSize;
  let obj = {
    currPage: waitFirstAuthorApprovalTable.value.pagination.current,
    size: waitFirstAuthorApprovalTable.value.pagination.pageSize
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getZLDYZZConfirmPage, obj);
  getWaitFirstAuthorApprovalData(requestUrl);
};

/**
 * 业务相关
 */
// 获取表格数据
const getWaitFirstAuthorApprovalData = (requestUrl: string) => {
  waitFirstAuthorApprovalTable.value.tableLoading = true;
  waitFirstAuthorApprovalTable.value.tableData = [];
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    waitFirstAuthorApprovalTable.value.tableData = res.records;
    waitFirstAuthorApprovalTable.value.pagination.total = res.total;
    for (let i = 0; i < waitFirstAuthorApprovalTable.value.tableData.length; i++) {
      waitFirstAuthorApprovalTable.value.tableData[i].index = (waitFirstAuthorApprovalTable.value.pagination.current - 1) * waitFirstAuthorApprovalTable.value.pagination.pageSize + i + 1;
      waitFirstAuthorApprovalTable.value.tableData[i].patentPrice += " 万元";
      waitFirstAuthorApprovalTable.value.tableData[i].state = chargeTransferState(waitFirstAuthorApprovalTable.value.tableData[i]);
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    waitFirstAuthorApprovalTable.value.tableLoading = false;
  });
};

// 跳转至审批表详情
const getApprovalFormDetail = (row: { wid: any; }) => {
  console.log(row);
  router.push({
    name: "approvalFormDetail",
    query: {
      wid: row.wid
    }
  });
};
</script>

<style lang="less" scoped>
.waitFirstAuthorApproval-card {
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