<!--
  * @author baoyuhao
  * @date 2023/6/6 16:52:15
  * @description
  * @version 0.1.0
-->
<template>
  <t-card class="saved-approval-card">
    <t-table
      class="tableStyle"
      :data="savedApprovalTable.tableData"
      :columns="SAVED_APPROVAL_TABLE_COLUMNS"
      row-key="id"
      hover
      stripe
      table-layout="auto"
      :pagination="savedApprovalTable.pagination"
      :loading="savedApprovalTable.tableLoading"
      :header-affixed-top="{ offsetTop, container: getContainer }"
      :horizontal-scroll-affixed-bottom="{ offsetBottom: '64', container: getContainer }"
      :pagination-affixed-bottom="{ offsetBottom: '0',container: getContainer }"
      @page-change="savedApprovalTablePageChange"
      style="margin-top: 10px"
      size="small"
    >
      <template #zlh="slotProps">
        <t-tag theme="primary" variant="light-outline">
          {{ slotProps.row.zlh }}
        </t-tag>
      </template>
      <template #state="slotProps">
        <t-tag v-if="slotProps.row.state.indexOf('未通过')!=-1" theme="warning" variant="light-outline"
               shape="round">
          <template #icon>
            <t-icon name="info-circle"></t-icon>
          </template>
          {{ slotProps.row.state }}
        </t-tag>
        <t-tag v-else-if="slotProps.row.state=='已转化'" theme="success" variant="light-outline" shape="round">
          <template #icon>
            <t-icon name="check-circle"></t-icon>
          </template>
          {{ slotProps.row.state }}
        </t-tag>
        <t-tag v-else theme="success" variant="light-outline" shape="round">
          {{ slotProps.row.state }}
        </t-tag>
      </template>
      <template #settings="slotProps">
        <div class="settingBtns">
          <t-button theme="warning">
            <template #icon>
              <t-icon name="edit"></t-icon>
            </template>
            修改
          </t-button>
          <t-button theme="danger">
            <template #icon>
              <t-icon name="delete"></t-icon>
            </template>
            删除
          </t-button>
        </div>
      </template>
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { BASE_URL, SAVED_APPROVAL_TABLE_COLUMNS } from "./constants";
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
const savedApprovalTable = ref({
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
    currPage: savedApprovalTable.value.pagination.current,
    size: savedApprovalTable.value.pagination.pageSize
  };
  let requestUrl = setObjToUrlParams(BASE_URL.getSavedTransferApplicationFormPage, obj);
  getSavedApprovalTableData(requestUrl);
});
/**
 * 操作钩子
 */
const savedApprovalTablePageChange = (curr) => {
  console.log("分页变化", curr);
  savedApprovalTable.value.pagination.current = curr.current;
  savedApprovalTable.value.pagination.pageSize = curr.pageSize;
  getSavedApprovalTableData(BASE_URL.getSavedTransferApplicationFormPage);
};

/**
 * 业务相关
 */
const getSavedApprovalTableData = (requestUrl) => {
  savedApprovalTable.value.tableLoading = true;
  request.get({
    url: requestUrl
  }).then(res => {
    console.log(res);
    savedApprovalTable.value.pagination.total = res.total;
    savedApprovalTable.value.tableData = res.records;
    for (let i = 0; i < savedApprovalTable.value.tableData.length; i++) {
      savedApprovalTable.value.tableData[i].index = (savedApprovalTable.value.pagination.current - 1) * savedApprovalTable.value.pagination.pageSize + i + 1;
      if (isNotEmpty(savedApprovalTable.value.tableData[i].patentPrice)) {
        savedApprovalTable.value.tableData[i].patentPrice += " 万元";
      }
    }
  }).catch(err => {
    MessagePlugin.error(err.message);
  }).finally(() => {
    savedApprovalTable.value.tableLoading = false;
  });
};
</script>

<style lang="less" scoped>
.saved-approval-card {
  &:first-child {
    margin-top: 0;
  }

  margin-top: 10px;
  transition: 1s;

  .cardTop {
    //border: 1px solid red;
    align-items: center;
    flex-wrap: wrap;
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