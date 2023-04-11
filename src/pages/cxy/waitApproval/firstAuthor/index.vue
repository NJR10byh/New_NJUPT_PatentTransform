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
      row-key="id"

      hover
      stripe
      :pagination="waitFirstAuthorApprovalTable.pagination"
      :loading="waitFirstAuthorApprovalTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="waitFirstAuthorApprovalTablePageChange"
      size="small"
    >
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
        <t-button theme="primary">
          <template #icon>
            <t-icon name="file"></t-icon>
          </template>
          查看
        </t-button>

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
import { WAIT_FIRST_AUTHOR_APPROVAL_TABLE_COLUMNS } from "./constants";
import { request } from "@/utils/request";
import { setObjToUrlParams } from "@/utils/request/utils";
import { MessagePlugin } from "tdesign-vue-next";
import { chargeTransferState } from "@/utils/transferState";

const store = useSettingStore();

const basrUrl = ref("/cxy/getZLDYZZConfirmPage");
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
  // 获取表格数据
  getwaitFirstAuthorApprovalData(basrUrl.value);
});

/**
 * 操作钩子
 */
// 分页钩子
const waitFirstAuthorApprovalTablePageChange = (curr) => {
  console.log("分页变化", curr);
  waitFirstAuthorApprovalTable.value.pagination.current = curr.current;
  waitFirstAuthorApprovalTable.value.pagination.pageSize = curr.pageSize;
  getwaitFirstAuthorApprovalData(basrUrl.value);
};

/**
 * 业务相关
 */
// 获取表格数据
const getwaitFirstAuthorApprovalData = (requestUrl) => {
  waitFirstAuthorApprovalTable.value.tableData = [];
  let obj = {
    currPage: waitFirstAuthorApprovalTable.value.pagination.current,
    size: waitFirstAuthorApprovalTable.value.pagination.pageSize
  };
  requestUrl = setObjToUrlParams(requestUrl, obj);
  waitFirstAuthorApprovalTable.value.tableLoading = true;
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